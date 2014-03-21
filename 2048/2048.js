var width = 600;
var height = 600;

var lineWidth = 6;

var grid = [];

var left_arrow = 37;
var up_arrow = 38;
var right_arrow = 39;
var down_arrow = 40;

document.onkeydown = function (e)
{	
	var dircode = e.keyCode;
	if (dircode == up_arrow) {
		up();
	}
	if (dircode == down_arrow) {
		down ();
	}
	if (dircode == left_arrow) {
		left ();
	}
	if (dircode == right_arrow) {
		right ();
	}
}

function start (mode)
{
	initialize_grid ();

	update (true);
}

function initialize_grid ()
{
	grid = [];
	for (var r = 0; r < 4; r++) {
		var grid_row = [];
		for (var c = 0; c < 4; c++) {
			grid_row.push (0);
		}
		grid.push(grid_row);
	}

	random_square();
}

function update (random)
{
	var g2 = document.getElementById("canvas").getContext("2d");

	g2.fillStyle = "#FFFFFF";
	g2.fillRect (0,0,width,height);

	// draw grid outline
	for (var i = 0; i < 5; i++) {
		g2.fillStyle = "#000000";
		g2.beginPath ();
		g2.lineWidth = lineWidth;
		g2.moveTo (0, i*width/4);
		g2.lineTo (height, i*width/4);

		g2.moveTo (i*height/4, 0);
		g2.lineTo (i*height/4, width);
		g2.stroke ();

	}

	if (random) {
		random_square ();
	}

	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < 4; c++) {
			var sqr = grid [r][c];

			if (sqr != 0) {
				g2.font = "90px Georgia";
				if (sqr > 1000) {
					g2.font = "40px Georgia";
				} else if (sqr > 100) {
					g2.font = "60px Georgia";
				}
				
				g2.fillText (sqr,r*width/4+width/12, c*height/4 + height/6);
			}
		}
	}
	if (won ()) {
		console.log ("win");
		return;
	}
}

function left ()
{
	var old_grid = copy_grid ();
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < 4; c++) {
			var sqr = grid [c][r];
			grid[c][r] = 0;
			if (sqr != 0) {
				var o;
				for (o = -1; o+c>=0 && grid[o+c][r] == 0; o--){}
				if (o+c>=0 && grid[o+c][r] == sqr) {
					grid[o+c][r] += sqr;
				} else {
					grid[o+c+1][r] = sqr;
				}
			}
		}
	}
	var random = !compare (old_grid);
	update (random);
	return random;
}

function right ()
{
	var old_grid = copy_grid ();
	for (var r = 0; r < 4; r++) {
		for (var c = 3; c >= 0; c--) {
			var sqr = grid [c][r];
			grid[c][r] = 0;
			if (sqr != 0) {
				var o;
				for (o = 1; o+c<4 && grid[o+c][r] == 0; o++){}
				if (o+c<4 && grid[o+c][r] == sqr) {
					grid[o+c][r] += sqr;
				} else {
					grid[o+c-1][r] = sqr;
				}
			}
		}
	}
	var random = !compare (old_grid);
	update (random);
	return random;
}

function up ()
{
	var old_grid = copy_grid ();
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < 4; c++) {
			var sqr = grid [c][r];
			grid[c][r] = 0;
			if (sqr != 0) {
				var o;
				for (o = -1; o+r>=0 && grid[c][r+o] == 0; o--){}
				if (o+r>=0 && grid[c][r+o] == sqr) {
					grid[c][r+o] += sqr;
				} else {
					grid[c][r+o+1] = sqr;
				}
			}
		}
	}
	var random = !compare (old_grid);
	update (random);
	return random;
}

function down ()
{
	var old_grid = copy_grid ();
	for (var r = 3; r >= 0; r--) {
		for (var c = 0; c < 4; c++) {
			var sqr = grid [c][r];
			grid[c][r] = 0;
			if (sqr != 0) {
				var o;
				for (o = 1; o+r<4 && grid[c][r+o] == 0; o++){}
				if (o+r<4 && grid[c][r+o] == sqr) {
					grid[c][r+o] += sqr;
				} else {
					grid[c][r+o-1] = sqr;
				}
			}
		}
	}
	var random = !compare (old_grid);
	update (random);
	return random;
}

function random_square ()
{
	if (full () && !won()) {
		console.log ("lose");
		return;
	} else if (won ()) {
		return;
	}
	var changed = false;
	while (!changed){
		var row = Math.floor((Math.random()*4));
		var col = Math.floor((Math.random()*4));
		if (grid[row][col] == 0) {
			changed = true;
			grid[row][col] = 2;
		}
	}
}

function won ()
{
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < 4; c++) {
			if (grid[r][c] == 2048) {
				return true;
			}
		}
	}
	return false;
}

function full () 
{
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < 4; c++) {
			if (grid[r][c] == 0) {
				return false;
			}
		}
	}
	return true;
}

function copy_grid ()
{
	var new_grid = [];
	for (var r = 0; r < 4; r++) {
		var grid_row = [];
		for (var c = 0; c < 4; c++) {
			grid_row.push (grid[r][c]);
		}
		new_grid.push(grid_row);
	}
	return new_grid;
}

function compare (g)
{
	for (var r = 0; r < 4; r++) {
		for (var c = 0; c < 4; c++) {
			if (grid[r][c] != g[r][c]) {
				return false;
			}
		}
	}
	return true;
}