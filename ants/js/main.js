// The simulation and rendering work will be handled here
var SIMULATIONRUNNING = -1;
var gl = null;
var simulation = simulation || null;

function main(simulation) {
    var canvas = document.getElementById("canvas");
    // get rid of old simulation if we're restarting
    if (SIMULATIONRUNNING !== -1) {
        if (simulation) {
            simulation.stop();
        }
        SIMULATIONRUNNING = false;
        var button = document.getElementById("toggle");
        button.value = "Pause";
        SIMULATIONRUNNING = true;
    } else {
        gl = canvas.getContext("experimental-webgl");
    }
    var width = parseInt(document.getElementById("width").value);
    var height = parseInt(document.getElementById("height").value);
    var depth = parseInt(document.getElementById("depth").value);
    var numAnts = parseInt(document.getElementById("numAnts").value);
    var numDirt = parseInt(document.getElementById("numDirt").value);

    var simulation = createSimulation(
        {x: width, y: height, z: depth}
    );

    simulation.run = run.bind(simulation);
    simulation.render = render.bind(simulation);
    simulation.drawObject = drawObject.bind(simulation);
    simulation.createObjects = createObjects.bind(simulation);
    simulation.createBuffers = createBuffers.bind(simulation);
    simulation.createObjectBuffers = createObjectBuffers.bind(simulation);
    simulation.initializeObjects = initializeObjects.bind(simulation);

    // seed the world:
    simulation.seedWithDirt(numDirt);
    simulation.seedWithAnts(numAnts);
    simulation.seedWithFood(5, 10);

    // initialize shader stuff:
    simulation.stack = new SglMatrixStack();
    simulation.lambertianShader = new lambertianSingleColorShader(gl);
    simulation.uniformShader = new uniformShader(gl);
    simulation.initializeObjects(gl);

    // timing stuff
    simulation.previousTime = Date.now();
    simulation.stepCount = 0;

    // camera stuff
    simulation.camera = new Trackball(700, 500);
    window.onmousedown = dispatch(simulation.camera, "onMouseDown");
    window.onmouseup = dispatch(simulation.camera, "onMouseUp");
    window.onmousemove = dispatch(simulation.camera, "onMouseMove");
    window.onkeyup = dispatch(simulation.camera, "onKeyUp");
    window.onkeydown = dispatch(simulation.camera, "onKeyDown");
    window.onwheel = dispatch(simulation.camera, "onWheel");

    simulation.start();
    SIMULATIONRUNNING = true;
    document.getElementById("start").value = "Restart";

    return simulation;
}

function run() {
    var framesPerStep = 200 - (100 + parseInt(document.getElementById("speed").value)) + 1;
    if (this.stepCount == 0) {
        this.step();
        // console.log("FPS: " + this.fps + "steps per sec: " + this.fps/20);
    }
    this.render(this.stepCount / framesPerStep);
    var frameDelta = Date.now() - this.previousTime;
    this.previousTime = Date.now();
    this.fps = 1 / (frameDelta / 1000);

    this.stepCount = (this.stepCount + 1) % framesPerStep;
}

