function addCoordHelpers(game) {
  // terms: canvas is the view into the game, world is the foreground world that
  // uses canvas coordinates (ie pixels) but may be larger than the canvas, grid
  // is the background grid.

  game.canvasToGrid = function(canvasX, canvasY) {
    const constFactorX = game.world.viewWidth / game.canvas.width;
    const constFactorY = game.world.viewHeight / game.canvas.height;
    const gridY = Math.round(canvasY * constFactorY);

    const hexFactorX = (gridY % 2 == 0)
      ? 0
      : (game.canvas.width / game.world.viewWidth) / 2;
    return {
      x: Math.round((canvasX - hexFactorX) * constFactorX) + game.world.viewLeft,
      y: gridY + game.world.viewTop,
    };
  };

  game.gridToCanvas = function(gridX, gridY) {
    const constFactorX = game.canvas.width / game.world.viewWidth;
    const hexFactorX = gridY % 2 == 0 ? 0 : constFactorX / 2;
    const constFactorY = game.canvas.height / game.world.viewHeight;
    return {
      x: (gridX - game.world.viewLeft) * constFactorX + hexFactorX,
      y: (gridY - game.world.viewTop) * constFactorY
    };
  };

  game.gridToWorld = function(gridX, gridY) {
    const worldWidth = game.world.width * (game.canvas.width / game.world.viewWidth);
    const worldHeight = game.world.height * (game.canvas.height / game.world.viewHeight);
    const constFactorX = worldWidth / game.world.width;
    const hexFactorX = gridY % 2 == 0 ? 0 : (game.canvas.width / game.world.viewWidth) / 2;
    const constFactorY = worldHeight / game.world.height;
    return {
      x: gridX * constFactorX + hexFactorX,
      y: gridY * constFactorY
    };
  }
  game.worldToGrid = function(worldX, worldY) {
    const worldWidth = game.world.width * (game.canvas.width / game.world.viewWidth);
    const worldHeight = game.world.height * (game.canvas.height / game.world.viewHeight);
    const constFactorX = game.world.width / worldWidth;
    const constFactorY = game.world.height / worldHeight;
    const gridY = Math.round(worldY * constFactorY);

    const hexFactorX = (gridY % 2 == 0)
      ? 0
      : (game.canvas.width / game.world.viewWidth) / 2;
    return {
      x: Math.round((worldX - hexFactorX) * constFactorX),
      y: gridY,
    };
  }

  game.worldToCanvas = function(worldX, worldY) {
    const constFactorX = game.canvas.width / game.world.viewWidth;
    const constFactorY = game.canvas.height / game.world.viewHeight;

    const viewWorldLeft = game.world.viewLeft * constFactorX;
    const viewWorldTop = game.world.viewTop * constFactorY;
    return {
      x: worldX - viewWorldLeft,
      y: worldY - viewWorldTop,
    };
  };

  game.canvasToWorld = function(canvasX, canvasY) {
    const constFactorX = game.canvas.width / game.world.viewWidth;
    const constFactorY = game.canvas.height / game.world.viewHeight;

    const viewWorldLeft = game.world.viewLeft * constFactorX;
    const viewWorldTop = game.world.viewTop * constFactorY;
    return {
      x: canvasX + viewWorldLeft,
      y: canvasY + viewWorldTop,
    };
  };
}
