var canvas_width = 800;
var canvas_height = 600;

var single = false;
var multi = false;
var ais = false;

var speed = 40; // update time in ms

var left_paddle = {width: 20, height: 80, x: 5, 
	y: canvas_height/2-40, speed: 0, acceleration: 0};

var right_paddle = {width: 20, height: 80, x: canvas_width-5-20, // <- fuck this
	y: canvas_height/2-40, speed: 0, acceleration: 0};

var puck = {radius: 5, x: canvas_height/2, y: canvas_width/2, x_speed: 0, y_speed:  0};

var max_speed = 8;

var up = -1;
var down = 1;

var up_arrow = 38;
var down_arrow = 40;
var w = 87;
var s = 83;

function run (game_type)
{
	if (game_type == "single") {
		single = true;
	} else if (game_type == "multi") {
		multi = true;
	} else if (game_type == "ais") {
		ais = true;
	}
	if (running) {clearInterval(instancef);}
	instancef = setInterval (function () 
	{ 
		update ()
	}, speed);
	running = true;
}

function update ()
{
	var g2 = document.getElementById("plot_canvas").getContext("2d");
	// update speeds
	if ((left_paddle.speed < max_speed || left_paddle.acceleration != 1) &&
		(left_paddle.speed > -1 * max_speed || left_paddle.acceleration != -1)){
		left_paddle.speed += left_paddle.acceleration;
	}
	if ((right_paddle.speed < max_speed || right_paddle.acceleration != 1) && 
		(right_paddle.speed > -1 * max_speed || right_paddle.acceleration != -1)){
		right_paddle.speed += right_paddle.acceleration;
	}

	// slow paddles on non_acceleration
	if (left_paddle.speed > 0 && left_paddle.acceleration == 0) {
		left_paddle.speed -= 1;
	}
	if (left_paddle.speed < 0 && left_paddle.acceleration == 0) {
		left_paddle.speed += 1;
	}
	if (right_paddle.speed > 0 && right_paddle.acceleration == 0) {
		right_paddle.speed -= 1;
	}
	if (right_paddle.speed < 0 && right_paddle.acceleration == 0) {
		right_paddle.speed += 1;
	}

	// update positions
	left_paddle.y += left_paddle.speed;
	right_paddle.y += right_paddle.speed;

	// stop paddles on edges
	if (left_paddle.y <= 0 || left_paddle.y + left_paddle.height >= canvas_height) {
		left_paddle.acceleration = 0;
		left_paddle.speed = 0;
	}
	if (right_paddle.y <= 0 || right_paddle.y + right_paddle.height >= canvas_height) {
		right_paddle.acceleration = 0;
		right_paddle.speed = 0;
	}

	g2.fillStyle = "#000000"; // black
	g2.fillRect (0,0,canvas_width, canvas_height);
	// draw
	g2.fillStyle = "#FFFFFF"; // white
	g2.fillRect (left_paddle.x,left_paddle.y,left_paddle.width,left_paddle.height);
	g2.fillRect (right_paddle.x,right_paddle.y,right_paddle.width,right_paddle.height);
	g2.fillEllipse ();
}

document.onkeyup = function (e)
{	
	var dircode = e.keyCode;
	if (dircode == up_arrow || dircode == down_arrow) {
		right_paddle.acceleration = 0;
	}
	if (dircode == w || dircode == s) {
		left_paddle.acceleration = 0;
	}
}

document.onkeydown = function (e)
{	
	var dircode = e.keyCode;
	if (!ais){
		if (dircode == up_arrow && 
			right_paddle.y > 0) {
				right_paddle.acceleration = -1;
		}
		if (dircode == down_arrow && 
			right_paddle.y + right_paddle.height < canvas_height) {
				right_paddle.acceleration = 1;
		}
	}

	if (multi) {
		if (dircode == w && 
			left_paddle.y > 0) {
				left_paddle.acceleration = -1;
		}
		if (dircode == s && 
			left_paddle.y + left_paddle.height < canvas_height) {
				left_paddle.acceleration = 1;
		}
	}
}

function setup ()
{  	
	update ();
}