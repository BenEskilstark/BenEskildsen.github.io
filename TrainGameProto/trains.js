var width = 800;
var height = 590;

var backgroundImages = ["USA.jpeg", "Europe.gif", "MiddleEast.jpeg", 
	"SouthAmerica.jpeg", "World.jpg", "EastCoast.jpg"];
var background = backgroundImages[1];

var color = "#000000"; // black
var clicked_color = "#FF0000"; // red

var objects = [];

// Initializing stuff:
objects.push(new Node (190, 365, 100)); // Paris
objects.push(new Node (600, 100, 100)); // Moscow
objects.push(new Node (295, 290, 0)); // Berlin
objects.push(new Node (100, 460, 0)); // Madrid
objects.push(new Node (257, 420, 0)); // Milan

objects.push(new Edge(objects[0], objects[2], 2, 25)); // Paris - Berlin
objects.push(new Edge(objects[1], objects[2], 2, 30)); // Moscow - Berlin
objects.push(new Edge(objects[0], objects[3], 2, 10)); // Paris - Madrid
objects.push(new Edge(objects[3], objects[4], 2, 10)); // Madrid - Milan
objects.push(new Edge(objects[0], objects[4], 2, 15)); // Paris - Milan
objects.push(new Edge(objects[2], objects[4], 2, 10)); // Berlin - Milan

function Node (x, y, value) 
{
	this.x = x;
	this.y = y;
	this.name = name;
	this.size = 15; // radius
	this.thickness = 2;
	this.value = value;

	this.isClicked = false;

	this.isNode = true; // it's almost like polymorphism. But worse
}
function Edge (node1, node2, thickness, flow)
{
	var theta = Math.atan((node2.y - node1.y) / (node2.x - node1.x));

	// offset so that the edge doesn't go inside the circle of its nodes
	var sxOff = Math.abs(Math.cos(theta) * node1.size);
	var syOff = Math.abs(Math.sin(theta) * node1.size);
	var exOff = Math.abs(Math.cos(theta) * node2.size);
	var eyOff = Math.abs(Math.sin(theta) * node2.size);
	if (node1.x < node2.x) {
		exOff *= -1;
	} else {
		sxOff *= -1;
	}
	if (node1.y < node2.y) {
		eyOff *= -1;
	} else {
		syOff *= -1;
	}

	this.sx = sxOff + node1.x;
	this.sy = syOff + node1.y;
	this.ex = exOff + node2.x;
	this.ey = eyOff + node2.y;

	this.thickness = thickness;
	this.flow = flow;

	this.isNode = false;
}

function draw_game_state() 
{
	setBackgroundImage(background);
  	// add click listener
	document.getElementById("gameCanvas").addEventListener("click", handleClick, false);

	update();
}
function setBackgroundImage (imgName)
{
	var c = document.getElementById("gameCanvas");
	c.style.backgroundImage = "url(" + imgName + ")";
	c.style.backgroundSize = "contain";
	c.style.backgroundRepeat = "no-repeat";
}

function update ()
{
	var g2 = document.getElementById("gameCanvas").getContext("2d");

	g2.clearRect (0,0,width,height);

	for (var i = 0, obj; obj = objects[i]; i++) {
		if (obj.isNode) {
			g2.fillStyle = "#F5F5DC"; // beige
			g2.strokeStyle = color;
			g2.lineWidth = obj.thickness;
			if(obj.isClicked) {
				g2.strokeStyle = clicked_color;
			}

			g2.beginPath();
			g2.arc(obj.x, obj.y, obj.size, 0, 2*Math.PI);
			g2.fill();
			g2.stroke();

		} else {
			g2.fillStyle = color;
			g2.strokeStyle = color;
			
			g2.beginPath ();
			g2.lineWidth = obj.thickness;
			g2.moveTo (obj.sx, obj.sy);
			g2.lineTo (obj.ex, obj.ey);
			g2.stroke();
		}
	}

	// ensure node values are on top:
	var nodes = getNodes();
	for (var j = 0, obj; obj = nodes[j]; j++) {
		g2.fillStyle = "#0000FF"; // blue

		g2.font = 16 + "px Georgia";
		var objText = "" + obj.value;
		// center the text
		if (obj.value < 100) {
			objText = " " + objText;
		}
		if (obj.value < 10) {
			objText = "  " + objText;
		}
		g2.fillText (objText, obj.x - 13, obj.y + 5);		
		g2.stroke();
	}
	// write flow in the middle of the edge
	var edges = getEdges();
	for (var k = 0, obj; obj = edges[k]; k++) {
		g2.fillStyle = "#0000FF"; // blue
		g2.font = 16 + "px Georgia";
		g2.fillText (obj.flow, 
			(obj.ex - obj.sx)/2 + obj.sx, 
			(obj.ey - obj.sy)/2 + obj.sy
		);		
		g2.stroke();
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
function getEdges() 
{
	var edges = [];
	for (var i = 0; i < objects.length; i++) {
		if (!objects[i].isNode) {
			edges.push(objects[i]);
		}
	}
	return edges;
}

function handleClick (e)
{
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

	clickNode(mouseX, mouseY);

   	update();
}

// checks all nodes to see if any of them were clicked
// while simultaneously unclicking everything else
function clickNode(mouseX, mouseY) 
{
	var nodes = getNodes();
	for (var i = 0, node; node = nodes[i]; i++){
		node.isClicked = false;
		node.thickness = 2;
		if (nodeClicked(mouseX, mouseY, node)) {
			node.isClicked = true;
			node.thickness = 3;
		}
	}
}

// is the mouse click within the radius of node
function nodeClicked(mouseX, mouseY, node) 
{
	if (mouseX < node.x + node.size && 
		mouseX > node.x - node.size && 
		mouseY < node.y + node.size && 
		mouseY > node.y - node.size) {
			return true;
	}
	return false;
}










