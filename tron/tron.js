var mirror = false;
var multi = false;

var rows = 100;
var cols = 120;
var cell_size = 5;

var speed = 40;

var player_one_initial = {x: 2*cols/3, y: rows/2};
var player_two_initial = {x: cols/3, y: rows/2};

var up = {x: 0, y: -1}
var down = {x: 0, y: 1}
var right = {x: 1, y: 0}
var left = {x:-1, y: 0}

var player_one = {x: 0, y: 0};
var player_two = {x: 0, y: 0};
var player_one_dir = {x: -1, y: 0}
var player_two_dir = {x: 1, y: 0}

var GRID = [];

var EMPTY = 0;
var ONE = 1;
var TWO = 2;

var left_arrow = 37;
var up_arrow = 38;
var right_arrow = 39;
var down_arrow = 40;
var w = 87;
var a = 65;
var s = 83;
var d = 68;

document.onkeydown = function (e)
{	
	var dircode = e.keyCode;
	if (dircode == up_arrow && 
		(player_one_dir.x != up.x && player_one_dir.y != up.y)) {
		player_one_dir.x = up.x;
		player_one_dir.y = up.y;

		if (mirror) {
			player_two_dir.x = down.x;
			player_two_dir.y = down.y;
		}
	}
	if (dircode == down_arrow && 
		(player_one_dir.x != down.x && player_one_dir.y != down.y)) {
		player_one_dir.x = down.x;
		player_one_dir.y = down.y;

		if (mirror) {
			player_two_dir.x = up.x;
			player_two_dir.y = up.y;
		}
	}
	if (dircode == left_arrow && 
		(player_one_dir.x != left.x && player_one_dir.y != left.y)) {
		player_one_dir.x = left.x;
		player_one_dir.y = left.y;

		if (mirror) {
			player_two_dir.x = right.x;
			player_two_dir.y = right.y;
		}
	}
	if (dircode == right_arrow && 
		(player_one_dir.x != right.x && player_one_dir.y != right.y)) {
		player_one_dir.x = right.x;
		player_one_dir.y = right.y;

		if (mirror) {
			player_two_dir.x = left.x;
			player_two_dir.y = left.y;
		}
	}
	if (multi) {
		console.log (dircode);
		if (dircode == w && 
			(player_two_dir.x != up.x && player_two_dir.y != up.y)) {
			player_two_dir.x = up.x;
			player_two_dir.y = up.y;
		}
		if (dircode == s && 
			(player_two_dir.x != down.x && player_two_dir.y != down.y)) {
			player_two_dir.x = down.x;
			player_two_dir.y = down.y;
		}
		if (dircode == a && 
			(player_two_dir.x != left.x && player_two_dir.y != left.y)) {
			player_two_dir.x = left.x;
			player_two_dir.y = left.y;
		}
		if (dircode == d && 
			(player_two_dir.x != right.x && player_two_dir.y != right.y)) {
			player_two_dir.x = right.x;
			player_two_dir.y = right.y;
		}
	}
}

// create new grid with all the divs and stuff
function create_grid ()
{
    var grid = [];
    for (var r = 0; r < rows; r++) {
        var row = [];
        for (var c = 0; c < cols; c++) {
            row.push (EMPTY);
        }
        grid.push(row);
    }
    return grid;
}

function draw_grid ()
{
	var g2 = document.getElementById("tron_canvas").getContext("2d");

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            // note that strictly > can be used to reduce noise
            if (GRID[r][c] == ONE) {
                g2.fillStyle="#FF0000"; // red
                g2.fillRect (cell_size*c, cell_size*r, cell_size, cell_size);
            }
            if (GRID[r][c] == TWO) {
           		g2.fillStyle="#0000FF"; // blue
           		g2.fillRect (cell_size*c, cell_size*r, cell_size, cell_size);
            }  
        }
    }
    // g2.fillStyle="#000000"; // black
}

function run_tron (game_type)
{
	if (game_type == "mirror") {
		mirror = true;
	} else if (game_type == "multi") {
		multi = true;
	}
	if (running) {clearInterval(instancef);}
	instancef = setInterval (function () 
	{ 
		update_tron ()
	}, speed);
	running = true;
}

function update_tron ()
{
	if (game_over ()) {
		setup ();
	}
		
	GRID[player_one.y][player_one.x] = ONE;
	GRID[player_two.y][player_two.x] = TWO;

	draw_grid ();

	//console.log (player_one_dir);

	player_one.x += player_one_dir.x;
	player_one.y += player_one_dir.y;
	player_two.x += player_two_dir.x;
	player_two.y += player_two_dir.y;
}

function setup ()
{  	
	// redraw grid
	var g2 = document.getElementById("tron_canvas").getContext("2d");
	g2.fillStyle="#000000"; // black
  	g2.fillRect (0, 0, cell_size*cols, cell_size*rows);
  	// reset grid
  	GRID = create_grid ();
  	// add players:
    player_one.x = player_one_initial.x;
    player_one.y = player_one_initial.y;
    player_two.x = player_two_initial.x;
    player_two.y = player_two_initial.y;
    player_one_dir.x = left.x;
    player_one_dir.y = left.y;
    player_two_dir.x = right.x;
    player_two_dir.y = right.y;
}

function game_over ()
{
    var over = player_one.x < 0 || player_one.x >= cols || 
    	player_one.y < 0 || player_one.y >= rows || player_two.x < 0 ||
    	player_two.x >= cols || player_two.y < 0 || player_two.y >= rows;

    over = over || (player_one.x == player_two.x && 
    	player_one.y == player_two.y);

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            // note that strictly > can be used to reduce noise
            if (GRID[r][c] != EMPTY && 
            	((player_one.x == c && player_one.y == r) || 
            		player_two.x == c && player_two.y == r)) {
                		over = true;
            } 
        }
    }
    return over;
}
