function renderGrammar(production, width, height, length, angle) {
    var canvas = document.getElementById("generatorCanvas");
    if (!canvas) {
        return;
    }
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, width, height);

    var turtle = makeTurtle(width, height);
    var turtleStack = [];
    for (var i = 0, letter; letter = production[i]; i++) {
        if (letter == "+") {
            turtle.angle -= angle;
        } else if (letter == "-") {
            turtle.angle += angle;
        } else if (letter == "[") {
            turtleStack.push(copyTurtle(turtle));
        } else if (letter == "]") {
            turtle = turtleStack.pop();
        } else {
            context.beginPath();
            context.moveTo(turtle.x, turtle.y);

            turtle.x += length * Math.cos(turtle.angle * Math.PI / 180);
            turtle.y += length * Math.sin(turtle.angle * Math.PI / 180);

            context.lineTo(turtle.x, turtle.y);
            context.stroke();
            context.closePath();
        }
    }

}

function copyTurtle(turtle) {
    return {
        x: turtle.x,
        y: turtle.y,
        angle: turtle.angle
    };
}

function makeTurtle(width, height) {
    var turtle = {
        x: width / 4,
        y: height / 2,
        angle: 0
    }

    return turtle;
}
