'use strict';

var makeShip = function makeShip(id, x, y) {
     var width = 60;
     var height = 160;
     return {
          id: id,
          color: id === 1 ? '#A9A9A9' : 'brown',
          vel: -2,
          rVel: 0,
          size: { width: width, height: height },
          pos: { x: x, y: y },
          rz: 90,
          cannons: [{ side: 'left', pos: { x: -width / 3, y: -height / 3 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: -height / 4 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: -height / 6 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: -height / 12 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: 0 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: height / 12 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: height / 6 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: height / 4 }, step: 0 }, { side: 'left', pos: { x: -width / 3, y: height / 3 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: -height / 3 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: -height / 4 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: -height / 6 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: -height / 12 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: 0 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: height / 12 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: height / 6 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: height / 4 }, step: 0 }, { side: 'right', pos: { x: width / 3, y: height / 3 }, step: 0 }]
     };
};

var makeProjectile = function makeProjectile(ship, cannon, dir) {
     var pos = cannon.pos,
         side = cannon.side;

     return {
          speed: 25,
          rz: dir + (side == 'left' ? 90 : 270) % 360,
          pos: { x: pos.x + ship.pos.x, y: pos.y + ship.pos.y }
     };
};

module.exports = { makeShip: makeShip, makeProjectile: makeProjectile };