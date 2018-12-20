'use strict';

var makeShip = function makeShip(id) {
		return {
				id: id,
				vel: -2,
				rVel: 0,
				pos: { x: 250, y: 250 },
				rz: 90,
				cannons: [{ side: 'left', pos: 0, step: 0 }, { side: 'left', pos: 1, step: 0 }, { side: 'left', pos: 2, step: 0 }, { side: 'right', pos: 0, step: 0 }, { side: 'right', pos: 1, step: 0 }, { side: 'right', pos: 2, step: 0 }]
		};
};

module.exports = { makeShip: makeShip };