// @flow

import type {State, Entity, Ball, Car, Goal} from 'types';

const {
  CAR_MASS,
  CAR_WIDTH,
  CAR_HEIGHT,
  BALL_MASS,
  BALL_RADIUS,
  GOAL_WIDTH,
  GOAL_HEIGHT,
  GOAL_MASS,
} = require('./settings');

const getInitialState = (fieldWidth: number, fieldHeight: number): State => {
  return {
    running: true,
    fieldWidth,
    fieldHeight,
    entities: [
      makeBall(fieldWidth / 2, fieldHeight / 2),

      makeCar(3 * fieldWidth / 4, fieldHeight / 2, 0, Math.PI / 2),
      makeGoal(fieldWidth, fieldHeight / 2, 0, Math.PI / 2),

      makeCar(fieldWidth / 4, fieldHeight / 2, 1, -Math.PI / 2),
      makeGoal(0, fieldHeight / 2, 1, Math.PI / 2),
    ],
    score: [0, 0],
  };
};

const makeCar = (x, y, player, theta): Car => {
  return {
    ...makeEntity(x, y, CAR_MASS, theta),
    player, width: CAR_WIDTH, height: CAR_HEIGHT, type: 'car',
  };
};

const makeBall = (x, y): Ball => {
  return {...makeEntity(x, y, BALL_MASS, 0), speed: 0, radius: BALL_RADIUS, type: 'ball'};
};


const makeGoal = (x, y, player, theta): Goal => {
  return {
    ...makeEntity(x, y, GOAL_MASS, theta),
      player, width: GOAL_WIDTH, height: GOAL_HEIGHT, type: 'goal',
  };
};

const makeEntity = (x, y, mass, theta): Entity => {
  return {
    x, y, mass, speed: 0, accel: 0, theta, thetaSpeed: 0, bounceCount: 0
  };
}

module.exports = {
  getInitialState,
}
