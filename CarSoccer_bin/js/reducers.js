// @flow

const {getInitialState} = require('./entities');
const {getCar} = require('./selectors');
const {ceil, floor, random, round} = Math;
const {dotProduct, angleToVec, vecToAngle, bounce} = require('./utils');
const {
  CAR_TURN_SPEED, CAR_MAX_SPEED, CAR_ACCEL, CAR_DEACCEL,
  BALL_RADIUS, GOAL_MASS,
  FIELD_WIDTH, FIELD_HEIGHT
} = require('./settings');

import type {State} from 'types';

const rootReducer = (state: State, action: Action): State => {
	if (state === undefined) return getInitialState(FIELD_WIDTH, FIELD_HEIGHT);
  const {score, entities, fieldWidth, fieldHeight} = state;
	switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        running: !state.running,
      };
    case 'TICK':
      return {
        ...state,
        entities: computePhysics(entities, fieldWidth, fieldHeight),
      };
    case 'SCORE':
      const nextScore = [...score];
      nextScore[action.player]++;
      return {
        ...state,
        score: nextScore,
      };
    case 'ACCELERATE':
      let car = getCar(state, action.player);
      car.accel = car.speed < CAR_MAX_SPEED ? CAR_ACCEL : 0;
      return state;
    case 'DEACCELERATE':
      car = getCar(state, action.player);
      car.accel = car.speed > 0 ? CAR_DEACCEL : 0;
      return state;
    case 'TURN':
      car = getCar(state, action.player);
      car.thetaSpeed = action.dir * CAR_TURN_SPEED;
      return state;
	}
  return state;
};

const computePhysics = (entities, fieldWidth, fieldHeight): Array<Entity> => {
  // Update speeds and positions
  for (const entity of entities) {
    if (entity.bounceCount > 0) {
      entity.bounceCount--;
    }
    entity.theta += entity.thetaSpeed;
    entity.speed += entity.accel;
    entity.speed = entity.speed > CAR_MAX_SPEED ? CAR_MAX_SPEED : entity.speed;
    entity.speed = entity.speed < 0 ? 0 : entity.speed; // NOTE: can't reverse
    entity.x += -1 * Math.sin(entity.theta) * entity.speed;
    entity.y += Math.cos(entity.theta) * entity.speed;
  }

  // Handle collisions with each other
  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const entityA = entities[i];
      const entityB = entities[j];
      if (entityA.bounceCount != 0 || entityB.bounceCount != 0) {
        continue;
      }
      if (collided(entityA, entityB)) {
        elasticCollision(entityA, entityB);
        elasticCollision(entityB, entityA);
        entityA.bounceCount = 5;
        entityB.bounceCount = 5;
      }
    }
  }

  // Handle collisions with walls
  for (const entity of entities) {
    if (entity.type != 'goal' && entity.bounceCount == 0) {
      entity.radius = entity.type == 'ball' ? entity.radius : entity.width / 2;
      if (bounce(entity, fieldWidth, fieldHeight)) {
        entity.bounceCount = Math.abs(entity.speed);
      }
    }
  }

  return entities;
}

const collided = (entityA: Entity, entityB: Entity): boolean => {
  if (entityA == entityB) {
    return false;
  }
  // naive -- circles only
  const radiusA = entityA.type == 'ball' ? entityA.radius : entityA.width / 2;
  const radiusB = entityB.type == 'ball' ? entityB.radius : entityB.width / 2;
  return distance(entityA, entityB) <= radiusA + radiusB;
};

const distance = (entityA, entityB) => {
  const xDist = entityA.x - entityB.x;
  const yDist = entityA.y - entityB.y;
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

const elasticCollision = (entityA, entityB) => {
  const speedVecA = angleToVec(entityA.theta, entityA.speed);
  const speedVecB = angleToVec(entityB.theta, entityB.speed);

  // console.log(speedVecA, speedVecB);
  const massFactor = 2 * entityB.mass / (entityA.mass + entityB.mass);
  const speedDiffVec = {
    x: speedVecA.x - speedVecB.x,
    y: speedVecA.y - speedVecB.y,
  };
  const distVec = {x: entityA.x - entityB.x, y: entityA.y - entityB.y};
  const speedDistDotProd = dotProduct(speedDiffVec, distVec);
  const dist = distance(entityA, entityB);

  const factor = massFactor * speedDistDotProd / (dist * dist);
  const newSpeedVec = {
    x: speedVecA.x - factor * distVec.x,
    y: speedVecA.y - factor * distVec.y,
  };
  entityA.speed = Math.sqrt(
    newSpeedVec.x * newSpeedVec.x + newSpeedVec.y * newSpeedVec.y
  );
  // console.log('speedDistDot', speedDistDotProd);
  // console.log('mass', massFactor, 'dist', dist, 'factor', factor, 'newSpeed', newSpeedVec);
  entityA.theta = vecToAngle(newSpeedVec);
};

module.exports = {rootReducer};
