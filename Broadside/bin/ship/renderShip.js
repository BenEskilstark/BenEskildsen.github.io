'use strict';

var renderShip = function renderShip(ctx, ship, color) {
  var _ship$size = ship.size,
      width = _ship$size.width,
      height = _ship$size.height;

  ctx.fillStyle = color;
  ctx.save();
  ctx.translate(ship.pos.x, ship.pos.y);
  ctx.rotate((ship.rz - 90) * Math.PI / 180);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.moveTo(-width / 2, -height / 2 + 5);
  ctx.lineTo(0, -height * 0.85);
  ctx.lineTo(width / 2, -height / 2 + 5);
  ctx.fill();
  ctx.fillStyle = '#2F4F4F';
  ctx.fillRect(-width / 3, -height / 3, width * 2 / 3, height * 2 / 3);
  ship.cannons.forEach(function (cannon) {
    renderCannon(ctx, cannon);
  });
  ctx.restore();
};

var renderCannon = function renderCannon(ctx, cannon) {
  var pos = cannon.pos,
      step = cannon.step,
      side = cannon.side;

  ctx.fillStyle = '#000000';
  var xDir = side === 'left' ? -1 : 1;
  ctx.fillRect(pos.x, pos.y, xDir * 10 / (step + 1), -3);
};

module.exports = { renderShip: renderShip, renderCannon: renderCannon };