'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../entities/makeEntity'),
    make = _require.make;

var _require2 = require('../selectors'),
    getWorldCoord = _require2.getWorldCoord;

var _require3 = require('../utils'),
    distance = _require3.distance;

var placeReducer = function placeReducer(state, action) {
  var entities = state.entities,
      placing = state.placing;

  var _getWorldCoord = getWorldCoord(state, action.x, action.y),
      x = _getWorldCoord.x,
      y = _getWorldCoord.y;

  if (!isValidPlace(state, action)) {
    return state;
  }

  var entity = make(placing, x, y);
  entity.selected = true;
  entities.push(entity);

  return _extends({}, state, {
    entities: entities,
    placing: null
  });
};

var isValidPlace = function isValidPlace(state, action) {
  var entities = state.entities,
      placing = state.placing;

  var placeCoord = getWorldCoord(state, action.x, action.y);

  if (placing === null) {
    return false;
  }

  // require miner/truck to be near base/factory
  if (placing == 'miner' || placing == 'truck') {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entity = _step.value;
        var x = entity.x,
            y = entity.y,
            type = entity.type;

        if (type == 'factory' && distance({ x: x, y: y }, placeCoord) < 300) {
          return true;
        }
        if (type == 'base' && distance({ x: x, y: y }, placeCoord) < 150) {
          return true;
        }
      }
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

    return false;
  }

  return true;
};

module.exports = {
  placeReducer: placeReducer
};