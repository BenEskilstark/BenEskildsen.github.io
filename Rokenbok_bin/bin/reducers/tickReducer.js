'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../settings'),
    TRUCK_SPEED = _require.TRUCK_SPEED,
    TRUCK_WIDTH = _require.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require.TRUCK_HEIGHT,
    TRUCK_CAPACITY = _require.TRUCK_CAPACITY,
    TRUCK_ACCEL = _require.TRUCK_ACCEL,
    TRUCK_TURN_SPEED = _require.TRUCK_TURN_SPEED,
    MINER_SPEED = _require.MINER_SPEED,
    MINER_RADIUS = _require.MINER_RADIUS,
    BOK_SIZE = _require.BOK_SIZE,
    FACTORY_SIZE = _require.FACTORY_SIZE,
    BASE_RADIUS = _require.BASE_RADIUS;

var _require2 = require('../utils'),
    distance = _require2.distance,
    vecToAngle = _require2.vecToAngle;

var _require3 = require('../selectors'),
    thetaToNearestBase = _require3.thetaToNearestBase,
    getBokCollected = _require3.getBokCollected;

var _require4 = require('./entityReducer'),
    truckTurn = _require4.truckTurn,
    truckAccel = _require4.truckAccel,
    truckDeaccel = _require4.truckDeaccel;

var tickReducer = function tickReducer(state, action) {
  var imgCount = state.view.imgCount;
  var image = state.view.image;
  var shouldRender = state.view.shouldRender;
  if (imgCount == 1) {
    image = null;
    shouldRender = true;
  }

  var totalBokCollected = getBokCollected(state);
  var bokMilestones = state.bokMilestones,
      nextBokMilestone = state.nextBokMilestone;

  if (totalBokCollected >= nextBokMilestone) {
    var timeElapsed = Date.now() - state.startTime;
    bokMilestones.push({ count: nextBokMilestone, time: timeElapsed });
    nextBokMilestone *= 10;
  }

  var _computePhysics = computePhysics(state),
      entities = _computePhysics.entities,
      bokEntities = _computePhysics.bokEntities;

  return _extends({}, state, {
    entities: entities,
    bokEntities: bokEntities,
    bokMilestones: bokMilestones,
    nextBokMilestone: nextBokMilestone,
    view: _extends({}, state.view, {
      image: image,
      shouldRender: shouldRender,
      imgCount: state.view.imgCount - 1
    })
  });
};

