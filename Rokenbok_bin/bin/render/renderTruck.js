'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./shapes'),
    renderRect = _require.renderRect;

var _require2 = require('../settings'),
    TRUCK_WIDTH = _require2.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require2.TRUCK_HEIGHT,
    TRUCK_COLOR = _require2.TRUCK_COLOR,
    CAB_COLOR = _require2.CAB_COLOR,
    BACKGROUND_COLOR = _require2.BACKGROUND_COLOR,
    SELECT_COLOR = _require2.SELECT_COLOR,
    BOK_SIZE = _require2.BOK_SIZE;

var _require3 = require('./renderBok'),
    renderBok = _require3.renderBok;

var floor = Math.floor;


var renderTruck = function renderTruck(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta,
      prevX = entity.prevX,
      prevY = entity.prevY,
      prevTheta = entity.prevTheta,
      carrying = entity.carrying;

  if (entity.selected) {
    renderRect(ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR);
    renderRect(ctx, x, y, theta, TRUCK_WIDTH + 2, TRUCK_HEIGHT + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderRect(ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR);
  }
  renderRect(ctx, x, y, theta, TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(theta);

  // fill carried boks
  var bokEntities = carrying.filter(function (entity) {
    return entity.type == 'bok';
  });
  for (var i = 0; i < bokEntities.length; i++) {
    var bokEntity = bokEntities[i];
    renderBok(ctx, _extends({}, bokEntity, {
      x: -(i % 4 * floor(TRUCK_WIDTH / 4) - 10),
      y: -(floor(i / 4) * (BOK_SIZE + 2) - 3)
    }));
  }

  // fill cab
  ctx.fillStyle = CAB_COLOR;
  ctx.fillRect(-TRUCK_WIDTH / 2, TRUCK_HEIGHT / 6, TRUCK_WIDTH, TRUCK_HEIGHT / 3);

  ctx.restore();
};

module.exports = { renderTruck: renderTruck };