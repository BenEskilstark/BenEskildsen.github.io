'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./entities'),
    makeShip = _require.makeShip;

var _require2 = require('./shipReducers'),
    fireCannonsReducer = _require2.fireCannonsReducer,
    tickShipReducer = _require2.tickShipReducer,
    turnShipReducer = _require2.turnShipReducer;

var forShip1 = function forShip1(action) {
		return action.ship === 'ship1';
};

var rootReducer = function rootReducer(state, action) {
		if (state === undefined) {
				return {
						width: 1440,
						height: 800,
						t: 0,
						ship1: makeShip(1, 1200, 550),
						ship2: makeShip(2, 250, 250),
						running: true,
						projectiles: []
				};
		}

		var ship1 = state.ship1,
		    ship2 = state.ship2,
		    projectiles = state.projectiles;


		switch (action.type) {
				case 'tick':
						return _extends({}, state, {
								t: state.t + 1,
								ship1: tickShipReducer(ship1),
								ship2: tickShipReducer(ship2),
								projectiles: tickProjectilesReducer(projectiles, state.width, state.height)
						});
				case 'toggle':
						return _extends({}, state, {
								running: !state.running
						});
				case 'turn':
						return _extends({}, state, {
								ship1: forShip1(action) ? turnShipReducer(ship1, action) : ship1,
								ship2: forShip1(action) ? ship2 : turnShipReducer(ship2, action)
						});
				case 'fire':
						return fireCannonsReducer(state, action);
		}
};

var tickProjectilesReducer = function tickProjectilesReducer(projectiles, width, height) {
		var filteredProjectiles = projectiles.filter(function (p) {
				return p.pos.x > 0 && p.pos.x < width && p.pos.y > 0 && p.pos.y < height;
		});
		return filteredProjectiles.map(function (p) {
				var speedVec = {
						x: p.speed * Math.cos(p.rz * Math.PI / 180),
						y: p.speed * Math.sin(p.rz * Math.PI / 180)
				};
				return _extends({}, p, {
						pos: { x: p.pos.x + speedVec.x, y: p.pos.y + speedVec.y }
				});
		});
};

module.exports = { rootReducer: rootReducer };