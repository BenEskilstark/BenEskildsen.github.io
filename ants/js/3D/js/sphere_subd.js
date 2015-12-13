// numDivisions are the number of iterations of this recursive algorithm
// centered at 0
// radius of sphere is 1
function SphereSubd(numDivisions) {

    this.name = "sphere";

    this.vertices = new Float32Array([
        0.0, 1.0, 0.0,  // top
        1.0, 0.0, 0.0,  // right
        0.0, 0.0, -1.0, // back
        -1.0, 0.0, 0.0, // left
        0.0, 0.0, 1.0,  // front
        0.0, -1.0, 0.0  // bottom
    ]);

    this.triangleIndices = new Uint16Array([
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 1,
        5, 1, 2,
        5, 2, 3,
        5, 3, 4,
        5, 4, 1
    ]);

    var radius = 1;
    var triangleOffsets = [0,1,5, 1,2,3, 1,3,5, 3,4,5];

    // start subdividing:
    for (var j = 0; j < numDivisions; j++) {
        var nextVertices = [];
        var nextTriangles = [];

        vertexCounter = 0;
        for (var t = 0; t < this.triangleIndices.length; t += 3) {
            // go through each edge to calculate new vertex positions
            for (var e = 0; e < 3; e++) {
                var firstX = this.vertices[3 * this.triangleIndices[t + e]];
                var secondX = this.vertices[3 * this.triangleIndices[t + ((e + 1) % 3)]];
                var midpointX = (firstX + secondX) / 2;

                var firstY = this.vertices[3 * this.triangleIndices[t + e] + 1];
                var secondY = this.vertices[3 * this.triangleIndices[t + ((e + 1) % 3)] + 1];
                var midpointY = (firstY + secondY) / 2;

                var firstZ = this.vertices[3 * this.triangleIndices[t + e] + 2];
                var secondZ = this.vertices[3 * this.triangleIndices[t + ((e + 1) % 3)] + 2];
                var midpointZ = (firstZ + secondZ) / 2;

                // add in the point that is already there
                nextVertices.push(firstX);
                nextVertices.push(firstY);
                nextVertices.push(firstZ);

                // add in the adjusted midpoint
                var c = Math.sqrt(radius * radius /
                    (midpointX * midpointX + midpointY * midpointY + midpointZ * midpointZ));
                nextVertices.push(c * midpointX);
                nextVertices.push(c * midpointY);
                nextVertices.push(c * midpointZ);
            }

            for (var i = 0; i < triangleOffsets.length; i++) {
                nextTriangles.push(triangleOffsets[i] + vertexCounter);
            }

            vertexCounter += 6;
        }
        this.vertices = new Float32Array(nextVertices);
        this.triangleIndices = new Uint16Array(nextTriangles);
    }

    this.numVertices = this.vertices.length / 3;
    this.numTriangles = this.triangleIndices.length / 3;
}
