"use strict";

var make = function make(type, x, y) {
  return {
    x: x, y: y,
    speed: 0, accel: 0,
    carrying: [],
    collected: 0, // for the factory
    totalCollected: 0,
    selected: false,
    theta: Math.PI,
    prevTheta: Math.PI,
    thetaSpeed: 0,
    type: type,
    prevX: x,
    prevY: y,
    recording: {
      recording: false,
      playing: false,
      returning: false,
      tick: 0,
      actions: {}
    }
  };
};

module.exports = {
  make: make
};