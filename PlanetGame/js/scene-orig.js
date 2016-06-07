

// # The Scene
// In this file, the original red/blue/white room with overhead white light, and orange and blue corner lights
var scene = {};


// ## The Camera
//
// Our camera is pretty simple: it's a point in space, where you can imagine
// that the camera 'sits', a `fieldOfView`, which is the angle from the right
// to the left side of its frame, and a `vector` which determines what
// angle it points in.

// updated for Assn 6 so that camera.vector is more descriptively camera.toPoint
// updated for Assn 6 so that there is a camera.up instead of using vector.UP

scene.camera = {
    point: { // the eye location
        x: 50,
        y: 50,
        z: 400
    },
    fieldOfView: 40,
    toPoint: { // point indicated direction of view
        x: 50,
        y: 50,
        z: 0
    },
    up: { // added explicitly (this was always the up direction before)
	    x: 0,
	    y: 1,
	    z: 0
    },
    velocity: {
        x: 0,
        y: 0,
        z: 0,
    }
};

// ## Lights
//
// Lights are defined only as points in space - surfaces that have lambert
// shading will be affected by any visible lights.
// updated for Assn 6 so that lights have a type and color

scene.lights = [
    {
        type: 'omni',
        point: {
            x: 0,
            y: 0,
            z: 100
        },
        color: {
            x: 155,
            y: 155,
            z: 155
        },
    },
    ////////////////////////////////////////////////////////////////
    // Assignment 6 q1
    // {
    //     type: "spot",
    //     point: {
    //         x: 5,
    //         y: 95,
    //         z: 100
    //     },
    //     toPoint: {
    //         x: 70,
    //         y: 25,
    //         z: 50
    //     },
    //     angle: 30,
    //     color: {
    //         x: 255,
    //         y: 220,
    //         z: 200
    //     }
    // }
    ////////////////////////////////////////////////////////////////
];

// ## Objects
//
// This raytracer handles sphere objects, with any color, position, radius,
// and surface properties.
// updated for Assn 6 so that objects and their materials are defined separately

scene.objects = [

// our main test objects
// are spheres sitting on the floor
    {
        type: 'sphere',
        point: {
            x: 200,
            y: 50,
            z: 0
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        mat: 0,
        radius: 125
    },
    // missile
    {
        type: 'sphere',
        point: {
            x: 50,
            y: 50,
            z: 400
        },
        velocity: {
            x: 0,
            y: 0,
            z: 0
        },
        mat: 2,
        radius: 5
    }

// floor
// {
// 	type: 'triangle',
// 	point1: {
// 	x: 0, y: 0, z: 0
// 	},
// 	point2: {
// 	x: 0, y: 0, z: 100
// 	},
// 	point3: {
// 	x: 100, y: 0, z: 100
// 	},
// 	mat: 1
// },

];

scene.mats = [
// material 0

{
	type: 'orig',
	color: {
               x: 234,
               y: 214,
               z: 184
        	},
        specular: 0.0,
        lambert: 0.85,
        ambient: 0.1
},
// material 1
// diffuse white
{
	type: 'orig',
	color: {
               x: 255,
               y: 255,
               z: 255
        	},
       specular: 0.0,
        lambert: 0.9,
        ambient: 0.05
},
// material 2
// diffuse red
{
	type: 'orig',
	color: {
		x: 255,
		y: 90,
		z: 90
		},
        specular: 0.0,
	lambert: 0.9,
	ambient: 0.1
},
// material 3
//diffuse blue
{
	type: 'orig',
	color: {
		x: 90,
		y: 90,
		z: 255
		},
        specular: 0.0,
	lambert: 0.9,
	ambient: 0.1
},
// material 4
//mirror
{
	type: 'phong',
    n: 8,
    metal: false,
	color: {
		x: 200,
		y: 170,
		z: 60
    },
    specular: 0.9,
	lambert: 0.1,
	ambient: 0.0
},
///////////////////////////////////////////////////////////////
// Assignment 6 q2
// material 5
{
	type: 'phong',
    n: 10,
    metal: true,
	color: {
		x: 200,
		y: 170,
		z: 60
    },
    specular: 0.9,
	lambert: 0.9,
	ambient: 0.0
},
///////////////////////////////////////////////////////////////
]


