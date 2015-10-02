/* 
	This is a 2d game engine that is modelled heavily after GameMaker
	(https://www.yoyogames.com/studio) but with everything in javascript it will
	theoretically be more portable, and more importantly, be made by me.

	Games are made using four main building blocks: objects, sprites, rooms, 
	and instances. 

	The theory is that there are "objects" which are the things that do stuff in 
	the game. In Asteroids, the information that shows how the player controls 
	the ship would be contained in an object. The object has a "sprite" which
	is just an image or drawing that is what the object looks like. The game
	itself takes place inside a "room" (if the game has multiple levels, then
	there would be multiple rooms). "Instances", then, are specific 
	instantiations of an object that contain additional information specific to
	that instance. In Asteroids, each asteroid would be an instance of a more
	general asteroid object. The object itself would have a sprite (and a list 
	of events, discussed soon), while each instance of that object would have
	x and y positions, speeds, accelerations, etc. that are properties that,
	while common to asteroids overall, are different on an asteroid-to-asteroid
	basis. 

	In addition to the sprite, objects contain a list of "events" which are 
	things that can happen during the game. When an event occurs, the "effects"
	associated with that event will also occur. For example, an event could be
	a collision between an asteroid and the player's ship. The effects of that 
	event might be an explosion animation (created by changing the sprite) 
	followed by the game restarting.
*/
var SPRITES = [];
function Sprite(img, width, height) {
	this.image = img;
	this.width = width;
	this.height = height;
}

var OBJECTS = [];
function Object() {
	this.sprite;
	this.events = [];
}
function Instance(object, x, y) {
	this.object = object;
	this.xPos = x;
	this.yPos = y;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.xAccel = 0;
	this.yAccel = 0;
}
function Event(type) {
	this.eventType = type;
	this.triggered = false;
	this.effects = [];
}

var ROOMS = [];
function Room(width, height) {
	this.width = width;
	this.height = height;
	this.backgroundColor;
	this.backgroundImage;

	wrapX = false; // does the room wrap around
	wrapY = false;

	this.instances = []; // instances of objects in this room
}

var GAME_SETTINGS = {
	speed: 40, // ms per cycle
	currentRoom: 0 // the 0th room
};

///////////////////////////////////////////////////////////////////////////////
// RUNNING THE GAME

// set up a particular room
function setup(room) { 	
	// set background

  	// add instances
  	for (var i = 0, instance; instance = room.instances[i]; i++) {
  		drawInstance(instance);
  	}

}

function runGame () {
	// set up the starting room
	setup(ROOMS[GAME_SETTINGS.currentRoom]);
	// update game state repeatedly
	instancef = setInterval (
		function(){updateGameState();}, 
		GAME_SETTINGS.speed
	);
}
function updateGameState() {
	
	var room = ROOMS[GAME_SETTINGS.currentRoom];
	// check for game over

	// update instance positions
	for (var i = 0, instance; instance = room.instances[i]; i++) {
		instance.xSpeed += instance.xAccel;
		instance.ySpeed += instance.yAccel;
		instance.xPos += instance.xSpeed;
		instance.yPos += instance.ySpeed;
	}

	// check for events
	for (var j = 0, instance; instance = room.instances[j]; j++) {
  		var events = instance.object.events;
  		for (var e = 0, event; event = events[e]; e++) {
  			if (event.eventType.triggered) {

  			}
  		}
  	}

	// draw game next game state
	for (var k = 0, instance; instance = room.instances[k]; k++) {
  		drawInstance(instance);
  	}
}

function drawInstance(inst) {
	var g2 = document.getElementById("gameCanvas").getContext("2d");
	
	// All sprites are squares for now
	var sprite = inst.object.sprite;
	g2.fillRect(inst.xPos, inst.yPos, sprite.width, sprite.height);

}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Events
var keyPressUp = new Event("keyPressUp");
keyPressUp.effects.push(setYSpeed);

var keyReleaseUp = new Event("keyReleaseUp");
keyReleaseUp.effects.push(stop);
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Event Listeners 
var left_arrow = 37;
var up_arrow = 38;
var right_arrow = 39;
var down_arrow = 40;
var w = 87;
var a = 65;
var s = 83;
var d = 68;
document.onkeydown = function (e) {
	if (e.keyCode == up_arrow) {
		keyPressUp.triggered = true;
	}
}
document.onkeyup = function (e) {	
	if (e.keyCode == up_arrow) {
		keyReleaseUp.triggered = true;
	}
}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// Effects
function setXSpeed(instance, speed) {
	instance.xSpeed = speed;
}
function setYSpeed(instance, speed) {
	instance.ySpeed = speed;
}
function stop(instance) {
	instance.xSPeed = 0;
	instance.ySpeed = 0;
	instance.xAccel = 0;
	instance.yAccel = 0;
}


///////////////////////////////////////////////////////////////////////////////



