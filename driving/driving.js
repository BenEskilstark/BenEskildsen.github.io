var width = 800;
var height = 590;

var single = false;
var multi = false;

var speed = 40;
var background_color = "#3987C9" // ocean blue

var player_one_initial = {x: 3 * width / 4, y: height / 2, dir: Math.PI / 2};
var player_two_initial = {x: width / 4, y: height / 2, dir: 3 * Math.PI / 2};

var player_one = {
	x: 0, 
	y: 0, 
	xsp: 0, // speed in the x direction
	ysp: 0, // speed in the y direction
	accing: false, // are you accelerating?
	acc: 0, // acceleration
	color: "#FF0000", // red
	dir: Math.PI / 2, // radians
	turn: 0 // turning speed in radians
};
var player_two = {
	x: 0, 
	y: 0, 
	xsp: 0,
	ysp: 0,
	acc: 0,
	color: "#00FF00", 
	dir: 3 * Math.PI / 2,
	turn: 0
};

var left_arrow = 37;
var up_arrow = 38;
var right_arrow = 39;
var down_arrow = 40;
var w = 87;
var a = 65;
var s = 83;
var d = 68;

function setup()
{  	
	fill_background();

  	// add players:
    player_one.x = player_one_initial.x;
    player_one.y = player_one_initial.y;
    player_one.dir = player_one_initial.dir;
    player_two.x = player_two_initial.x;
    player_two.y = player_two_initial.y;
    player_two.dir = player_two_initial.dir;
}

function run_game (game_type)
{
	if (game_type == "single") {
		single = true;
	} else if (game_type == "multi") {
		multi = true;
	}

	if (running) { 
		clearInterval(instancef);
	}
	instancef = setInterval (
		function() 
		{ 
			update_game_state()
		}, speed);

	running = true;
}

function update_game_state()
{
	if (game_over()) {
		setup();
	}

	draw_game_state();

	var epsilon = 0.01;

	player_one.dir += player_one.turn;
	if (!player_one.accing && 
		(Math.abs(player_one.xsp) < epsilon && 
		Math.abs(player_one.ysp) < epsilon)) {
			player_one.acc = 0;
	}
	player_one.xsp += player_one.acc * Math.cos(player_one.dir);
	player_one.ysp -= player_one.acc * Math.sin(player_one.dir);

	console.log(player_one.xsp + " " + player_one.ysp);

	player_one.x += player_one.xsp;
	player_one.y += player_one.ysp;

	player_two.dir += player_two.turn;
}

function draw_game_state() 
{
	fill_background();

	draw_player(player_one);
	draw_player(player_two);
}

function fill_background() 
{
	var g2 = document.getElementById("game_canvas").getContext("2d");
	g2.fillStyle = background_color;
  	g2.fillRect(0, 0, width, height);
}
function draw_player(player) {
	var radius = 15;

	var g2 = document.getElementById("game_canvas").getContext("2d");
	// body
	g2.fillStyle = player.color;
	g2.strokeStyle = background_color;
	g2.beginPath();
	g2.arc(player.x, player.y, radius, 0, 2 * Math.PI);
	g2.stroke();
	g2.fill();
	// mouth
	g2.fillStyle = background_color;
	g2.beginPath();
	g2.arc(
		player.x + radius * Math.cos(player.dir), 
		player.y - radius * Math.sin(player.dir), 
		radius, 0, 2 * Math.PI);
	g2.stroke();
	g2.fill();
}

document.onkeydown = function (e)
{	
	var dircode = e.keyCode;
	if (dircode == up_arrow) {
		player_one.accing = true;
		player_one.acc = 0.5;
	}
	if (dircode == left_arrow) {
		player_one.turn = 2 * Math.PI / 40;
	}
	if (dircode == right_arrow) {
		player_one.turn = -2 * Math.PI / 40;
	}

	if (multi) {
		if (dircode == w) {

		}
		if (dircode == a) {
			player_two.turn = 2 * Math.PI / 40;
		}
		if (dircode == d) {
			player_two.turn = -2 * Math.PI / 40;
		}
	}
}
document.onkeyup = function (e)
{	
	var dircode = e.keyCode;
	if (dircode == up_arrow) {
		player_one.acc = -0.1;
		player_one.accing = false;
	}
	if (dircode == left_arrow) {
		player_one.turn = 0;
	}
	if (dircode == right_arrow) {
		player_one.turn = 0;
	}

	if (multi) {
		if (dircode == w) {

		}
		if (dircode == a) {
			player_two.turn = 0;
		}
		if (dircode == d) {
			player_two.turn = 0;
		}
	}
}

function game_over() {
	return false;
}










