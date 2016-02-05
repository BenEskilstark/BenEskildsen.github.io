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

function loadClimbs() {
    var climbs = seedClimbs(10);
    for (var i = 0, climb; climb = climbs[i]; i++) {
        var table = document.getElementById("table");
        var li = document.createElement("li");
        var points = document.createElement("div");
        var color = document.createElement("div");
        var attempts = document.createElement("div");

        points.appendChild(document.createTextNode(climb.points));
        color.appendChild(document.createTextNode(climb.color));
        attempts.appendChild(document.createTextNode(climb.attempts));
        li.appendChild(points);
        li.appendChild(color);
        li.appendChild(attempts);
        table.appendChild(li);
    }
}

loadClimbs();
