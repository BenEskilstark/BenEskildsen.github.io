"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fireCannonsReducer = function fireCannonsReducer(ship, action) {
  return _extends({}, ship, {
    rVel: 0,
    cannons: ship.cannons.map(function (cannon) {
      if (cannon.side == action.side && cannon.step === 0) {
        cannon.step = 50;
      }
      return cannon;
    })
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

module.exports = {
  fireCannonsReducer: fireCannonsReducer,
  tickShipReducer: tickShipReducer,
  turnShipReducer: turnShipReducer
};