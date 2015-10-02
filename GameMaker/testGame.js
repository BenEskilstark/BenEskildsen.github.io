var block = new Object();
block.sprite = new Sprite("", 30, 20);

var instance = new Instance(block, 200, 300);

var room = new Room(800, 590);
room.instances.push(instance);
ROOMS.push(room);