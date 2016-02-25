var flower = {
    SLIDER_numPetals: {
        value: 8,
        min: 2,
        max: 12
    },
    SLIDER_rednessOfPetals: {
        value: 200,
        min: 0,
        max: 255
    },
    SLIDER_greennessOfPetals: {
        value: 50,
        min: 0,
        max: 255
    },
    SLIDER_bluenessOfPetals: {
        value: 100,
        min: 0,
        max: 255
    },
    SLIDER_petalSize: {
        value: 50,
        min: 0,
        max: 100,
    },
    SLIDER_sizeOfCenter: {
        value: 15,
        min: 0,
        max: 100
    },
    render: function(canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var context = canvas.getContext("2d");
        for (var i = 0; i < this.numPetals; i++) {
            var xPos = Math.cos(2 * Math.PI * i / this.numPetals) * this.petalSize + width / 2;
            var yPos = Math.sin(2 * Math.PI * i / this.numPetals) * this.petalSize + height / 2;

            context.beginPath();
            context.arc(xPos, yPos, this.petalSize, 0, 2 * Math.PI);
            context.strokeStyle = "black";
            context.fillStyle = "rgb(" + this.rednessOfPetals + "," +
                this.greennessOfPetals + "," + this.bluenessOfPetals + ")";
            context.stroke();
            context.fill();
        }

        context.beginPath();
        context.arc(width/2, height/2, this.sizeOfCenter, 0, 2 * Math.PI);
        context.strokeStyle = "black";
        context.fillStyle = "yellow";
        context.stroke();
        context.fill();
    }
}