var computePhysics = function computePhysics(state) {
  var entities = state.entities;
  var bokEntities = state.bokEntities;
  var nonBokEntities = entities;

  // Update ongoing recordings/playbacks
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nonBokEntities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _entity = _step.value;

      if (_entity.recording.recording) {
        _entity.recording.tick++;
        if (_entity.recording.returning) {
          truckReturn(_entity);
        }
      }
      if (_entity.recording.playing) {
        _entity.recording.tick++;
        if (_entity.recording.tick == _entity.recording.endTick) {
          _entity.recording.tick = 0;
        }
        if (_entity.recording.returning == true) {
          truckReturn(_entity);
        }
        var actions = _entity.recording.actions[_entity.recording.tick];
        if (actions) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = actions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var action = _step5.value;

              switch (action.type) {
                case 'ACCELERATE':
                  truckAccel(_entity);
                  break;
                case 'DEACCELERATE':
                  truckDeaccel(_entity);
                  break;
                case 'TURN':
                  truckTurn(_entity, action.dir);
                  break;
                case 'RETURN':
                  _entity.recording.returning = true;
                  truckReturn(_entity);
                  break;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      }
    }

    // Update speeds and positions
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = nonBokEntities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _entity2 = _step2.value;

      _entity2.speed += _entity2.accel;
      _entity2.prevTheta = _entity2.theta;
      _entity2.theta += _entity2.thetaSpeed;
      if (_entity2.type == 'truck') {
        _entity2.speed = _entity2.speed > TRUCK_SPEED ? TRUCK_SPEED : _entity2.speed;
      } else if (_entity2.type == 'miner') {
        _entity2.speed = _entity2.speed > MINER_SPEED ? MINER_SPEED : _entity2.speed;
      }
      _entity2.speed = _entity2.speed < 0 ? 0 : _entity2.speed; // NOTE: can't reverse
      _entity2.prevX = _entity2.x;
      _entity2.prevY = _entity2.y;
      _entity2.x += -1 * Math.sin(_entity2.theta) * _entity2.speed;
      _entity2.y += Math.cos(_entity2.theta) * _entity2.speed;
    }

    // Handle bok collisions
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

  for (var i = 0; i < nonBokEntities.length; i++) {
    var entity = nonBokEntities[i];
    for (var j = 0; j < bokEntities.length; j++) {
      var bok = bokEntities[j];
      if (collided(entity, bok)) {
        // trucks destroy boks they hit
        if (entity.type == 'truck') {
          entity.speed /= 2;
          bok.shouldDestroy = true;
        }
        // miners pick up boks they hit and turn around
        if (entity.type == 'miner') {
          bok.shouldDestroy = true;
          entity.carrying = [bok];
          entity.theta = thetaToNearestBase(state, entity);
        }
      }
    }
  }

  // Handle trucks dropping at factory
  var truckEntities = entities.filter(function (entity) {
    return entity.type == 'truck';
  });
  var factoryEntities = entities.filter(function (entity) {
    return entity.type == 'factory';
  });
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = truckEntities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var truckEntity = _step3.value;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = factoryEntities[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var factoryEntity = _step6.value;

          if (collided(truckEntity, factoryEntity)) {
            factoryEntity.collected += truckEntity.carrying.length;
            factoryEntity.totalCollected += truckEntity.carrying.length;
            truckEntity.carrying = [];
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }

    // Handle miner collisions
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var minerEntities = entities.filter(function (entity) {
    return entity.type == 'miner';
  });
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = minerEntities[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var minerEntity = _step4.value;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = nonBokEntities[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _entity3 = _step7.value;

          // Give boks to base/factory/truck
          if (_entity3.type == 'truck' && collided(minerEntity, _entity3) && _entity3.carrying.length < TRUCK_CAPACITY && minerEntity.carrying.length > 0) {
            _entity3.carrying = _entity3.carrying.concat(minerEntity.carrying);
            minerEntity.carrying = [];
            turnMinerAround(minerEntity);
          }
          if (_entity3.type == 'factory' && collided(minerEntity, _entity3)) {
            _entity3.collected += minerEntity.carrying.length;
            _entity3.totalCollected += minerEntity.carrying.length;
            minerEntity.carrying = [];
            turnMinerAround(minerEntity);
          }
          if (_entity3.type == 'base' && collided(minerEntity, _entity3)) {
            if (minerEntity.carrying.length == 0) {
              turnMinerAround(minerEntity);
              break;
            }
            minerEntity.speed = 0; // chill at the base until a truck comes
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
              for (var _iterator8 = truckEntities[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                var _truckEntity = _step8.value;

                if (collided(_entity3, _truckEntity) && _truckEntity.carrying.length < TRUCK_CAPACITY) {
                  _truckEntity.carrying = _truckEntity.carrying.concat(minerEntity.carrying);
                  minerEntity.carrying = [];
                  turnMinerAround(minerEntity);
                }
              }
            } catch (err) {
              _didIteratorError8 = true;
              _iteratorError8 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                  _iterator8.return();
                }
              } finally {
                if (_didIteratorError8) {
                  throw _iteratorError8;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return {
    entities: entities,
    bokEntities: bokEntities.filter(function (entity) {
      return !entity.shouldDestroy;
    })
  };
};

var truckReturn = function truckReturn(entity) {
  var targetPos = entity.recording.initialPos;
  var THETA_EPSILON = 0.2;
  if (Math.abs(targetPos.x - entity.x) < 3 && Math.abs(targetPos.y - entity.y) < 3) {
    entity.x = targetPos.x;
    entity.y = targetPos.y;
    entity.speed = 0;
    entity.accel = 0;
    if (Math.abs(targetPos.theta - entity.theta) < THETA_EPSILON) {
      entity.theta = targetPos.theta;
      entity.thetaSpeed = 0;
      entity.recording.returning = false;
      return;
    }
    var _dir = targetPos.theta - entity.theta > 0 ? 1 : -1;
    entity.thetaSpeed = _dir * TRUCK_TURN_SPEED;
    return;
  }
  var vec = { x: targetPos.x - entity.x, y: targetPos.y - entity.y };
  var toTheta = vecToAngle(vec);
  if (Math.abs(toTheta - entity.theta) < THETA_EPSILON) {
    entity.thetaSpeed = 0;
    entity.accel = TRUCK_ACCEL;
    return;
  }
  entity.speed = 0;
  entity.accel = 0;
  var dir = toTheta - entity.theta > 0 ? 1 : -1;
  entity.thetaSpeed = dir * TRUCK_TURN_SPEED;
};

var turnMinerAround = function turnMinerAround(minerEntity) {
  minerEntity.theta += Math.PI;
  minerEntity.speed = MINER_SPEED;
  // can't quite turn around since we're still overlapping the base,
  // push us out a bit
  minerEntity.x += -1 * Math.sin(minerEntity.theta) * minerEntity.speed;
  minerEntity.y += Math.cos(minerEntity.theta) * minerEntity.speed;
};

var collided = function collided(entityA, entityB) {
  if (entityA == entityB) {
    return false;
  }
  // naive -- circles only
  var radiusA = 0;
  switch (entityA.type) {
    case 'truck':
      radiusA = TRUCK_WIDTH / 2;
      break;
    case 'miner':
      radiusA = MINER_RADIUS;
      break;
    case 'bok':
      radiusA = BOK_SIZE / 2;
      break;
    case 'factory':
      radiusA = FACTORY_SIZE / 2;
      break;
    case 'base':
      radiusA = BASE_RADIUS;
      break;
  }
  var radiusB = 0;
  switch (entityB.type) {
    case 'truck':
      radiusB = TRUCK_WIDTH / 2;
      break;
    case 'miner':
      radiusB = MINER_RADIUS;
      break;
    case 'bok':
      radiusB = BOK_SIZE / 2;
      break;
    case 'factory':
      radiusB = FACTORY_SIZE / 2;
      break;
    case 'base':
      radiusB = BASE_RADIUS;
      break;
  }

  return distance(entityA, entityB) <= radiusA + radiusB;
};

module.exports = {
  tickReducer: tickReducer
};