
function dragSystem(game) {
  if ( // drag
    game.mouse.left && !game.mouse.leftUp &&
    (Math.abs(game.mouse.x - game.mouse.leftX) > 0 ||
    Math.abs(game.mouse.y - game.mouse.leftY) > 0)
  ) {
    const prevX = game.mouse.prev ? game.mouse.prev.x : game.mouse.x;
    const deltaX = game.mouse.x - prevX;
    const prevY = game.mouse.prev ? game.mouse.prev.y : game.mouse.y;
    const deltaY = game.mouse.y - prevY;

    const gridDeltaX = deltaX * (game.world.viewWidth / game.canvas.width);
    const gridDeltaY = deltaY * (game.world.viewHeight / game.canvas.height);
    game.world.viewLeft -= gridDeltaX;
    game.world.viewTop -= gridDeltaY;

    game.mouse.prev = {
      x: game.mouse.x,
      y: game.mouse.y,
    };
  } else if (game.mouse.leftUp &&
    (Math.abs(game.mouse.x - game.mouse.leftX) > 1 ||
    Math.abs(game.mouse.y - game.mouse.leftY) > 1)
  ) { // clear out mouse state
    delete game.mouse.left;
    delete game.mouse.leftUp;
    delete game.mouse.prev;
  }

  return game;
}
