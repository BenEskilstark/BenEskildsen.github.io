// assumed dimensions are 1.0 per side
function Cube() {

    // this.position = position;
    // this.positionArray = [position.x, position.y, position.z];
    this.name = "cube";

    // this.vertices = new Float32Array([
    //     position.x, position.y, position.z + 1,
    //     position.x + 1, position.y, position.z + 1,
    //     position.x, position.y + 1, position.z + 1,
    //     position.x + 1, position.y + 1, position.z + 1,

    //     position.x, position.y, position.z,
    //     position.x + 1, position.y, position.z,
    //     position.x, position.y + 1, position.z,
    //     position.x + 1, position.y + 1, position.z
    // ]);

    this.vertices = new Float32Array([
        0, 0, 1,
        1, 0, 1,
        0, 1, 1,
        1, 1, 1,

        0, 0, 0,
        1, 0, 0,
        0, 1, 0,
        1, 1, 0
    ]);

    this.triangleIndices = new Uint16Array([
         0, 1, 2,    2, 1, 3,     // front
         5, 4, 7,    7, 4, 6,     // back
         4, 0, 6,    6, 0, 2,     // left
         1, 5, 3,    3, 5, 7,     // right
         2, 3, 6,    6, 3, 7,     // top
         4, 5, 0,    0, 5, 1      // bottom
    ] );

    this.numVertices = this.vertices.length / 3;
    this.numTriangles = this.triangleIndices.length / 3;
}
