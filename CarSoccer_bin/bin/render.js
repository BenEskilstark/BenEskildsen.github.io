'use strict';

var renderToCanvas = function renderToCanvas(state) {
  var canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = state.fieldWidth;
  canvas.height = state.fieldHeight;
  var ctx = canvas.getContext('2d');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var renderRect = function renderRect(ctx, rect) {
  var width = rect.width,
      height = rect.height;

  ctx.save();
  ctx.fillStyle = rect.player == 0 ? 'red' : 'blue';
  ctx.translate(rect.x, rect.y);
  ctx.rotate(rect.theta);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.fillStyle = '#2F4F4F';
  ctx.fillRect(-width / 3, -height / 3, width * 2 / 3, height * 2 / 3);
  ctx.restore();
};

var renderBall = function renderBall(ctx, ball) {
  var x = ball.x,
      y = ball.y;

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(x, y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();
};

module.exports = { renderToCanvas: renderToCanvas };