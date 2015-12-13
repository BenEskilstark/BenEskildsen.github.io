var Character = Character || {};

Character.initializeObjects = function (gl) {
    this.stack = new SglMatrixStack();
    this.createObjects();
    this.createBuffers(gl);
    this.uniformShader = new uniformShader(gl);
};

Character.drawCharacter = function (gl) {
    var stack = this.stack;

    stack.multiply(SglMat4.scaling([10, 10, 10]));
    stack.push();
    this.drawBody(gl);
    stack.pop();
}

Character.drawBody = function (gl) {
    var stack = this.stack;

    // head
    stack.push();
    stack.multiply(SglMat4.scaling([0.9, 0.9, 0.9]));
    gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
    this.drawObject(gl, this.sphere, [0.65, 0.3, 0.3, 1.0], [0, 0, 0, 1.0]);
    // antennea
    stack.multiply(SglMat4.scaling([0.5, 0.5, 0.5]));
    stack.push();
    stack.multiply(SglMat4.translation([-2, 2, 2]));
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
    gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
    this.drawObject(gl, this.sphere, [0, 0, 0, 1.0], [0, 0, 0, 1.0]);
    stack.pop();

    stack.push();
    stack.multiply(SglMat4.translation([-2, 1, -1]));
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [-1, -1, 1]));
    gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
    this.drawObject(gl, this.sphere, [0, 0, 0, 1.0], [0, 0, 0, 1.0]);
    stack.pop();

    stack.pop();

    // thorax
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [0, 0, 0.5]));
    stack.multiply(SglMat4.scaling([0.5, 0.5, 0.5]));
    stack.multiply(SglMat4.translation([0, -3.5, 0]));
    gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
    this.drawObject(gl, this.cylinder, [0.65, 0.3, 0.3, 1.0], [0, 0, 0, 1.0]);

    // draw legs
    stack.push();
    stack.multiply(SglMat4.translation([0, 2.5, 0]));
    for (var i = 0; i < 3; i++) {
        stack.push();
        stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(10 * (i - 1)), [1, 0, 0]));
        // left set of legs
        stack.multiply(SglMat4.translation([-1, -1 * i - 0.5, 0]));
        this.drawLeg(gl);

        // right set of legs
        stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-20 * (i - 1)), [1, 0, 0]));
        stack.multiply(SglMat4.scaling([1, -1, -1]));
        this.drawLeg(gl);

        stack.pop();
    }
    stack.pop();

    // abdomen
    stack.multiply(SglMat4.scaling([2.2, 2.2, 2.2]));
    stack.multiply(SglMat4.translation([0, -0.9, 0]));
    gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
    this.drawObject(gl, this.sphere, [0.65, 0.3, 0.3, 1.0], [0, 0, 0, 1.0]);
}

Character.drawLeg = function (gl) {
    var stack = this.stack;
    stack.push();
    // rotate leg away from body
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(90), [1, 0, 0]));

    // first leg segment
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(-30), [0, 0, 1]));
    this.drawLegSegment(gl);
    // second leg segment
    stack.multiply(SglMat4.rotationAngleAxis(sglDegToRad(60), [0, 0, 1]));
    stack.multiply(SglMat4.translation([2.5, 1.5, 0]));
    this.drawLegSegment(gl);

    stack.pop();
}

Character.drawLegSegment = function (gl) {
    var stack = this.stack;
    stack.push();
    stack.multiply(SglMat4.scaling([0.25, 1.5, 0.25]));

    gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
    this.drawObject(gl, this.cylinder, [0.65, 0.3, 0.3, 1.0], [0, 0, 0, 1.0]);
    stack.pop();
}

Character.drawScene = function (gl) {
    var width = 500;
    var height = 500;

    gl.viewport(0, 0, width, height);

    // Clear the framebuffer
    gl.clearColor(0.4, 0.6, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(this.uniformShader);

    // Setup projection matrix
    var ratio = width / height;
    var bbox = [ -50, 50, -50, 50, 50, 50];
    var winW = (bbox[3] - bbox[0]);
    var winH = (bbox[5] - bbox[2]);
    winW = winW * ratio * (winH / winW);
    var P = SglMat4.ortho([-winW / 2, -winH / 2, -100.0], [winW / 2, winH / 2, 100.0]);
    gl.uniformMatrix4fv(this.uniformShader.uProjectionMatrixLocation, false, P);

    var stack = this.stack;
    stack.loadIdentity();
    // create the inverse of V
    var invV = SglMat4.lookAt([-2, 3, 4], [0, 0, 0], [0, 1, 0]);
    stack.multiply(invV);
    stack.push();

    this.drawCharacter(gl);
    stack.pop();

    gl.useProgram(null);
    gl.disable(gl.DEPTH_TEST);
};

Character.createObjects = function () {
    this.cube = new Cube();
    this.cylinder = new Cylinder(15);
    this.sphere = new SphereLatLong(15,15);
}

Character.createObjectBuffers = function (gl, obj) {
    obj.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    obj.indexBufferTriangles = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // create edges
    var edges = new Uint16Array(obj.numTriangles * 3 * 2);
    for (var i = 0; i < obj.numTriangles; ++i) {
        edges[i * 6 + 0] = obj.triangleIndices[i * 3 + 0];
        edges[i * 6 + 1] = obj.triangleIndices[i * 3 + 1];
        edges[i * 6 + 2] = obj.triangleIndices[i * 3 + 0];
        edges[i * 6 + 3] = obj.triangleIndices[i * 3 + 2];
        edges[i * 6 + 4] = obj.triangleIndices[i * 3 + 1];
        edges[i * 6 + 5] = obj.triangleIndices[i * 3 + 2];
    }

    obj.indexBufferEdges = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

Character.createBuffers = function (gl) {
    this.createObjectBuffers(gl, this.cube);
    this.createObjectBuffers(gl, this.cylinder);
    this.createObjectBuffers(gl, this.sphere);
};

Character.drawObject = function (gl, obj, fillColor, lineColor) {
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
    gl.enableVertexAttribArray(this.uniformShader.aPositionIndex);
    gl.vertexAttribPointer(this.uniformShader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);

    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 1.0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
    gl.uniform4fv(this.uniformShader.uColorLocation, fillColor);
    gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);

    gl.disable(gl.POLYGON_OFFSET_FILL);

    gl.uniform4fv(this.uniformShader.uColorLocation, lineColor);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
    gl.drawElements(gl.LINES, obj.numTriangles * 3 * 2, gl.UNSIGNED_SHORT, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    gl.disableVertexAttribArray(this.uniformShader.aPositionIndex);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
