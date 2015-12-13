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
    simulation.initShaders = initShaders.bind(simulation);
    simulation.drawObject = drawObject.bind(simulation);
    simulation.createObjects = createObjects.bind(simulation);
    simulation.createBuffers = createBuffers.bind(simulation);
    simulation.createObjectBuffers = createObjectBuffers.bind(simulation);
    simulation.initializeObjects = initializeObjects.bind(simulation);

    simulation.seedWithDirt(numDirt);
    simulation.seedWithAnts(numAnts);
    // initialize some more stuff:
    simulation.stack = new SglMatrixStack();
    simulation.uniformShader = new uniformShader(gl);
    simulation.initializeObjects(gl);

    // timing stuff
    simulation.previousTime = Date.now();
    simulation.stepCount = 0;

    simulation.start();
    SIMULATIONRUNNING = true;
    document.getElementById("start").value = "Restart";

    return simulation;
}

function run() {
    var framesPerStep = 200 - parseInt(document.getElementById("speed").value) + 1;
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

	// Clear the framebuffer
	gl.clearColor(0.4, 0.6, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.enable(gl.DEPTH_TEST);
	gl.useProgram(this.uniformShader);

	// Setup projection matrix
    var zoom = parseInt(document.getElementById("zoomLevel").value);
	var ratio = width / height; //line 229, Listing 4.1{
	var bbox = [0, 0, 0, 10 * zoom, 1, 10 * zoom];
	var winW = (bbox[3] - bbox[0]);
	var winH = (bbox[5] - bbox[2]);
	winW = winW * ratio * (winH / winW);
	var P = SglMat4.ortho([-winW / 2, -winH / 2, -100.0], [winW / 2, winH / 2, 100.0]);
	gl.uniformMatrix4fv(this.uniformShader.uProjectionMatrixLocation, false, P);

	var stack = this.stack;
	stack.loadIdentity(); //line 238}

    // camera
    var cameraX = parseInt(document.getElementById("cameraX").value) / 20 * x;
    var cameraY = parseInt(document.getElementById("cameraY").value) / 20 * y;
    var cameraZ = parseInt(document.getElementById("cameraZ").value) / 20 * z;
    var lookAtX = parseInt(document.getElementById("lookAtX").value) / 20 * x;
    var lookAtY = parseInt(document.getElementById("lookAtY").value) / 20 * y;
    var lookAtZ = parseInt(document.getElementById("lookAtZ").value) / 20 * z;

	var invV = SglMat4.lookAt(
        [lookAtX + cameraX, lookAtY + cameraY, lookAtZ + cameraZ], // camera location
        [lookAtX, lookAtY, lookAtZ], // point camera is looking at
        [0, 1, 0] // vector pointing up
    );

	stack.multiply(invV);
	stack.push();//line 242
	stack.pop();

	var dirt = this.dirt;
	for (var t in dirt) {
        stack.push();
        stack.multiply(SglMat4.translation([
            dirt[t].x, dirt[t].y, dirt[t].z
        ]));
        gl.uniformMatrix4fv(
            this.uniformShader.uModelViewMatrixLocation, false, stack.matrix
        );
		this.drawObject(gl, this.cube, [0.3, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
        stack.pop();
	}
    // create the ants
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
            antPos.x, antPos.y, antPos.z
        ]));

        if (antResolution === 0) {
            gl.uniformMatrix4fv(
                this.uniformShader.uModelViewMatrixLocation, false, stack.matrix
            );
            this.drawObject(gl, this.cube, [0.9, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
        } else if (antResolution == 1) {
            // point the ant in its direction of motion:
            var deg = 0;
            if (curPos.z - prevPos.z == 1)  { deg = 90; }
            if (curPos.x - prevPos.x == 1)  { deg = 180; }
            if (curPos.z - prevPos.z == -1) { deg = -90; }
            if (pathFrac < 0.25) {
                deg *= 4 * pathFrac;
            }
            stack.multiply(SglMat4.translation([0.5, 0.5, 0.5]));
            stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(deg), [0, 1, 0]));
            stack.multiply(SglMat4.translation([-0.5, -0.5, -0.5]));
            Character.drawCharacter(
                gl, stack, this.uniformShader, simulation
            );
        }
        stack.pop();
	}

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);

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

    this.dirt = [];
    var occupiableCells = this.world.getOccupiableDirtCells();
	for (var i = 0; i < occupiableCells.length; i++) {
        this.dirt.push(occupiableCells[i].position);
	}
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
