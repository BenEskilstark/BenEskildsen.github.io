'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var floor = Math.floor,
    random = Math.random;

var _require = require('./entities'),
    makeProjectile = _require.makeProjectile;

var fireCannonsReducer = function fireCannonsReducer(state, action) {
  var ship1 = state.ship1,
      ship2 = state.ship2;


  var ship = forShip1(action) ? ship1 : ship2;
  var canFire = ship.cannons.filter(function (cannon) {
    return cannon.side == action.side && cannon.step === 0;
  });
  var projectiles = [].concat(_toConsumableArray(state.projectiles));
  if (canFire.length > 0) {
    var cannon = canFire[floor(random() * canFire.length)];
    cannon.step = 50;
    ship.rVel = 0;
    projectiles.push(makeProjectile(ship, cannon, ship.rz));
  }

  return _extends({}, state, {
    ship1: forShip1(action) ? ship : ship1,
    ship2: forShip1(action) ? ship2 : ship,
    projectiles: projectiles
  });
};

var tickShipReducer = function tickShipReducer(ship) {
  var xVel = ship.vel * Math.cos(Math.PI / 180 * ship.rz);
  var yVel = ship.vel * Math.sin(Math.PI / 180 * ship.rz);
  return _extends({}, ship, {
    cannons: ship.cannons.map(function (cannon) {
      cannon.step = cannon.step > 0 ? cannon.step - 1 : 0;
      return cannon;
    }),
    pos: { x: ship.pos.x + xVel, y: ship.pos.y + yVel },
    rz: ship.rz + ship.rVel
  });
};

var turnShipReducer = function turnShipReducer(ship, action) {
  return _extends({}, ship, {
    rVel: action.dir
  });
};

var forShip1 = function forShip1(action) {
  return action.ship === 'ship1';
};

module.exports = {
  fireCannonsReducer: fireCannonsReducer,
  tickShipReducer: tickShipReducer,
  turnShipReducer: turnShipReducer
};