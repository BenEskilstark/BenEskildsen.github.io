const renderToCanvas = (state) => {
  const canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = state.fieldWidth;
  canvas.height = state.fieldHeight;
  const ctx = canvas.getContext('2d');
  for (const entity of state.entities) {
    switch (entity.type) {
      case 'ball':
        renderBall(ctx, entity);
        break;
      case 'car':
      case 'goal':
        renderRect(ctx, entity);
        break;
    }
  }
};

const renderRect = (ctx, rect) => {
  const {width, height} = rect;
  ctx.save();
  ctx.fillStyle = rect.player == 0 ? 'red' : 'blue';
  ctx.translate(rect.x, rect.y);
  ctx.rotate(rect.theta);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.fillStyle = '#2F4F4F';
  ctx.fillRect(-width/3, - height/3, width * 2/3, height * 2/3);
  ctx.restore();
};

const renderBall = (ctx, ball) => {
  const {x, y} = ball;
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(x, y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
};

module.exports = {renderToCanvas};
