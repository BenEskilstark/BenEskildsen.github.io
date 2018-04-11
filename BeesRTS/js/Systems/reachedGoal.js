
function reachedGoalSystem(game) {
  for (let i = 0, entity; entity = game.world.entities[i]; i++) {
    switch (entity.type) {
      case 'bee':
        if ( // close enough to goal, stop
          entity.goal &&
          Math.abs(entity.goal.x - entity.pos.x) < entity.radius/1.5 &&
          Math.abs(entity.goal.y - entity.pos.y) < entity.radius/1.5
        ) {
          entity.accel = {x: 0, y: 0};
          entity.velocity = {x: 0, y: 0};
          const gridCoord = game.worldToGrid(entity.goal.x, entity.goal.y);

          // set next goal
          entity.goalIndex = (entity.goalIndex + 1) % entity.goalsQueue.length;
          entity.goal = entity.goalsQueue[entity.goalIndex];
          const xDist = entity.goal.x - entity.pos.x;
          const yDist = entity.goal.y - entity.pos.y;
          const dist = Math.sqrt(xDist * xDist + yDist * yDist);
          entity.velocity = { // TODO this doesn't actually clamp total speed to entity.speed :C
            x: (xDist / dist) * entity.speed,
            y: (yDist / dist) * entity.speed,
          };

          const cell = game.world.grid[gridCoord.x][gridCoord.y];
          if (!cell) break;

          // if carrying nectar and at a honeycomb, put in honey
          if (!cell.contains && entity.carrying && entity.carrying.type == 'nectar') {
            cell.contains = {type: 'honey', amount: entity.carrying.amount};
            entity.carrying = null;
            break;
          }

          // if goal is at a flower, take some nectar
          if (cell.type == 'flower' && !entity.carrying) {
            entity.carrying = {type: 'nectar', amount: cell.nectarRate};
          }

          // if goal is at a honeycomb, take some honey
          if (cell.contains && cell.contains.type == 'honey' && !entity.carrying) {
            const honeyTaken = 100;
            const honeyLeft = Math.max(0, cell.contains.amount - honeyTaken);
            entity.carrying = {type: 'honey', amount: honeyTaken};
            cell.contains.amount = honeyLeft;
            if (cell.contains && cell.contains.amount == 0) {
              cell.contains = null;
            }
            break;
          }

          if (!entity.carrying) break;

          // if carrying honey and at a larva, feed it
          if (entity.carrying.type == 'honey') {
            if (cell.contains && cell.contains.stage == 'larva') {
              cell.contains.fed += entity.carrying.amount;
              entity.carrying = null;
            } else if (!cell.contains) {
              cell.contains = {type: 'honey', amount: entity.carrying.amount};
              entity.carrying = null;
            }
          }

        }
        break;
    }
  }

  return game;
}
