var width = 1000;
var height = 800;
var color = "#FF0000"; // red

var backgroundImages = ["USA.jpeg", "Europe.gif", "MiddleEast.jpeg", 
	"SouthAmerica.jpeg", "World.jpg"];
var background = backgroundImages[0];

var objects = [];

function Node (x,y,name,size) 
{
	this.x = x;
	this.y = y;
	this.name = name;
	this.size = size;
	this.filled = true;

	this.isNode = true;
}

function Edge (sx,sy,ex,ey,size)
{
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.size = size;

	this.isNode = false;
}

function begin ()
{
	update();

	setBackgroundImage (background);

	placeNode (50,50,"1",5);
	placeNode (250,300,"number 2", 10);
	placeNode (700, 500, "THREE", 75);

	placeEdgePoint (50,50,250,300,5);
}

function setBackgroundImage (imgName)
{
	var c = document.getElementById("chart_canvas");
	c.style.backgroundImage = "url(" + imgName + ")";
	c.style.backgroundSize = "contain";
	c.style.backgroundRepeat = "no-repeat";
}

function update ()
{
	var g2 = document.getElementById("chart_canvas").getContext("2d");

	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];
		if (obj.isNode) {
			g2.fillStyle = color;
			g2.strokeStyle = color;

			g2.beginPath();
			g2.arc(obj.x, obj.y, obj.size, 0, 2*Math.PI);
			if (obj.filled) { g2.fill(); }
			g2.stroke();

			g2.fillStyle = "#000000"; // black
			g2.font="20px Georgia";
			g2.fillText (obj.name, obj.x - obj.size, obj.y - obj.size);

		} else {
			g2.fillStyle = color;
			g2.strokeStyle = color;
			
			g2.beginPath ();
			g2.lineWidth=obj.size;
			g2.moveTo (obj.sx, obj.sy);
			g2.lineTo (obj.ex, obj.ey);
			g2.stroke();
		}
	}
}

function getNodes ()
{
	var nodes = [];
	for (var i = 0; i < objects.length; i++){
		if (objects[i].isNode) {
			nodes.push (objects[i]);
		}
	}
	return nodes;
}

function placeNode (x, y, name, size)
{
	objects.push (new Node (x,y,name,size));
	update ();
}
function placeEdgeNode (node1,node2,size)
{
	objects.push (new Edge (node1.x, node1.y, node2.x, node2.y, size));
	update ();
}
function placeEdgePoint (sx,sy,ex,ey,size)
{
	objects.push (new Edge (sx,sy,ex,ey,size));
	update ();
}

function undo ()
{
	objects.pop ();
	update ();
}
