
function layEggSystem(game) {
  let queenBee = null;
  for (let i = 0, entity; entity = game.world.entities[i]; i++) {
    if (entity && entity.type == 'bee' && entity.subtype == 'queen') {
      queenBee = entity;
      break;
    }
  }
  if (!queenBee) {
    return game;
  }

  const queenGridLocation = game.worldToGrid(queenBee.pos.x, queenBee.pos.y);
  const cell = game.world.grid[queenGridLocation.x][queenGridLocation.y];
  if (!cell || !cell.type == 'honeycomb') {
    return game;
  }

  if (!cell.contains && queenBee.eggReadiness >= 400) {
    queenBee.eggReadiness = 0;
    cell.contains = {stage: 'egg', age: 0};
  }

  return game;
}
