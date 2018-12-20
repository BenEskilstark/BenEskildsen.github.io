'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./shapes'),
    renderCircle = _require.renderCircle;

var _require2 = require('./renderBok'),
    renderBok = _require2.renderBok;

var _require3 = require('../settings'),
    MINER_RADIUS = _require3.MINER_RADIUS,
    MINER_COLOR = _require3.MINER_COLOR,
    BACKGROUND_COLOR = _require3.BACKGROUND_COLOR,
    SELECT_COLOR = _require3.SELECT_COLOR;

var renderMiner = function renderMiner(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta,
      prevX = entity.prevX,
      prevY = entity.prevY,
      carrying = entity.carrying;

  if (entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
    renderCircle(ctx, x, y, MINER_RADIUS + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
  }
  renderCircle(ctx, x, y, MINER_RADIUS, MINER_COLOR);

  var bokEntities = carrying.filter(function (entity) {
    return entity.type == 'bok';
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = bokEntities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var bokEntity = _step.value;

      renderBok(ctx, _extends({}, bokEntity, {
        x: x,
        y: y
      }));
    }

    // render pointer
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

  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.sin(-theta) * MINER_RADIUS, Math.cos(theta) * MINER_RADIUS);
  ctx.stroke();
  ctx.restore();
};

module.exports = { renderMiner: renderMiner };