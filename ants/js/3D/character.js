var Character = {};

Character.drawCharacter = function (gl, stack, shader, simulation, pathFrac) {
    this.stack = stack;
    this.simulation = simulation;
    this.sphere = this.simulation.sphere;
    this.cylinder = this.simulation.cylinder;
    this.shader = shader;

    stack.push();
    stack.multiply(SglMat4.scaling([0.2, 0.2, 0.2]));
    stack.multiply(SglMat4.translation([1, 1, 2.3]));
    this.drawBody(gl, pathFrac);
    stack.pop();
}

Character.drawBody = function (gl, pathFrac) {
    var stack = this.stack;

    // head
    stack.push();
    gl.uniformMatrix4fv(this.shader.uModelViewMatrixLocation, false, stack.matrix);
    this.simulation.drawObject(gl, this.sphere, this.shader, [0.9, 0.2, 0.2, 1.0], [0.9, 0.2, 0.2, 1.0]);
    // antennea
    stack.multiply(SglMat4.scaling([0.4, 0.4, 0.4]));
    stack.push();
    stack.multiply(SglMat4.translation([-2, 2, 1.5]));
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [-1, -1, 1]));
    this.drawLeg(gl);
    stack.pop();
    stack.push();
    stack.multiply(SglMat4.translation([-2, 2, 0]));
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [-1, -1, 1]));
    this.drawLeg(gl);
    stack.pop();
    // eyes
    stack.multiply(SglMat4.translation([-0.5, 0, 0]));
    stack.multiply(SglMat4.scaling([0.6, 0.6, 0.6]));
    stack.push();
    stack.multiply(SglMat4.translation([-2, 1, 2.5]));
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [-1, -1, 1]));
    gl.uniformMatrix4fv(this.shader.uModelViewMatrixLocation, false, stack.matrix);
    this.simulation.drawObject(gl, this.sphere, this.shader, [0, 0, 0, 1.0], [0, 0, 0, 1.0]);
    stack.pop();

    stack.push();
    stack.multiply(SglMat4.translation([-2, 1, -1]));
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [-1, -1, 1]));
    gl.uniformMatrix4fv(this.shader.uModelViewMatrixLocation, false, stack.matrix);
    this.simulation.drawObject(gl, this.sphere, this.shader, [0, 0, 0, 1.0], [0, 0, 0, 1.0]);
    stack.pop();

    stack.pop();

    // thorax
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [0, 0, 0.5]));
    stack.multiply(SglMat4.scaling([0.5, 0.5, 0.5]));
    stack.multiply(SglMat4.translation([0, -3.5, 0]));
    gl.uniformMatrix4fv(this.shader.uModelViewMatrixLocation, false, stack.matrix);
    this.simulation.drawObject(gl, this.cylinder, this.shader, [0.9, 0.2, 0.2, 1.0], [0.9, 0.2, 0.2, 1.0]);

    // draw legs
    stack.push();
    stack.multiply(SglMat4.translation([0, 2.5, 0]));
    for (var i = 0; i < 3; i++) {
        stack.push();
        stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(10 * (i - 1)), [1, 0, 0]));
        // left set of legs
        stack.multiply(SglMat4.translation([-1, -1 * i - 0.5, 0]));
        if (i == 1) {
            this.drawLeg(gl, 1 - pathFrac);
        } else {
            this.drawLeg(gl, pathFrac);
        }

        // right set of legs
        stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-20 * (i - 1)), [1, 0, 0]));
        stack.multiply(SglMat4.scaling([1, -1, -1]));
        if (i != 1) {
            this.drawLeg(gl, 1 - pathFrac);
        } else {
            this.drawLeg(gl, pathFrac);
        }

        stack.pop();
    }
    stack.pop();

    // abdomen
    stack.multiply(SglMat4.scaling([2.2, 2.2, 2.2]));
    stack.multiply(SglMat4.translation([0, -0.9, 0]));
    gl.uniformMatrix4fv(this.shader.uModelViewMatrixLocation, false, stack.matrix);
    this.simulation.drawObject(gl, this.sphere, this.shader, [0.9, 0.2, 0.2, 1.0], [0.9, 0.2, 0.2, 1.0]);
    stack.pop();
}

Character.drawLeg = function (gl, pathFrac) {
    var stack = this.stack;
    stack.push();
    // rotate leg away from body
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [1, 0, 0]));

    // first leg segment
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-30), [0, 0, 1]));
    this.drawLegSegment(gl);
    // second leg segment
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(60 * pathFrac), [0, 0, 1]));
    stack.multiply(SglMat4.translation([2.5, 1.5, 0]));
    this.drawLegSegment(gl);

    stack.pop();
}

Character.drawLegSegment = function (gl) {
    var stack = this.stack;
    stack.push();
    stack.multiply(SglMat4.scaling([0.25, 1.5, 0.25]));

    gl.uniformMatrix4fv(this.shader.uModelViewMatrixLocation, false, stack.matrix);
    this.simulation.drawObject(gl, this.cylinder, this.shader, [0.9, 0.2, 0.2, 1.0], [0.9, 0.2, 0.2, 1.0]);
    stack.pop();
}

