'use strict';

var _require = require('./settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT;

var _require2 = require('./utils'),
    distance = _require2.distance,
    vecToAngle = _require2.vecToAngle;

var getSelectedEntities = function getSelectedEntities(state) {
  return state.entities.filter(function (entity) {
    return entity.selected;
  });
};

// convert given x, y in canvas coordinates to world coordinates based on the
// view position
var getWorldCoord = function getWorldCoord(state, x, y) {
  var view = state.view;

  return {
    x: (x - VIEW_WIDTH / 2) * view.width / VIEW_WIDTH - view.x,
    y: (y - VIEW_HEIGHT / 2) * view.height / VIEW_HEIGHT - view.y
  };
};

var thetaToNearestBase = function thetaToNearestBase(state, entity) {
  var bases = state.entities.filter(function (e) {
    return e.type == 'base' || e.type == 'factory';
  });
  var theta = 0;
  var shortestDist = Infinity;
  for (var i = 0; i < bases.length; i++) {
    var dist = distance(entity, bases[i]);
    if (dist < shortestDist) {
      shortestDist = dist;
      var vec = { x: bases[i].x - entity.x, y: bases[i].y - entity.y };
      theta = vecToAngle(vec);
    }
  }
  return theta;
};

var getBokCollected = function getBokCollected(state) {
  var factories = state.entities.filter(function (e) {
    return e.type == 'factory';
  });
  var totalBokCollected = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = factories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var factory = _step.value;

      totalBokCollected += factory.totalCollected;
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

  return totalBokCollected;
};

module.exports = {
  getSelectedEntities: getSelectedEntities,
  getWorldCoord: getWorldCoord,
  thetaToNearestBase: thetaToNearestBase,
  getBokCollected: getBokCollected
};