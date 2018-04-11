
function selectionSystem(game) {
  // single click (marquee select needs to be done after render)
  if (
    game.mouse.leftUp &&
    Math.abs(game.mouse.x - game.mouse.leftX) < 1 &&
    Math.abs(game.mouse.y - game.mouse.leftY) < 1
  ) {
    // deselect all
    game.world.selected = [];
    game.world.cellSelected = [];
    iterateMatrix(game.world.grid, (entity, x, y) => {
      if (entity && entity.type == 'honeycomb') {
        entity.selected = false;
      }
    });

    // select entity under mouse
    const worldMousePos = game.canvasToWorld(game.mouse.leftX, game.mouse.leftY);
    for (let i = 0, entity; entity = game.world.entities[i]; i++) {
      entity.selected = false;
      if (entity.type == 'bee') { // this distinction needed?
        if (
          Math.abs(entity.pos.x - worldMousePos.x) < entity.radius &&
          Math.abs(entity.pos.y - worldMousePos.y) < entity.radius
        ) {
          // select only one bee for now:
          if (game.world.selected.length > 0) {
            game.world.selected[0].selected = false;
            game.world.selected = [entity];
            entity.selected = true;
          } else {
            game.world.selected.push(entity);
            entity.selected = true;
          }
        }
      }
    }

  }

  // clear out mouse state
  if (game.mouse.leftUp) {
    delete game.mouse.left;
    delete game.mouse.leftUp;
  }
  return game;
}
