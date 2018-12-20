'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT;

var getInitialState = function getInitialState() {
  return {
    running: true,
    entities: [].concat(_toConsumableArray(seedBoks()), [make('truck', 50, 50), make('miner', 75, 75), make('factory', 400, 400)]),
    view: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      x: 0,
      y: 0,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0
    }
  };
};

var seedBoks = function seedBoks() {
  return [make('bok', 0, 0), make('bok', 0, 5), make('bok', 5, 0), make('bok', 10, 10), make('bok', 100, 100), make('bok', 800, 500)];
};

var make = function make(type, x, y) {
  return {
    x: x, y: y,
    speed: 0, accel: 0,
    carrying: [],
    selected: false,
    theta: Math.PI,
    thetaSpeed: 0,
    type: type
  };
};

module.exports = {
  getInitialState: getInitialState,
  make: make
};