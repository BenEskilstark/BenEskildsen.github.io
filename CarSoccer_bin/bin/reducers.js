'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./entities'),
    getInitialState = _require.getInitialState;

var _require2 = require('./selectors'),
    getCar = _require2.getCar;

var ceil = Math.ceil,
    floor = Math.floor,
    random = Math.random,
    round = Math.round;

var _require3 = require('./utils'),
    dotProduct = _require3.dotProduct,
    angleToVec = _require3.angleToVec,
    vecToAngle = _require3.vecToAngle,
    bounce = _require3.bounce;

var _require4 = require('./settings'),
    CAR_TURN_SPEED = _require4.CAR_TURN_SPEED,
    CAR_MAX_SPEED = _require4.CAR_MAX_SPEED,
    CAR_ACCEL = _require4.CAR_ACCEL,
    CAR_DEACCEL = _require4.CAR_DEACCEL,
    BALL_RADIUS = _require4.BALL_RADIUS,
    GOAL_MASS = _require4.GOAL_MASS,
    FIELD_WIDTH = _require4.FIELD_WIDTH,
    FIELD_HEIGHT = _require4.FIELD_HEIGHT;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState(FIELD_WIDTH, FIELD_HEIGHT);
  var score = state.score,
      entities = state.entities,
      fieldWidth = state.fieldWidth,
      fieldHeight = state.fieldHeight;

  switch (action.type) {
    case 'TOGGLE':
      return _extends({}, state, {
        running: !state.running
      });
    case 'TICK':
      return _extends({}, state, {
        entities: computePhysics(entities, fieldWidth, fieldHeight)
      });
    case 'SCORE':
      var nextScore = [].concat(_toConsumableArray(score));
      nextScore[action.player]++;
      return _extends({}, state, {
        score: nextScore
      });
    case 'ACCELERATE':
      var car = getCar(state, action.player);
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

var computePhysics = function computePhysics(entities, fieldWidth, fieldHeight) {
  // Update speeds and positions
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = 0; i < entities.length; i++) {
    for (var j = i + 1; j < entities.length; j++) {
      var entityA = entities[i];
      var entityB = entities[j];
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
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _entity = _step2.value;

      if (_entity.type != 'goal' && _entity.bounceCount == 0) {
        _entity.radius = _entity.type == 'ball' ? _entity.radius : _entity.width / 2;
        if (bounce(_entity, fieldWidth, fieldHeight)) {
          _entity.bounceCount = Math.abs(_entity.speed);
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return entities;
};

var collided = function collided(entityA, entityB) {
  if (entityA == entityB) {
    return false;
  }
  // naive -- circles only
  var radiusA = entityA.type == 'ball' ? entityA.radius : entityA.width / 2;
  var radiusB = entityB.type == 'ball' ? entityB.radius : entityB.width / 2;
  return distance(entityA, entityB) <= radiusA + radiusB;
};

var distance = function distance(entityA, entityB) {
  var xDist = entityA.x - entityB.x;
  var yDist = entityA.y - entityB.y;
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

var elasticCollision = function elasticCollision(entityA, entityB) {
  var speedVecA = angleToVec(entityA.theta, entityA.speed);
  var speedVecB = angleToVec(entityB.theta, entityB.speed);

  // console.log(speedVecA, speedVecB);
  var massFactor = 2 * entityB.mass / (entityA.mass + entityB.mass);
  var speedDiffVec = {
    x: speedVecA.x - speedVecB.x,
    y: speedVecA.y - speedVecB.y
  };
  var distVec = { x: entityA.x - entityB.x, y: entityA.y - entityB.y };
  var speedDistDotProd = dotProduct(speedDiffVec, distVec);
  var dist = distance(entityA, entityB);

  var factor = massFactor * speedDistDotProd / (dist * dist);
  var newSpeedVec = {
    x: speedVecA.x - factor * distVec.x,
    y: speedVecA.y - factor * distVec.y
  };
  entityA.speed = Math.sqrt(newSpeedVec.x * newSpeedVec.x + newSpeedVec.y * newSpeedVec.y);
  // console.log('speedDistDot', speedDistDotProd);
  // console.log('mass', massFactor, 'dist', dist, 'factor', factor, 'newSpeed', newSpeedVec);
  entityA.theta = vecToAngle(newSpeedVec);
};

module.exports = { rootReducer: rootReducer };