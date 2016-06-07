// This is the part that makes objects cast shadows on each other: from here
// we'd check to see if the area in a shadowy spot can 'see' a light, and when
// this returns `false`, we make the area shadowy.
function isLightVisible(pt, scene, light) {
    var distObject =  intersectScene({
		point: pt,
		vector: Vector.unitVector(Vector.subtract(light.point, pt))
    }, scene);

    //////////////////////////////////////////////////////////////////
    // Assignment 6 q1
    // check if pt is within the angle of the spot light
    if (light.type == "spot") {
        var lp = Vector.subtract(light.point, pt);
        var ll = Vector.subtract(light.point, light.toPoint);
        var theta = Math.acos(
            Vector.dotProduct(lp, ll) / (Vector.length(lp) * Vector.length(ll))
        );
        if (!lp || ! ll || !theta) {
            console.log(lp, ll, theta);
        }
        if (theta * 180 / Math.PI > light.angle) {
            return false;
        }
    }
    //////////////////////////////////////////////////////////////////

    // correction visible if intersection is further than distance to light
    return (distObject[0] > Vector.length(Vector.subtract(light.point, pt)) -.005);
}
