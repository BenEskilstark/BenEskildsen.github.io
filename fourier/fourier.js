var DEG = Math.PI/180; // convert degrees to radians

function circle (id)
{
	this.x = 250;
	this.y = 250;
	this.radius = 100;
	this.theta = 0;
	this.speed = 1;

	this.canvasid = id; 
}

function point (x,y)
{
	this.x = x;
	this.y = y;
}

function initialize_and_runf (formf)
{
	a.radius = parseFloat (formf.rad1.value);
	a.speed = parseFloat (formf.spd1.value);
	b.radius = parseFloat (formf.rad2.value);
	b.speed = parseFloat (formf.spd2.value);
	c.radius = parseFloat (formf.rad3.value);
	c.speed = parseFloat (formf.spd3.value);
	d.radius = parseFloat (formf.rad4.value);
	if (running) {clearInterval(instancef);}
	instancef = setInterval (function () 
	{ 
		updatef (circles, points);
	}, 10);
	running = true;
}

function updatef (circles, points)
{ 
	for (var i = 0; i < circles.length; i++) {
		var circ = circles[i];
		circ.theta += circ.speed % 360;
		if (i + 1 < circles.length) {
			circles[i+1].x = circ.x + 
				circ.radius * Math.cos (circ.theta * DEG);
			circles[i+1].y = circ.y +
				circ.radius * Math.sin (circ.theta * DEG);
		}
	}
	draw (circles,points);
}

function draw (circles,points) 
{
	var g2 = document.getElementById(circles[0].canvasid).getContext("2d");
    var width = 1000;
    var height = 500;

    g2.fillStyle="#E8E8E8"; // gray
    g2.fillRect (0, 0, width, height);
	for (var i = 0; i < circles.length; i++) {
		var circ = circles[i];
		// draw the center:
		g2.fillStyle="#FF0000"; // red
		g2.fillRect (circ.x-2, circ.y-2, 4, 4);

		// draw the circle:
		g2.beginPath ();
		g2.arc (circ.x, circ.y, circ.radius, 0, 2*Math.PI);
		g2.stroke ();
	}

	//points
	var oc = circles[circles.length - 1];
	g2.beginPath ();
	g2.moveTo (oc.x+2,oc.y-1);
	g2.lineTo (548, oc.y-1);
	g2.stroke ();
	points.unshift (new point (548, circ.y-2));
	for (var p = 0; p < points.length; p++) {
		points[p].x += 1
		g2.fillStyle="#FF0000"; // red
		g2.fillRect (points[p].x-2, points[p].y-4, 4, 7);
	}
	if (points[points.length-1].x > 1000) {
		points.reverse();
		points.shift();
		points.reverse();
	}
}
