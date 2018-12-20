'use strict';

var renderToCanvas = function renderToCanvas(state) {
  var canvas = document.getElementById('canvas');
  canvas.width = state.width;
  canvas.height = state.height;
  var ctx = canvas.getContext('2d');
  renderShip(ctx, state.ship1);
  renderShip(ctx, state.ship2);

  state.projectiles.forEach(function (p) {
    return renderProjectile(ctx, p);
  });
};

var renderShip = function renderShip(ctx, ship) {
  var _ship$size = ship.size,
      width = _ship$size.width,
      height = _ship$size.height;

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = ship.color;
  ctx.translate(ship.pos.x, ship.pos.y);
  ctx.rotate((ship.rz - 90) * Math.PI / 180);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.moveTo(-width / 2, -height / 2 + 5);
  ctx.lineTo(0, -height * 0.85);
  ctx.lineTo(width / 2, -height / 2 + 5);
  ctx.closePath();
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

var renderProjectile = function renderProjectile(ctx, projectile) {
  var _projectile$pos = projectile.pos,
      x = _projectile$pos.x,
      y = _projectile$pos.y;

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
};

module.exports = { renderToCanvas: renderToCanvas };