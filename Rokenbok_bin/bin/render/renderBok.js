'use strict';

var _require = require('../settings'),
    BOK_SIZE = _require.BOK_SIZE,
    BOK_COLOR = _require.BOK_COLOR;

var _require2 = require('./shapes'),
    renderRect = _require2.renderRect;

var renderBok = function renderBok(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  renderRect(ctx, x, y, theta, BOK_SIZE, BOK_SIZE, BOK_COLOR);
};

module.exports = { renderBok: renderBok };