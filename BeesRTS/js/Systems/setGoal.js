
function setGoalSystem(game) {
  if (game.mouse.right && game.world.selected.length > 0 && !game.mouse.inMarquee) {
    // set goal to right-clicked location
    for (let i = 0, bee; bee = game.world.selected[i]; i++) {
      const goalsQueue = bee.goalsQueue;
      const worldPos = game.canvasToWorld(game.mouse.rightX, game.mouse.rightY);
      goalsQueue.push(worldPos);
      if (!bee.goal) {
        bee.goal = goalsQueue[bee.goalIndex];
        const xDist = bee.goal.x - bee.pos.x;
        const yDist = bee.goal.y - bee.pos.y;
        const dist = Math.sqrt(xDist * xDist + yDist * yDist);
        bee.velocity = { // TODO this doesn't actually clamp total speed to bee.speed :C
          x: (xDist / dist) * bee.speed,
          y: (yDist / dist) * bee.speed,
        };
      }
      // console.log(bee.velocity, Math.abs(bee.velocity.x) + Math.abs(bee.velocity.y));
    }

    // clean up mouse down
    delete game.mouse.right;
    delete game.mouse.rightUp;
  }
  return game;
}
