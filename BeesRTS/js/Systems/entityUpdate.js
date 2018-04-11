
function entityUpdateSystem(game) {
  for (let i = 0, entity; entity = game.world.entities[i]; i++) {
    switch (entity.type) {
      case 'bee':
        entity.velocity = {
          x: entity.velocity.x + entity.accel.x,
          y: entity.velocity.y + entity.accel.y
        };

        // if moving
        if (entity.velocity.x != 0 || entity.velocity.y != 0) {
          entity.angle = Math.atan(
            entity.velocity.y / entity.velocity.x
          );
          if (entity.velocity.x > 0) {
            entity.angle -= Math.PI;
          }

          if (Math.random() < 0.05 || entity.spriteIndex == 0) {
            entity.spriteIndex += 1;
            if (entity.spriteIndex >= game.sprites.bee.length) {
              entity.spriteIndex = 1;
            }
          }
        } else {
          entity.spriteIndex = 0;
          entity.angle = 0;
        }

        entity.pos = {
          x: entity.pos.x + entity.velocity.x,
          y: entity.pos.y + entity.velocity.y
        };
        if (entity.subtype == 'queen') {
          entity.eggReadiness += 1;
        }
        entity.age++;
        break;
    }
  }

  // update things in honeycombs
  iterateMatrix(game.world.grid, (cell, x, y) => {
    if (!cell || !cell.contains) {
      return;
    }
    cell.contains.age++;
    switch (cell.contains.stage) {
      case 'egg':
        if (cell.contains.age > 500) {
          cell.contains = {stage: 'larva', fed: 0};
        }
        break;
      case 'larva':
        if (cell.contains.fed >= 300) {
          cell.contains = {stage: 'pupa', age: 0};
        }
        break;
      case 'pupa':
        if (cell.contains.age > 500) {
          cell.contains = null;
          game.world.entities.push(makeBee('worker', game.gridToWorld(x, y)));
        }
        break;
    }
  });

  return game;
}
