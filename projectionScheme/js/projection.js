var WIDTH = 50;
var HEIGHT = 35;

function setUpWall() {
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            document.getElementById("wall").appendChild(makeHold(x, y));
        }
    }
}

function makeHold(posX, posY) {
    var hold = document.createElement("div");
    hold.className = "hold";
    hold.style.top = posY * 30 + 5;
    hold.style.left = posX * 30 + 5;
    return hold;
}

setUpWall();
