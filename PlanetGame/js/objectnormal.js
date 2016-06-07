// for Assign 6
// Compute normal of object

function objectNormal(object, point){
    if (object.type == 'sphere') return (sphereNormal (object, point));

    if (object.type == 'spheretex'){
        var newnorm = Vector.subtract(point, object.point);
        // angle to vertical is theta
        newnorm=Vector.unitVector(newnorm);
        diff = Math.cos(20*3.14159*Math.abs(point.y - object.point.y)/object.radius);
        newnorm.y += .2*diff;
        newnorm= Vector.unitVector(newnorm);
        return (newnorm);
    };

    if (object.type == 'triangle') return (triNormal(object));
    /////////////////////////////////////////////////////////////
    // Assignment 6 q3
    if (object.type == 'spherelong') {
        var numRidges = 50;
        var newnorm = Vector.subtract(point, object.point);
        newnorm = Vector.unitVector(newnorm);
        // find it's angle from vertical
        var elevationAngle = Math.acos(Math.abs(point.y - object.point.y) / object.radius);
        var radiusAtElevation = object.radius * Math.sin(elevationAngle);
        var azimuthalAngle = Math.acos(Math.abs(point.x - object.point.x) / radiusAtElevation);
        var diff = Math.cos(numRidges * azimuthalAngle);
        newnorm.x += 0.2 * diff;
        newnorm = Vector.unitVector(newnorm);
        return (newnorm);
    }
    /////////////////////////////////////////////////////////////
}
