"use strict";

var renderCircle = function renderCircle(ctx, x, y, radius, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};

var renderRect = function renderRect(ctx, x, y, theta, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.rotate(theta);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

module.exports = {
  renderRect: renderRect,
  renderCircle: renderCircle
};