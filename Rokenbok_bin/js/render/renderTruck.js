const {renderRect} = require('./shapes');
const {
  TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR, CAB_COLOR,
  BACKGROUND_COLOR, SELECT_COLOR, BOK_SIZE,
} = require('../settings');
const {renderBok} = require('./renderBok');
const {floor} = Math;

const renderTruck = (ctx, entity) => {
  const {x, y, theta, prevX, prevY, prevTheta, carrying} = entity;
  if (entity.selected) {
    renderRect(
      ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR,
    );
    renderRect(ctx, x, y, theta, TRUCK_WIDTH + 2, TRUCK_HEIGHT + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderRect(
      ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR,
    );
  }
  renderRect(ctx, x, y, theta, TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(theta);

  // fill carried boks
  const bokEntities = carrying.filter(entity => entity.type == 'bok');
  for (let i = 0; i < bokEntities.length; i++) {
    const bokEntity = bokEntities[i];
    renderBok(ctx, {
      ...bokEntity,
      x: -((i % 4) * floor(TRUCK_WIDTH / 4) - 10),
      y: -(floor(i / 4) * (BOK_SIZE + 2) - 3),
    });
  }

  // fill cab
  ctx.fillStyle = CAB_COLOR;
  ctx.fillRect(-TRUCK_WIDTH/2, TRUCK_HEIGHT/6, TRUCK_WIDTH, TRUCK_HEIGHT / 3);

  ctx.restore();
};

module.exports = {renderTruck};
