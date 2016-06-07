// # Surface
// If `trace()` determines that a ray intersected with an object, `surface`
// decides what color it acquires from the interaction.
// updated for Assn 6 to have types for lights and colors for lambertAmount
// to account for light colors
function surface(ray, scene, object, pointAtTime, normal, depth) {
    var objColor= scene.mats[object.mat].color;
    var c = Vector.ZERO;
    var specReflect = Vector.ZERO;
    var lambertAmount = Vector.ZERO;
    var phongAmount = Vector.ZERO;

    // **[Lambert shading](http://en.wikipedia.org/wiki/Lambertian_reflectance)**
    // is our pretty shading, which shows gradations from the most lit point on
    // the object to the least.
    for (var i = 0, light; light = scene.lights[i]; i++) {
        // First: can we see the light? If not, this is a shadowy area
        // and it gets no light from the lambert shading process.
        if (isLightVisible(pointAtTime, scene, light)){
            // Otherwise, calculate the lambertian reflectance, which
            // essentially is a 'diffuse' lighting system - direct light
            // is bright, and from there, less direct light is gradually,
            // beautifully, less light.
            var contribution = Vector.dotProduct(Vector.unitVector(
                Vector.subtract(light.point, pointAtTime)), normal
            );
            if (contribution) {
                lambertAmount = Vector.add(
                    lambertAmount,
                    Vector.scale(scene.lights[i].color, contribution)
                );
                lambertAmount = Vector.compScale(lambertAmount, objColor);
                lambertAmount = Vector.scale (lambertAmount, scene.mats[object.mat].lambert);
                lambertAmount = Vector.scale(lambertAmount, 1/255);
            }
            ///////////////////////////////////////////////////////////////
            // Assignment 6 q2
            if (scene.mats[object.mat].type == "phong") {
                var Ks = scene.mats[object.mat].specular;
                var N = normal;
                var L = Vector.unitVector(Vector.subtract(light.point, pointAtTime));
                var V = Vector.unitVector(Vector.scale(ray.vector, -1));
                var H = Vector.scale(Vector.add(L, V), 1/2);
                contribution = Math.pow(Vector.dotProduct(H, N), scene.mats[object.mat].n)
                if (contribution > 0) {
                    var Is = Vector.scale(light.color, contribution);
                    Is = Vector.scale(Is, Ks);
                    lambertAmount = Vector.add(lambertAmount, Is);
                    if (scene.mats[object.mat].metal) {
                        lambertAmount = Vector.compScale(
                            lambertAmount,
                            scene.mats[object.mat].color);
                        lambertAmount = Vector.scale(lambertAmount, 1/255);
                    }
                }
            }
            ///////////////////////////////////////////////////////////////
        }
    }
    // for assn 6, adjust lit color by object color and divide by 255 since
    // light color is 0 to 255

    // Specular is a fancy word for 'reflective': rays that hit objects
    // with specular surfaces bounce off and acquire the colors of other objects
    // they bounce into.
    if (scene.mats[object.mat].specular){
        // This is basically the same thing as what we did in `render()`, just
        // instead of looking from the viewpoint of the camera, we're looking
        // from a point on the surface of a shiny object, seeing what it sees
        // and making that part of a reflection.
        var reflectedRay = {
            point: pointAtTime,
            vector: Vector.reflectThrough(Vector.scale(ray.vector, -1), normal)
        };

        var reflectedColor = trace(reflectedRay, scene, ++depth);
        if (reflectedColor) {
            c = Vector.add(c,Vector.scale(reflectedColor, scene.mats[object.mat].specular));
        }
    }

    // lambert should never 'blow out' the lighting of an object,
    // even if the ray bounces between a lot of things and hits lights
    // updated for Assn 6 lambertAmount is scaled and clamped
    // lambertAmount = Vector.scale(lambertAmount, 1./255.);
    // lambertAmount = Math.min(1, lambertAmount);

    // **Ambient** colors shine bright regardless of whether there's a light visible -
    // a circle with a totally ambient blue color will always just be a flat blue
    // circle.
    return Vector.add3(c,
        lambertAmount,
        Vector.scale(objColor, scene.mats[object.mat].ambient));
}


