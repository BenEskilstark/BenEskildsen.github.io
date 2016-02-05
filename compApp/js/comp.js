var COLORS = ["red", "yellow", "green", "blue", "purple"];

function seedClimbs(numClimbs) {
    var climbs = [];
    for (var i = 0; i < numClimbs; i++) {
        climbs.push({
            points: (i+4) * 250,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            sent: false,
            attempts: 0
        });
    }
    return climbs;
}

function loadClimbs(climbs) {
    for (var i = 0, climb; climb = climbs[i]; i++) {
        var table = document.getElementById("table");
        table.appendChild(makeClimb(climbs, i));
    }
}

function makeClimb(climbs, num) {
    var climb = climbs[num];
    var li = document.createElement("li");
    li.id = num;
    var points = document.createElement("div");
    var color = document.createElement("div");
    var attempts = document.createElement("div");
    attempts.id = "attempts";
    var button = document.createElement("button");

    points.appendChild(document.createTextNode(climb.points));
    color.appendChild(document.createTextNode(climb.color));
    attempts.appendChild(document.createTextNode(climb.attempts));
    button.appendChild(document.createTextNode("Add Attempt"));

    button.onclick = buttonClick(climbs, num);

    li.appendChild(points);
    li.appendChild(color);
    li.appendChild(attempts);
    li.appendChild(button);

    return li;
}

function clearClimbs(climbs) {
    for (var i = 0; i < climbs.length; i++) {
        document.getElementById("" + i).remove();
    }
}

function buttonClick(climbs, num) {
    return function() {
        climbs[num].attempts += 1;
        clearClimbs(climbs);
        loadClimbs(climbs);
    }
}

loadClimbs(seedClimbs(10));
