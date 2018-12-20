const {
  BOK_SIZE, BOK_COLOR
} = require('../settings');
const {renderRect} = require('./shapes');

const renderBok = (ctx, entity) => {
  const {x, y, theta} = entity;
  renderRect(ctx, x, y, theta, BOK_SIZE, BOK_SIZE, BOK_COLOR);
};

module.exports = {renderBok};

