// resolution is the number of faces used to approximate the cylinder
// assumed radius of 1.0 and assumed height of 2.0
function Cylinder(resolution) {
    this.name = "cylinder";

    this.vertices = new Float32Array(3 * (2 * resolution + 2));

    var radius = 1.0;
    var angle;
    var step = 2 * Math.PI / resolution;
    // lower circle
    var vertexOffset = 0;
    for (var i = 0; i < resolution; i++) {
        angle = step * i;
        this.vertices[vertexOffset] = radius * Math.cos(angle);
        this.vertices[vertexOffset + 1] = 0.0;
        this.vertices[vertexOffset + 2] = radius * Math.sin(angle);
        vertexOffset += 3;
    }
    // upper circle
    for (var i = 0; i < resolution; i++) {
        angle = step * i;
        this.vertices[vertexOffset] = radius * Math.cos(angle);
        this.vertices[vertexOffset + 1] = 2.0;
        this.vertices[vertexOffset + 2] = radius * Math.sin(angle);
        vertexOffset += 3;
    }
    this.vertices[vertexOffset] = 0.0;
    this.vertices[vertexOffset + 1] = 0.0;
    this.vertices[vertexOffset + 2] = 0.0;
    vertexOffset += 3;
    this.vertices[vertexOffset] = 0.0;
    this.vertices[vertexOffset + 1] = 2.0;
    this.vertices[vertexOffset + 2] = 0.0;

    this.triangleIndices = new Uint16Array(3 * 4 * resolution);
    // lateral surface
    var triangleOffset = 0;
    for (var i = 0; i < resolution; i++) {
        this.triangleIndices[triangleOffset] = i;
        this.triangleIndices[triangleOffset + 1] = (i + 1) % resolution;
        this.triangleIndices[triangleOffset + 2] = (i % resolution) + resolution;
        triangleOffset += 3;

        this.triangleIndices[triangleOffset] = (i % resolution) + resolution;
        this.triangleIndices[triangleOffset + 1] = (i + 1) % resolution;
        this.triangleIndices[triangleOffset + 2] = ((i + 1) % resolution) + resolution;
        triangleOffset += 3;
    }
    // bottom of cylinder
    for (var i = 0; i < resolution; i++) {
        this.triangleIndices[triangleOffset] = i;
        this.triangleIndices[triangleOffset + 1] = (i + 1) % resolution;
        this.triangleIndices[triangleOffset + 2] = 2 * resolution;
        triangleOffset += 3;
    }
    // top of cylinder
    for (var i = 0; i < resolution; i++) {
        this.triangleIndices[triangleOffset] = resolution + i;
        this.triangleIndices[triangleOffset + 1] = ((i + 1) % resolution) + resolution;
        this.triangleIndices[triangleOffset + 2] = 2 * resolution + 1;
        triangleOffset += 3;
    }

    this.numVertices = this.vertices.length / 3;
    this.numTriangles = this.triangleIndices.length / 3;

}
