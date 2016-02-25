var pollock = {
    SLIDER_randomness: {
        value: 6,
        min: 1,
        max: 12
    },
    SLIDER_shapeDensity: {
        value: 5,
        min: 0,
        max: 10
    },
    SLIDER_lineDensity: {
        value: 100,
        min: 0,
        max: 300
    },
    SLIDER_lineWindiness: {
        value: 50,
        min: 0,
        max: 314
    },
    SLIDER_lineJaggedness: {
        value: 10,
        min: 10,
        max: 50
    },
    SLIDER_dropDensity: {
        value: 300,
        min: 0,
        max: 500
    },

    render: function(canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var context = canvas.getContext("2d");
        var scale = width;
        if (height < width) {
            scale = height;
        }

        // Background Layer

        // Irregular Shape Layer
        var shapeColors = ["grey", "black", "brown"];
        for (var i = 0; i < this.shapeDensity; i++) {
            var centerX = Math.floor(Math.random() * width);
            var centerY = Math.floor(Math.random() * height);
            context.fillStyle = shapeColors[Math.floor(Math.random() * shapeColors.length)];
            this.drawIrregularShape(context, centerX, centerY, 6, scale/10, scale/5);
        }

        // Line Layer
        for (var i = 0; i < this.lineDensity; i++) {
            var lineColors = ["grey", "black", "green"];
            var startX = Math.floor(Math.random() * width);
            var startY = Math.floor(Math.random() * height);
            context.strokeStyle = lineColors[Math.floor(Math.random() * shapeColors.length)];
            context.lineCap = "round";
            this.drawIrregularLine(
                context,
                startX, startY,
                1000 / this.lineJaggedness,
                scale/700, scale/100,
                this.lineWindiness/100,
                this.lineJaggedness);
        }

        // Water Drop Layer
        for (var i = 0; i < this.dropDensity; i++) {
            var dropColors = ["black", "brown", "purple", "blue"];
            var centerX = Math.floor(Math.random() * width);
            var centerY = Math.floor(Math.random() * height);
            context.fillStyle = dropColors[Math.floor(Math.random() * shapeColors.length)];
            this.drawIrregularShape(context, centerX, centerY, 6, scale/100, scale/80);
        }

    },

    drawIrregularShape: function(context, centerX, centerY, numArcs, minRad, maxRad) {
        context.beginPath();
        var firstRadius = Math.floor(randomNormal(this.randomness) * (maxRad - minRad)) + minRad;
        var firstX = centerX;
        var firstY = centerY - firstRadius;
        context.moveTo(firstX, firstY);
        for (var i = 0; i < numArcs; i++) {
            var angle = Math.PI * 2 * i / numArcs;
            var previousAngle = Math.PI * 2 * (i - 1) / numArcs;
            var radius = Math.floor(randomNormal(this.randomness) * (maxRad - minRad)) + minRad;
            var x = centerX + radius * Math.cos(angle);
            var y = centerY + radius * Math.sin(angle);
            var cpX = centerX + 2 * radius * Math.cos((previousAngle - angle) * randomNormal(this.randomness) + angle);
            var cpY = centerY + 2 * radius * Math.sin((previousAngle - angle) * randomNormal(this.randomness) + angle);

            if (i == numArcs - 1) {
                x = firstX;
                y = firstY;
            }

            context.quadraticCurveTo(cpX, cpY, x, y);
        }
        context.fill();
    },

    drawIrregularLine: function(context, startX, startY, numSegments, minWeight, maxWeight, radian, maxSegLength) {
        var previousX = startX;
        var previousY = startY;
        var angle = randomNormal(this.randomness) * Math.PI * 2;
        context.moveTo(previousX, previousY);
        for (var i = 0; i < numSegments; i++) {
            var nextX = previousX + Math.cos(angle) * randomNormal(this.randomness) * maxSegLength;
            var nextY = previousY + Math.sin(angle) * randomNormal(this.randomness) * maxSegLength;

            context.save();
            context.beginPath();
            context.moveTo(previousX, previousY);
            context.lineWidth = Math.floor(Math.random() * (maxWeight - minWeight)) + minWeight;
            context.lineTo(nextX, nextY);
            context.stroke();
            context.closePath();
            context.restore();

            previousX = nextX;
            previousY = nextY;
            angle = angle + randomNormal(this.randomness) * 2 * radian - radian
        }
    },
};

function randomNormal(randomness) {
    var totalRandom = 0;
    for (var i = 0; i < randomness; i++) {
        totalRandom += Math.random();
    }

    return ((totalRandom - (randomness/2)) / (randomness/2) + 1) / 2;
}
