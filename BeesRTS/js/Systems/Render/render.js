// this system is purely side-effect-driven -- rendering into the canvas
// made up of multiple subsystems for each thing to render
function renderSystem(game) {
  const canvas = document.getElementById(game.canvas.id);
  invariant(canvas != null, 'no canvas with id ' + game.canvas.id);
  const ctx = canvas.getContext('2d');
  invariant(ctx != null, 'no 2d context on canvas ' + canvas);
  // render sky
  ctx.fillStyle = 'steelblue';
  ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  // render landscape
  const canvasCoord = game.gridToWorld(game.world.viewLeft, game.world.viewTop);
  const worldSize = game.gridToWorld(game.world.width, game.world.height);
  ctx.drawImage(
    game.sprites.landscape[1],
    -canvasCoord.x, -canvasCoord.y,
    worldSize.x, worldSize.y,
  );

  renderBackground(game, ctx);
  renderForeground(game, ctx);
  return game;
}
