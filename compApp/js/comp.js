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
    li = li.appendChild(document.createElement("button"));
    li.onclick = attemptClick(climbs, num);
    li.id = num;
    var points = document.createElement("div");
    var color = document.createElement("div");
    var attempts = document.createElement("div");
    attempts.id = "attempts";

    points.appendChild(document.createTextNode(climb.points));
    color.appendChild(document.createTextNode(climb.color));
    var attemptTallies = "";
    for (var i = 0; i < climb.attempts; i++) {
        if (i % 5 == 0) {
            attemptTallies += " ";
        }
        attemptTallies += "|";
    }
    if (!attemptTallies) {
        attemptTallies = "0";
    }
    attempts.appendChild(document.createTextNode(attemptTallies));

    li.appendChild(points);
    li.appendChild(color);
    li.appendChild(attempts);

    if (climb.sent) {
        console.log("was sent");
        li.style.backgroundColor = "green";
    }

    return li;
}

function clearClimbs(climbs) {
    for (var i = 0; i < climbs.length; i++) {
        document.getElementById("" + i).remove();
    }
}

function attemptClick(climbs, num) {
    return function() {
        climbs[num].attempts += 1;
        clearClimbs(climbs);
        loadClimbs(climbs);
    }
}

function sendClick(climbs, num) {
    return function() {
        climbs[num].sent = true;
        climbs[num].attempts += 1;
        clearClimbs(climbs);
        loadClimbs(climbs);
    }
}

loadClimbs(seedClimbs(10));
