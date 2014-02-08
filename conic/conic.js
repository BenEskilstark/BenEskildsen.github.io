var canvas_width = 500;
var canvas_height = 500;

var speed = 40; // update time in ms

var step = .5; // step of the graph
var gap = 20; // what to use for tranformations

function plot ()
{
	var equation = document.getElementById('console').value

	if (equation != "Enter equations here") {

		var history = document.getElementById('history');
		history.value += "y = " + equation + "\n";

		var g2 = document.getElementById("plot_canvas").getContext("2d");
		g2.fillStyle = "#0000FF"; // blue
		g2.lineWidth = 1;

		g2.beginPath ();
		for (var i = 0; i <= canvas_width; i++) {
			var fst = false; if (i == 0){ fst = true; }

			x = (i - canvas_width/2)/gap;
			var y = eval (equation);

			y = canvas_height - ((y * gap) + canvas_height/2);
			if (fst) {
				g2.moveTo (i,y);
			} else {
				g2.lineTo (i,y);
			}
		}
		g2.stroke ();
	}
}

function unplot ()
{
	var history = document.getElementById('history');
	history.value = "";
	setup();
}

function setup ()
{  	
	var g2 = document.getElementById("plot_canvas").getContext("2d");

	g2.fillStyle = "#FFFFFF"; // white
	g2.fillRect (0,0,canvas_width, canvas_height);

	g2.fillStyle = "#000000"; // black
	g2.lineWidth = 2;
  	// draw coordinate plane
  	// x-axis
  	g2.beginPath ();
  	g2.moveTo (0,canvas_height/2); 
  	g2.lineTo (canvas_width, canvas_height/2);
  	g2.stroke();
  	// y-axis
  	g2.beginPath ();
  	g2.moveTo (canvas_width/2, 0);
  	g2.lineTo (canvas_width/2, canvas_height);
  	g2.stroke();
  	// draw hashmarks:
  	g2.lineWidth = 1;
  	var offset = 5; // offset for hashmarks above and below axis
  	var dist = canvas_width/gap; // distance in pix between each hashmark 
  	for (var i = 0; i < canvas_width; i++) {
  		g2.beginPath ();
  		g2.moveTo (i * dist, canvas_height/2 + offset);
  		g2.lineTo (i * dist, canvas_height/2 - offset);
  		g2.stroke ();

  		g2.beginPath ();
  		g2.moveTo (canvas_width/2 - offset, i * dist);
  		g2.lineTo (canvas_width/2 + offset, i * dist);
  		g2.stroke ();
  	}
}