function render(pathFrac) {
    var width = 700;
    var height = 500;
    var x = this.world.dimensions.x;
    var y = this.world.dimensions.y;
    var z = this.world.dimensions.z;
	gl.viewport(0, 0, width, height);

    var antResolution = parseInt(document.getElementById("antResolution").value);
    var toggleDirt = parseInt(document.getElementById("toggleDirt").value);
    var toggleSurfaceDirt = parseInt(document.getElementById("toggleSurfaceDirt").value);

	// Clear the framebuffer
	gl.clearColor(0.4, 0.6, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.enable(gl.DEPTH_TEST);

	// Set up projection matrix
    var zoom = this.camera.zoom;
	var ratio = width / height; //line 229, Listing 4.1{
	var bbox = [0, 0, 0, 10 * zoom, 1, 10 * zoom];
	var winW = (bbox[3] - bbox[0]);
	var winH = (bbox[5] - bbox[2]);
	winW = winW * ratio * (winH / winW);
	var P = SglMat4.ortho([-winW / 2, -winH / 2, -100.0], [winW / 2, winH / 2, 100.0]);

	var stack = this.stack;
	stack.loadIdentity(); //line 238}


    var invV = this.camera.matrix;
	stack.multiply(invV);
	stack.push();//line 242

    // Lighting shader stuff:
    prepareLambertianShader(gl, simulation, P);
	stack.pop();

    // draw the dirt
    if (toggleDirt) {
        var dirt = [];
        var occupiableCells = this.world.getOccupiableDirtCells();
        for (var i = 0; i < occupiableCells.length; i++) {
            dirt.push(occupiableCells[i].position);
        }
        for (var t in dirt) {
            stack.push();
            stack.multiply(SglMat4.translation([
                dirt[t].x - x/2, dirt[t].y - y/2, dirt[t].z - z/2
            ]));
            gl.uniformMatrix4fv(
                this.lambertianShader.uModelViewMatrixLocation, false, stack.matrix
            );
            if (dirt[t].y == this.world.depth - 1) {
                if (toggleSurfaceDirt) {
                    gl.useProgram(null);
                    gl.useProgram(this.uniformShader);
                    gl.uniformMatrix4fv(this.uniformShader.uProjectionMatrixLocation, false, P);
                    gl.uniformMatrix4fv(
                        this.uniformShader.uModelViewMatrixLocation, false, stack.matrix
                    );
                    this.drawObject(gl, this.cube, this.uniformShader,
                        [0.15, 0.1, 0.1, 1.0], [0.15, 0.1, 0.1, 1.0]);
                    gl.useProgram(null);
                    prepareLambertianShader(gl, simulation, P);
                }
            } else {
                this.drawObject(gl, this.cube, this.lambertianShader,
                    [0.3, 0.2, 0.2, 1.0], [0.3, 0.2, 0.2, 1.0]);
            }
            stack.pop();
        }
    }

    gl.useProgram(null);
    // What is this, a shader for ants?!
    gl.useProgram(this.uniformShader);
	gl.uniformMatrix4fv(this.uniformShader.uProjectionMatrixLocation, false, P);

    // position the ants
	for (var i = 0; i < this.ants.length; i++) {
        var prevPos = this.ants[i].previousCell.position;
        var curPos = this.ants[i].cell.position;
        var antPos = {
            x: prevPos.x + pathFrac * (curPos.x - prevPos.x),
            y: prevPos.y + pathFrac * (curPos.y - prevPos.y),
            z: prevPos.z + pathFrac * (curPos.z - prevPos.z)
        };
        stack.push();
        stack.multiply(SglMat4.translation([
            antPos.x - x/2, antPos.y - y/2, antPos.z - z/2
        ]));

        if (antResolution === 0) {
            gl.uniformMatrix4fv(
                this.uniformShader.uModelViewMatrixLocation, false, stack.matrix
            );
            this.drawObject(gl, this.cube, this.uniformShader,
                [0.9, 0.2, 0.2, 1.0], [0.9, 0.2, 0.2, 1.0]);
        } else if (antResolution == 1) {
            // point the ant in its direction of motion:
            var deg = 0;
            var stayingPut = false;
            if (curPos === prevPos) {
                stayingPut = true;
                deg = this.ants[i].prevDeg;
            } else {
                deg = 180 * Math.atan((curPos.x - prevPos.x) / (curPos.z - prevPos.z))
                    / Math.PI + 90;
                if (curPos.z - prevPos.z < 0) {
                    deg -= 180;
                }
            }
            this.ants[i].prevDeg = deg;
            if (pathFrac < 0.25 && !stayingPut && deg != this.ants[i].prevDeg) {
                deg *= 4 * pathFrac;
            }
            stack.multiply(SglMat4.translation([0.5, 0.5, 0.5]));
            stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(deg), [0, 1, 0]));
            stack.multiply(SglMat4.translation([-0.5, -0.5, -0.5]));
            Character.drawCharacter(
                gl, stack, this.uniformShader, simulation, pathFrac
            );
        }
        stack.pop();
	}

    // draw the food:
    var nextFood = [];
    for (var i = 0; i < this.food.length; i++) {
        if (this.food[i].foodDensity == 0) {
            this.food[i].type = "empty";
        } else {
            nextFood.push(this.food[i]);
        }
        foodPos = this.food[i].position;
        stack.push();
        stack.multiply(SglMat4.translation([
            foodPos.x - x/2, foodPos.y - y/2, foodPos.z - z/2
        ]));
        var densityRatio = this.food[i].foodDensity / this.food[i].startingFoodDensity;
        stack.multiply(SglMat4.scaling([
            densityRatio, densityRatio, densityRatio
        ]));
        gl.uniformMatrix4fv(
            this.uniformShader.uModelViewMatrixLocation, false, stack.matrix
        );
        this.drawObject(gl, this.cube, this.uniformShader,
            [0.3, 0.9, 0.3, 1.0], [0.3, 0.9, 0.3, 1.0]);
        stack.pop();
    }
    this.food = nextFood;

	gl.useProgram(null);
	gl.disable(gl.DEPTH_TEST);
}

function toggleSimulation(simulation) {
    var button = document.getElementById("toggle");
    if (SIMULATIONRUNNING) {
        simulation.stop();
        button.value = "Unpause";
        SIMULATIONRUNNING = false;
    } else {
        simulation.start();
        button.value = "Pause";
        SIMULATIONRUNNING = true;
    }
}

function createObjects() {
	this.cube = new Cube();
    this.cylinder = new Cylinder(15);
    this.sphere = new SphereLatLong(15,15);

};

function createBuffers(gl) {
	this.createObjectBuffers(gl, this.cube);
	this.createObjectBuffers(gl, this.sphere);
	this.createObjectBuffers(gl, this.cylinder);
};

function initializeObjects(gl) {
	this.createObjects();
	this.createBuffers(gl);
};

function dispatch(obj, methodName) {
	return function () { obj[methodName].apply(obj, arguments); };
}

function prepareLambertianShader(gl, simulation, P) {
    var stack = simulation.stack;
	gl.useProgram(simulation.lambertianShader);
	gl.uniformMatrix4fv(simulation.lambertianShader.uProjectionMatrixLocation, false, P);
    simulation.sunLightDirection = SglVec4.normalize([0, -0.5, -1, 0, 0.0]);
    simulation.sunLightDirectionViewSpace = SglVec4.normalize(
        SglMat4.mul(simulation.stack.matrix, simulation.sunLightDirection));
	gl.uniform4fv(simulation.lambertianShader.uLightDirectionLocation,simulation.sunLightDirectionViewSpace);
	gl.uniform3fv(simulation.lambertianShader.uLightColorLocation, [0.9, 0.9, 0.9]);
	gl.uniformMatrix4fv(simulation.lambertianShader.uModelViewMatrixLocation, false, stack.matrix);
}
