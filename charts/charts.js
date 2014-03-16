var width = 1000;
var height = 750;
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

	this.isNode = true; // it's almost like polymorphism. But worse
}

function Edge (sx,sy,ex,ey,size,pointed)
{
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.size = size;
	this.pointed = pointed;

	this.isNode = false;
}

function begin ()
{
	update();

	setBackgroundImage (background);

	var el = document.getElementById ("chart_canvas");
	el.addEventListener("click", handleClick, false);
}

function setBackgroundForm ()
{
	var maps = document.getElementById("maps");
	setBackgroundImage (maps.options[maps.selectedIndex].text);
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

	g2.clearRect (0,0,width,height);

	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i];
		if (obj.isNode) {
			g2.fillStyle = color;
			g2.strokeStyle = color;

			g2.beginPath();
			g2.arc(obj.x, obj.y, obj.size, 0, 2*Math.PI);
			if (obj.filled) { g2.fill(); }
			g2.stroke();

			g2.fillStyle = "#0000FF"; // blue
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
			if (obj.pointed) {
				g2.save ();
				var xd = obj.ex - obj.sx;
				var yd = obj.ey - obj.sy;
				var length = Math.sqrt (xd*xd + yd*yd);
				point_length = obj.size*7;

				var angle = Math.atan2 (yd,xd);
				g2.translate (obj.ex, obj.ey);
				g2.rotate (angle);
				var x1 = -1*Math.cos(Math.PI/4) * point_length;
				var y1 = -1*Math.sin(Math.PI/4) * point_length;
				var x2 = y1;
				var y2 = -x1;

				g2.beginPath ();
				g2.moveTo (0, 0);
				g2.lineTo (x1, y1);
				g2.lineTo (x2, y2);
				g2.lineTo (0, 0);
				g2.closePath ();
				g2.fill ();

				g2.restore ();
			}
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

function handleClick (e)
{
	var name = document.getElementById("name").value;
	var size = document.getElementById("nodesize").value;
	// this code is from 
	// http://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
    var mouseX, mouseY;
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }

    placeNode (mouseX, mouseY, name, size);
}

function placeNode (x, y, name, size)
{
	var n = new Node (x,y,name,size);

	var isFilled = document.getElementById("filled").value;
	if (isFilled == "no") {
		n.filled = false;
	}

	objects.push (n);

	var dropdownfrom = document.getElementById("from");
	var dropdownto = document.getElementById("to");
	var op = document.createElement("option");
	//op.value = name;
	op.text = name;
	dropdownfrom.options.add (op);
	
	var opp = document.createElement("option");
	//opp.value = name;
	opp.text = name;
	dropdownto.options.add (opp);

	update ();
}
function placeEdgeNode (node1,node2,size,pointed)
{
	objects.push (new Edge (node1.x, node1.y, node2.x, node2.y, size, pointed));
	update ();
}
function placeEdgePoint (sx,sy,ex,ey,size,pointed)
{
	objects.push (new Edge (sx,sy,ex,ey,size,pointed));
	update ();
}
function placeEdgeForm ()
{
	var dropdownfrom = document.getElementById("from");
	var dropdownto = document.getElementById("to");

	var node1Name = dropdownfrom.options[dropdownfrom.selectedIndex].text;
	var node2Name = dropdownto.options[dropdownto.selectedIndex].text;

	var node1, node2;
	var nodes = getNodes ();
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].name == node1Name) {
			node1 = nodes[i];
		}
		if (nodes[i].name == node2Name) {
			node2 = nodes[i];
		}
	}
	var size = document.getElementById("edgesize").value;
	placeEdgeNode (node1, node2, size, true);
}


function undolast ()
{
	var popped = objects.pop ();

	if (popped.isNode) {
		// should remove it from the dropdown forms...
	}

	update ();
}
