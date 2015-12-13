// assumed dimensions are 2.0 per side on the bottom with a height of 2
function Tetrahedron() {

    this.name = "tetrahedron";

    this.vertices = new Float32Array([
        0.0, 1.0, 0.0, // top
        -1.0, -1.0, 1.0, // front left
        1.0, -1.0, 1.0, // front right
        0.0, -1.0, -1 * Math.cos(Math.PI / 3), // back
    ]);

    this.triangleIndices = new Uint16Array([
        0, 2, 1,    // front
        0, 1, 3,    // left face
        0, 3, 2,    // right face
        1, 2, 3,    // bottom face
    ]);

    this.numVertices = this.vertices.length / 3;
    this.numTriangles = this.triangleIndices.length / 3;
}
