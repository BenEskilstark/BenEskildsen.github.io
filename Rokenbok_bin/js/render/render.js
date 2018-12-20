const {
  VIEW_WIDTH, VIEW_HEIGHT,
  BACKGROUND_COLOR, SELECT_COLOR,
  BOK_SIZE, BOK_COLOR,
  BASE_RADIUS, BASE_COLOR,
} = require('../settings');
const {renderCircle, renderRect} = require('./shapes');
const {renderMiner} = require('./renderMiner');
const {renderTruck} = require('./renderTruck');
const {renderFactory} = require('./renderFactory');
const {renderBok} = require('./renderBok');

const initCanvas = () => {
  const canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = VIEW_WIDTH;
  canvas.height = VIEW_HEIGHT;
};

const renderToCanvas = (state) => {
  const {view} = state;
  const canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  const ctx = canvas.getContext('2d');

  if (view.shouldRender) {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  }

  ctx.save();
  ctx.scale(VIEW_WIDTH / view.width, VIEW_HEIGHT / view.height);
  ctx.translate(view.x + view.width / 2, view.y + view.height / 2);
  if (view.image) {
    ctx.drawImage(
      view.image,
      -view.imgX - view.imgWidth/2,
      -view.imgY - view.imgHeight/2,
      view.imgWidth,
      view.imgHeight,
    );
    ctx.restore();
    // see comment below
    view.shouldRender = false;
    return;
  }
  for (const entity of state.bokEntities) {
    if (view.shouldRender) {
      renderBok(ctx, entity);
    }
  }
  for (const entity of state.entities) {
    switch (entity.type) {
      case 'truck':
        renderTruck(ctx, entity);
        break;
      case 'miner':
        renderMiner(ctx, entity);
        break;
      case 'factory':
        renderFactory(ctx, entity);
        break;
      case 'base':
        renderBase(ctx, entity);
        break;
    }
  }
  // shhh this is a side-effect on the state so that I can change the state without
  // causing yet-another-re-render. This flag only exists to try to not render more
  // than needed
  view.shouldRender = false;
  ctx.restore();
};

const renderBase = (ctx, entity) => {
  const {x, y, theta} = entity;
  renderCircle(ctx, x, y, BASE_RADIUS, BASE_COLOR);
};

module.exports = {renderToCanvas, initCanvas};
