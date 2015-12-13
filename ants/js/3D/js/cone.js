// resolution is the number of faces used to approximate the cone
// assumed radius is 1.0 and assumed height is 2.0
function Cone(resolution) {
    this.name = "cone";

    this.vertices = new Float32Array(3 * (resolution + 2));
    // apex of the cone:
    this.vertices[0] = 0.0;
    this.vertices[1] = 2.0;
    this.vertices[2] = 0.0;
    // base of the cone:
    var radius = 1.0;
    var angle;
    var step = 2 * Math.PI / resolution;
    var vertexOffset = 3;
    for (var i = 0; i < resolution; i++) {
        angle = step * i;
        this.vertices[vertexOffset] = radius * Math.cos(angle);
        this.vertices[vertexOffset + 1] = 0.0;
        this.vertices[vertexOffset + 2] = radius * Math.sin(angle);
        vertexOffset += 3;
    }
    this.vertices[vertexOffset] = 0.0;
    this.vertices[vertexOffset + 1] = 0.0;
    this.vertices[vertexOffset + 2] = 0.0;

    // lateral section of cone
    this.triangleIndices = new Uint16Array(3 * 2 * resolution);
    var triangleOffset = 0;
    for (var i = 0; i < resolution; i++) {
        this.triangleIndices[triangleOffset] = 0.0;
        this.triangleIndices[triangleOffset + 1] = 1 + (i % resolution);
        this.triangleIndices[triangleOffset + 2] = 1 + ((i + 1) % resolution);
        triangleOffset += 3;
    }
    // bottom of cone
    for (var i = 0; i < resolution; i++) {
        this.triangleIndices[triangleOffset] = 1 + resolution;
        this.triangleIndices[triangleOffset + 1] = 1 + (i % resolution);
        this.triangleIndices[triangleOffset + 2] = 1 + ((i + 1) % resolution);
        triangleOffset += 3;
    }

    this.numVertices = this.vertices.length / 3;
    this.numTriangles = this.triangleIndices.length / 3;
}
