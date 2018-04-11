function marqueeSystem(game) {
  if ( // marquee select
    game.mouse.right && !game.mouse.rightUp &&
    (Math.abs(game.mouse.x - game.mouse.rightX) > 0 ||
    Math.abs(game.mouse.y - game.mouse.rightY) > 0)
  ) {
    game.mouse.inMarquee = true;
    const canvas = document.getElementById(game.canvas.id);
    invariant(canvas != null, 'no canvas with id ' + game.canvas.id);
    const ctx = canvas.getContext('2d');
    invariant(ctx != null, 'no 2d context on canvas ' + canvas);

    // draw the marquee rectangle
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(game.mouse.rightX, game.mouse.rightY);
    ctx.lineTo(game.mouse.rightX, game.mouse.y);
    ctx.lineTo(game.mouse.x, game.mouse.y);
    ctx.lineTo(game.mouse.x, game.mouse.rightY);
    ctx.lineTo(game.mouse.rightX, game.mouse.rightY);
    ctx.stroke();

    // deselect all (and set deselect flag on entity inside next loop)
    game.world.cellSelected = [];

    const gridRightPos = game.canvasToGrid(game.mouse.rightX, game.mouse.rightY);
    const gridMousePos = game.canvasToGrid(game.mouse.x, game.mouse.y);
    // select honeycomb entities inside the marquee
    const upperX = gridRightPos.x > gridMousePos.x ? gridRightPos.x : gridMousePos.x;
    const lowerX = gridRightPos.x > gridMousePos.x ? gridMousePos.x : gridRightPos.x;
    const upperY = gridRightPos.y > gridMousePos.y ? gridRightPos.y : gridMousePos.y;
    const lowerY = gridRightPos.y > gridMousePos.y ? gridMousePos.y : gridRightPos.y;
    iterateMatrix(game.world.grid, (entity, x, y) => {
      if (entity && entity.type == 'honeycomb') {
        entity.selected = false;
        if (
          x <= upperX && x >= lowerX && y <= upperY && y >= lowerY
        ) {
          entity.selected = true;
          game.world.cellSelected.push(entity);
        }
      }
    });

  } else if (game.mouse.rightUp &&
    (Math.abs(game.mouse.x - game.mouse.rightX) > 1 ||
    Math.abs(game.mouse.y - game.mouse.rightY) > 1)
  ) { // clear out mouse state
    game.mouse.inMarquee = false;
    delete game.mouse.right;
    delete game.mouse.rightUp;
  }
  return game;
}
