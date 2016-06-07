document.onkeydown = checkKeyDown;
document.onmousedown = checkMouseDown;
document.onmousemove = moveMouse;
document.onmouseup = mouseUp;
var mouseDown = false;
var currentX = 0;
var currentY = 0;

function checkMouseDown(e) {
    var x = e.clientX - 710;
    var y = e.clientY - 250;
    if (x*x + y*y < 240 * 240) {
        mouseDown = true;
        currentX = x;
        currentY = y;
    }
}

function moveMouse(e) {
    if (!mouseDown) {
        return;
    }

    var x = e.clientX - 710;
    var y = e.clientY - 250;
    var dx = x - currentX;
    var dy = y - currentY;

    scene.camera.toPoint.x -= dx/10;
    scene.camera.toPoint.y += dy/10;
}

function mouseUp(e) {
    mouseDown = false;
}

function checkKeyDown(e) {
    e = e || window.event;

    // w
    if (e.keyCode == 87) {
        scene.camera.velocity.z -= 4;
    }
    // a
    if (e.keyCode == 65) {
        scene.camera.velocity.x -= 4;
    }
    // s
    if (e.keyCode == 83) {
        scene.camera.velocity.z += 4;
    }
    // d
    if (e.keyCode == 68) {
        scene.camera.velocity.x += 4;
    }
    // q
    if (e.keyCode == 81) {
        scene.camera.velocity.y -= 4;
    }
    // e
    if (e.keyCode == 69) {
        scene.camera.velocity.y += 4;
    }
    // space
    if (e.keyCode == 32) {
        scene.camera.velocity.x = 0;
        scene.camera.velocity.y = 0;
        scene.camera.velocity.z = 0;

        scene.objects[1].velocity.z = -50;
    }
}
