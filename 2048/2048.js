var width = 600;
var height = 600;

var lineWidth = 6;

var left_arrow = 37;
var up_arrow = 38;
var right_arrow = 39;
var down_arrow = 40;

var GRID = [];
var over = false;

document.onkeydown = function (e)
{	
	var dircode = e.keyCode;
	if (dircode == up_arrow) {
		up (GRID);
	}
	if (dircode == down_arrow) {
		down (GRID);
	}
	if (dircode == left_arrow) {
		left (GRID);
	}
	if (dircode == right_arrow) {
		right (GRID);
	}
}

function start (mode)
{
	if (mode == "player") {
		GRID = initialize_grid ();
		update (true, GRID);
	} else if (mode == "ai") {
		GRID = initialize_grid ();
		update (true, GRID);
		while (!over) {
			random_move (GRID);
		}
		over = false;
	}
}

function initialize_grid ()
{
	var grid = [];
	for (var r = 0; r < 4; r++) {
		var grid_row = [];
		for (var c = 0; c < 4; c++) {
			grid_row.push (0);
		}
		grid.push(grid_row);
	}

	random_square(grid);
	return grid;
}

function update (random, grid)
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
		random_square (grid);
	} else if (full(grid)) {
		console.log ("lose");
		over = true;
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
	if (won (grid)) {
		console.log ("win");
		over = true;
		return;
	}
	return grid;
}

function left (grid)
{
	var old_grid = copy_grid (grid);
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
	var random = !compare (old_grid, grid);
	GRID = grid;
	update (random, grid);
	return random;
}

function right (grid)
{
	var old_grid = copy_grid (grid);
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
	var random = !compare (old_grid, grid);
	GRID = grid;
	update (random, grid);
	return random;
}

function up (grid)
{
	var old_grid = copy_grid (grid);
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
	var random = !compare (old_grid, grid);
	GRID = grid;
	update (random, grid);
	return random;
}

function down (grid)
{
	var old_grid = copy_grid (grid);
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
	var random = !compare (old_grid, grid);
	GRID = grid;
	update (random, grid);
	return random;
}

function random_square (grid)
{
	if (full (grid) && !won(grid)) {
		return;
	} else if (won (grid)) {
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

function won (grid)
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

function full (grid) 
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

function copy_grid (grid)
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

function compare (g, grid)
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

function random_move (grid)
{
	var r = Math.floor((Math.random()*4));
	if (r == 0) {
		left (grid);
	} else if (r == 1) {
		right (grid);
	} else if (r == 2) {
		up (grid);
	} else if (r == 3) {
		down (grid);
	}
}