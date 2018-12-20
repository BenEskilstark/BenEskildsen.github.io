'use strict';

var renderShip = function renderShip(ctx, ship, color) {
  ctx.fillStyle = color;
  var width = 30;
  var height = 80;
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
    renderCannon(ctx, width, height, cannon);
  });
  ctx.restore();
};

var renderCannon = function renderCannon(ctx, width, height, cannon) {
  var pos = cannon.pos,
      step = cannon.step;

  ctx.fillStyle = '#000000';
  var xOffset = cannon.side === 'right' ? width * 2 / 3 : 0;
  var xDir = cannon.side === 'left' ? -1 : 1;
  var p = pos * 0.25 - 0.25;
  width /= step + 1;
  ctx.fillRect(xDir * width / 3, -height * p, xDir * width / 3, -width / 10);
};

module.exports = { renderShip: renderShip, renderCannon: renderCannon };