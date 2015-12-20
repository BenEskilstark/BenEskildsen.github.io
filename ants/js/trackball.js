function Trackball(width, height) {
	this.width  = width;
	this.height = height;
	this.currX  = 788;
	this.currY  = 338;
	this.moving = false;
	// this.matrix = [
    //     0.435, -0.824, 0.362, 0,
    //     0.139, 0.458, 0.878, 0,
    //     -0.889, -0.332, 0.314, 0,
    //     0, 0, 0, 1
    // ];
    this.matrix = [
        0.932, -0.110, 0.344, 0.000,
        0.034,  0.974, 0.224, 0.000,
        -0.359, -0.197, 0.912, 0.00,
        -0.409, -7.943, 0.858, 1.00,
    ];
	this.toMul  = SglMat4.identity();
    this.zoom = 4;
}

Trackball.prototype = {
	onMouseDown : function (event) {
        if (event.clientX < 290 || event.clientX > 1000) {
            return;
        }
		this.currX = event.clientX;
		this.currY =  this.height - event.clientY;
		this.moving = true;
	},

	onMouseUp : function (event) {
		this.moving = false;
	},

	onMouseMove : function (event) {
		if (!this.moving) return;

		var newX = event.clientX;
		var newY = this.height - event.clientY;
		var dx   = newX - this.currX;

		var rad   = this.width;
		var v1    = SglVec3.normalize([this.currX, this.currY, rad]);
		var v2    = SglVec3.normalize([newX, newY, rad]);
		var axis  = SglVec3.cross(v1,v2);
		var angle = SglVec3.length(axis)*5;

		if (angle > 0.00001) {
			this.matrix = SglMat4.mul(SglMat4.rotationAngleAxis(angle, axis), this.matrix);
		}

		this.currX = newX;
		this.currY = newY;
	},

    onKeyDown : function (key) {
        // left
        if (key.keyCode == "37") {
            this.matrix = SglMat4.mul(SglMat4.translation([1, 0, 0]), this.matrix);
        }
        // right
        if (key.keyCode == "39") {
            this.matrix = SglMat4.mul(SglMat4.translation([-1, 0, 0]), this.matrix);
        }
        // up
        if (key.keyCode == "38") {
            this.matrix = SglMat4.mul(SglMat4.translation([0, -1, 0]), this.matrix);
        }
        // down
        if (key.keyCode == "40") {
            this.matrix = SglMat4.mul(SglMat4.translation([0, 1, 0]), this.matrix);
        }
    },

    onKeyUp : function (event) {

    },

    onWheel : function (event) {
        if (event.wheelDelta < 0) {
            this.zoom += 1;
        }
        if (event.wheelDelta > 0 && this.zoom > 0) {
            this.zoom -= 1;
        }
    }
};
