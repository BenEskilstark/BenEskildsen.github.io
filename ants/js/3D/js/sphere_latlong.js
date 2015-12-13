// numElevation is the number of division in the elevation angle
// numAzimuthal is the number of divisions around the sphere
function SphereLatLong(numElevation, numAzimuthal) {
    this.name = "sphere";

    ////////////////////////////////////////////////////////////////////////
    // vertices
    this.vertices = new Float32Array(3 * (2 + (numAzimuthal * numElevation)));
    // middle circles
    var vertexOffset = 0;
    var radius = 1.0;
    var azimuthalAngle, elevationAngle;
    var elevationStep = Math.PI / numElevation;
    var azimuthalStep = 2 * Math.PI / numAzimuthal;
    for (var j = 1; j < numElevation; j++) {
        elevationAngle = elevationStep * j;
        for (var i = 0; i < numAzimuthal; i++) {
            azimuthalAngle = azimuthalStep * i;
            var radiusAtElevation = radius * Math.sin(elevationAngle);
            this.vertices[vertexOffset] = radiusAtElevation * Math.cos(azimuthalAngle);
            this.vertices[vertexOffset + 1] = radius * Math.cos(elevationAngle);
            this.vertices[vertexOffset + 2] = radiusAtElevation * Math.sin(azimuthalAngle);
            vertexOffset += 3;
        }
    }
    vertexOffset += 3;
    // top of sphere
    this.vertices[vertexOffset] = 0.0;
    this.vertices[vertexOffset + 1] = 1.0;
    this.vertices[vertexOffset + 2] = 0.0;
    vertexOffset += 3;
    // bottom of sphere
    this.vertices[vertexOffset] = 0.0;
    this.vertices[vertexOffset + 1] = -1.0;
    this.vertices[vertexOffset + 2] = 0.0;
    ////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////
    // triangles
    this.triangleIndices = new
        Uint16Array(3 * ((2 * numAzimuthal) + (numElevation - 2) * numAzimuthal * 2));
    // top of sphere
    var triangleOffset = 0;
    for (var i = 0; i < numAzimuthal; i++) {
        this.triangleIndices[triangleOffset] = vertexOffset / 3 - 1;
        this.triangleIndices[triangleOffset + 1] = i;
        this.triangleIndices[triangleOffset + 2] = (i + 1) % numAzimuthal;
        triangleOffset += 3;
    }
    // lateral surfaces
    for (var j = 0; j < numElevation - 2; j++) {
        var startOfSurface = j * numAzimuthal;
        for (var i = 0; i < numAzimuthal; i++) {
            var index = i + startOfSurface;
            this.triangleIndices[triangleOffset] = index;
            this.triangleIndices[triangleOffset + 1] =
                (index + 1) % numAzimuthal + startOfSurface + numAzimuthal;
            this.triangleIndices[triangleOffset + 2] =
                index % numAzimuthal + startOfSurface + numAzimuthal;
            triangleOffset += 3;

            this.triangleIndices[triangleOffset] = index;
            this.triangleIndices[triangleOffset + 1] =
                (index + 1) % numAzimuthal + startOfSurface;
            this.triangleIndices[triangleOffset + 2] =
                (index + 1) % numAzimuthal + startOfSurface + numAzimuthal;
            triangleOffset += 3;
        }
    }
    // bottom of sphere
    var startOfSurface = numAzimuthal * (numElevation - 2);
    for (var i = 0; i < numAzimuthal; i++) {
        this.triangleIndices[triangleOffset] = vertexOffset / 3;
        this.triangleIndices[triangleOffset + 1] = startOfSurface + i
        this.triangleIndices[triangleOffset + 2] =
           (startOfSurface + i + 1) % numAzimuthal + startOfSurface;
        triangleOffset += 3;
    }
    ////////////////////////////////////////////////////////////////////////

    this.numVertices = this.vertices.length / 3;
    this.numTriangles = this.triangleIndices.length / 3;
}
