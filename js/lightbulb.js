var WIDTH = 500;
var HEIGHT = 500;

var STEP = 2 * Math.PI / 50; // degrees per ray
var BOUNCES = 5; // number of bounces per ray

var lightbulb = {
    type: 'lightbulb',
    x: 250,
    y: 250,
    radius: 10,
    color: {
        r: 220,
        g: 220,
        b: 0,
        a: 255
    }
};
var dragging = false;
var draggedObj = null;

var WALLS = [
    // walls of the room:
    {
        type: "linear",
        start: {x: 1, y: 1},
        end: {x: 1, y: HEIGHT - 1}
    },
    {
        type: "linear",
        start: {x: WIDTH - 1, y: 1},
        end: {x: WIDTH - 1, y: HEIGHT - 1}
    },
    {
        type: "linear",
        start: {x: 1, y: HEIGHT - 1},
        end: {x: WIDTH - 1, y: HEIGHT - 1}
    },
    {
        type: "linear",
        start: {x: 1, y: 1},
        end: {x: WIDTH - 1, y: 1}
    },
];

function setup() {
    var canvas = document.getElementById("room");
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);

    drawScene();
}
///////////////////////////////////////////////////////////
// Adding shapes
function addLine() {
    var x1 = parseFloat(document.getElementById("linex1").value);
    var y1 = parseFloat(document.getElementById("liney1").value);
    var x2 = parseFloat(document.getElementById("linex2").value);
    var y2 = parseFloat(document.getElementById("liney2").value);

    WALLS.push({
        type: "linear",
        start: {x: x1, y: y1},
        end: {x: x2, y: y2}
    });

    drawScene();
}

function addCircle() {
    var circlex = parseFloat(document.getElementById("circlex").value);
    var circley = parseFloat(document.getElementById("circley").value);
    var radius = parseFloat(document.getElementById("circleradius").value);

    WALLS.push({
        type: "circular",
        center: {x: circlex, y: circley},
        radius: radius
    });

    drawScene();
}

function addEllipse() {
    var x = parseFloat(document.getElementById("ellipsex").value);
    var y = parseFloat(document.getElementById("ellipsey").value);
    var a = parseFloat(document.getElementById("ellipsea").value);
    var b = parseFloat(document.getElementById("ellipseb").value);

    WALLS.push({
        type: "elliptical",
        center: {x: x, y: y},
        a: a,
        b: b
    });

    drawScene();
}

function addParabola() {
    var parabolax = parseFloat(document.getElementById("parabolax").value);
    var parabolay = parseFloat(document.getElementById("parabolay").value);
    var a = parseFloat(document.getElementById("parabolaradius").value);

    WALLS.push({
        type: "parabolic",
        center: {x: parabolax, y: parabolay},
        a: a
    });

    drawScene();
}

function addHyperbola() {
    var x = parseFloat(document.getElementById("hyperbolax").value);
    var y = parseFloat(document.getElementById("hyperbolay").value);
    var a = parseFloat(document.getElementById("hyperbolaa").value);
    var b = parseFloat(document.getElementById("hyperbolab").value);

    WALLS.push({
        type: "hyperbolic",
        center: {x: x, y: y},
        a: a,
        b: b
    });

    drawScene();
}
///////////////////////////////////////////////////////////
// Listeners
function updateSliders() {
    STEP = 2 * Math.PI / parseInt(document.getElementById("numrays").value);
    BOUNCES = parseInt(document.getElementById("numbounces").value);

    drawScene();
}
function handleMouseDown(evt) {
    var canvas = document.getElementById("room");
    var boundingRect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - boundingRect.left) * canvas.width / boundingRect.width;
    mouseY = (evt.clientY - boundingRect.top) * canvas.height / boundingRect.height;

    if (didClick(lightbulb, mouseX, mouseY)) {
        dragging = true;
        draggedObj = lightbulb;
    }

    if (dragging) {
        window.addEventListener("mousemove", handleMouseMove, false);
    }
}
function handleMouseUp(evt) {
    if (dragging) {
        dragging = false;
        window.removeEventListener("mousemove", handleMouseMove, false);
    }
}
function handleMouseMove(evt) {
    var canvas = document.getElementById("room");
    var bRect = canvas.getBoundingClientRect();
    var mouseX = (evt.clientX - bRect.left)*(canvas.width/bRect.width);
    var mouseY = (evt.clientY - bRect.top)*(canvas.height/bRect.height);

    var minX = draggedObj.radius;
    var minY = draggedObj.radius;
    var maxX = canvas.width - draggedObj.radius;
    var maxY = canvas.height - draggedObj.radius;
    var posX = mouseX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    var posY = mouseY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

    draggedObj.x = posX;
    draggedObj.y = posY;

    drawScene();
}

function didClick(obj, mouseX, mouseY) {
    var dx = obj.x - mouseX;
    var dy = obj.y - mouseY;
    if (obj.type === 'lightbulb') {
        return (dx * dx) + (dy * dy) < obj.radius * obj.radius;
    }
    return false;
}
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Drawing
function drawScene() {
    var context = document.getElementById("room").getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    drawLightbulb();
    drawWalls();
}

