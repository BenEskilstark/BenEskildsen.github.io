'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./settings'),
    CAR_MASS = _require.CAR_MASS,
    CAR_WIDTH = _require.CAR_WIDTH,
    CAR_HEIGHT = _require.CAR_HEIGHT,
    BALL_MASS = _require.BALL_MASS,
    BALL_RADIUS = _require.BALL_RADIUS,
    GOAL_WIDTH = _require.GOAL_WIDTH,
    GOAL_HEIGHT = _require.GOAL_HEIGHT,
    GOAL_MASS = _require.GOAL_MASS;

var getInitialState = function getInitialState(fieldWidth, fieldHeight) {
  return {
    running: true,
    fieldWidth: fieldWidth,
    fieldHeight: fieldHeight,
    entities: [makeBall(fieldWidth / 2, fieldHeight / 2), makeCar(3 * fieldWidth / 4, fieldHeight / 2, 0, Math.PI / 2), makeGoal(fieldWidth, fieldHeight / 2, 0, Math.PI / 2), makeCar(fieldWidth / 4, fieldHeight / 2, 1, -Math.PI / 2), makeGoal(0, fieldHeight / 2, 1, Math.PI / 2)],
    score: [0, 0]
  };
};

var makeCar = function makeCar(x, y, player, theta) {
  return _extends({}, makeEntity(x, y, CAR_MASS, theta), {
    player: player, width: CAR_WIDTH, height: CAR_HEIGHT, type: 'car'
  });
};

var makeBall = function makeBall(x, y) {
  return _extends({}, makeEntity(x, y, BALL_MASS, 0), { speed: 0, radius: BALL_RADIUS, type: 'ball' });
};

var makeGoal = function makeGoal(x, y, player, theta) {
  return _extends({}, makeEntity(x, y, GOAL_MASS, theta), {
    player: player, width: GOAL_WIDTH, height: GOAL_HEIGHT, type: 'goal'
  });
};

var makeEntity = function makeEntity(x, y, mass, theta) {
  return {
    x: x, y: y, mass: mass, speed: 0, accel: 0, theta: theta, thetaSpeed: 0, bounceCount: 0
  };
};

module.exports = {
  getInitialState: getInitialState
};