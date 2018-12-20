'use strict';

var _require = require('../settings'),
    FACTORY_SIZE = _require.FACTORY_SIZE,
    FACTORY_COLOR = _require.FACTORY_COLOR;

var renderFactory = function renderFactory(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(theta + Math.PI);
  ctx.fillStyle = FACTORY_COLOR;
  ctx.beginPath();
  ctx.moveTo(-FACTORY_SIZE / 2, FACTORY_SIZE / 2);
  ctx.lineTo(-FACTORY_SIZE / 2, -FACTORY_SIZE / 2); // left wall
  ctx.lineTo(-FACTORY_SIZE / 4, -FACTORY_SIZE / 4); // first diagonal
  ctx.lineTo(-FACTORY_SIZE / 4, -FACTORY_SIZE / 2);
  ctx.lineTo(0, -FACTORY_SIZE / 4); // second diagonal
  ctx.lineTo(0, -FACTORY_SIZE / 2);
  ctx.lineTo(FACTORY_SIZE / 4, -FACTORY_SIZE / 4); // third diagonal
  ctx.lineTo(FACTORY_SIZE / 4, -FACTORY_SIZE / 2);
  ctx.lineTo(FACTORY_SIZE / 2, -FACTORY_SIZE / 4); // fourth diagonal
  ctx.lineTo(FACTORY_SIZE / 2, FACTORY_SIZE / 2); // right wall
  ctx.closePath(); // bottom
  ctx.fill();
  ctx.restore();
};

module.exports = { renderFactory: renderFactory };