function drawWalls() {
    var context = document.getElementById("room").getContext("2d");
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 3;
    for (var i = 0, wall; wall = WALLS[i]; i++) {
        if (wall.type === "linear") {
            context.beginPath();
            context.moveTo(wall.start.x, wall.start.y);
            context.lineTo(wall.end.x, wall.end.y);
            context.stroke();
        } else if (wall.type === "circular") {
            context.beginPath();
            context.arc(wall.center.x, wall.center.y, wall.radius, 0, Math.PI * 2);
            context.stroke();
        } else if (wall.type === "elliptical") {
            context.beginPath();
            context.ellipse(wall.center.x, wall.center.y, wall.a, wall.b, 0, 0, Math.PI * 2);
            context.stroke();
        } else if (wall.type === "parabolic") {
            context.beginPath();
        } else if (wall.type === "hyperbolic") {

        }
    }
}

function drawLightbulb() {
    var context = document.getElementById("room").getContext("2d");

    context.strokeStyle = colorToHex(lightbulb.color);
    context.lineWidth = 1;
    // create the rays of light coming from the bulb
    var rays = [];
    for (var i = 0; i < 2 * Math.PI; i += STEP) {
        rays.push({
            point: {x: lightbulb.x, y: lightbulb.y},
            vector: {x: Math.cos(i), y: Math.sin(i)},
            reflected: 0 // so that it doesn't reflect forever
        });
    }
    drawRays(rays);

    // draw the lightbulb after (and on top of) the rays)
    context.beginPath();
    context.arc(lightbulb.x, lightbulb.y, lightbulb.radius, 0, Math.PI * 2);
    context.fillStyle = "#FFFF00";
    context.strokeStyle = "black";
    context.stroke();
    context.fill();
}

function drawRays(rays) {
    while (rays.length > 0) {
        var ray = rays.pop();
        var end = {x: ray.point.x, y: ray.point.y};
        var counter = 0;
        // trace the ray's path until it leaves the screen or hits a wall (and give
        // it a chance to get away from a wall it had reflected off of)
        while(counter < 1 ||
                (end.x < WIDTH && end.x > 0 && end.y < HEIGHT && end.y > 0) &&
                !collide(end)) {
            end.x += ray.vector.x;
            end.y += ray.vector.y;
            counter += 1;
        }
        var collision = collide(end);
        drawRay(ray.point, end);
        if (collision && ray.reflected < BOUNCES) {
            var normal;
            if (collision.type === "linear") {
                normal = linearNormal({
                    x: collision.end.x - collision.start.x,
                    y: collision.end.y - collision.start.y
                });
            } else if (collision.type === "circular") {
                normal = circularNormal(collision, end);
            } else if (collision.type === "elliptical") {
                normal = ellipticalNormal(collision, end);
            } else if (collision.type === "parabolic") {
                normal = parabolicNormal();
            } else if (collision.type === "hyperbolic") {
                normal = hyperbolicNormal();
            }
            var dot = dotProduct(ray.vector, normal);
            var reflected = {
                point: {x: end.x, y: end.y},
                vector: {
                    x: ray.vector.x - 2 * dot * normal.x,
                    y: ray.vector.y - 2 * dot * normal.y
                },
                reflected: ray.reflected + 1
            }
            rays.push(reflected);
        }
    }
}

function drawRay(start, end) {
    var context = document.getElementById("room").getContext("2d");
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}
///////////////////////////////////////////////////////////

function collide(point) {
    for (var i = 0, wall; wall = WALLS[i]; i++) {
        if (wall.type === "linear") { // use point-slope form to find collision
            if (point.x < wall.start.x || point.x > wall.end.x) {
                continue;
            }
            var slope = (wall.end.y - wall.start.y) / (wall.end.x - wall.start.x + 0.01);
            var ySide = point.y - wall.start.y;
            var xSide = slope * (point.x - wall.start.x);
            if (Math.abs(ySide - xSide) < 1) {
                return wall;
            }
        } else if (wall.type === "circular") {
            var xDist = point.x - wall.center.x;
            var yDist = point.y - wall.center.y;
            var distToCenter = Math.sqrt(xDist * xDist + yDist * yDist);
            if (Math.abs(wall.radius - distToCenter) < 1) {
                return wall;
            }
        } else if (wall.type === "elliptical") {
            var x = point.x;
            var y = point.y;
            var h = wall.center.x;
            var k = wall.center.y;
            var a = wall.a;
            var b = wall.b;
            var formula = (x - h) * (x - h) / (a * a) + (y - k) * (y - k) / (b * b) - 1;
            if (Math.abs(formula) < 0.05) {
                return wall;
            }
        } else if (wall.type === "parabolic") {

        } else if (wall.type === "hyperbolic") {

        }
    }
    return false;
}

///////////////////////////////////////////////////////////
// Vector math
function dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}
function vectorLength(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}
function unitVector(vector) {
    return {x: vector.x / vectorLength(vector), y: vector.y / vectorLength(vector)};
}
// Normal vectors
function linearNormal(vector) {
    return unitVector({x: vector.y, y: -1 * vector.x});
}
function circularNormal(circle, point) {
    return unitVector({x: circle.center.x - point.x, y: circle.center.y - point.y});
}
function ellipticalNormal(ellipse, point) {
    return unitVector({
        x: (point.x - ellipse.center.x) / ellipse.a,
        y: (point.y - ellipse.center.y)  / ellipse.b
    });
}
function parabolicNormal() {

}
function hyperbolicNormal() {

}
///////////////////////////////////////////////////////////

function colorToHex(color) {
    return "rgba("+color.r +","+color.g+","+color.b+","+color.a+")";
}
