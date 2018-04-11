
function renderForeground(game, ctx) {
  const worldSize = game.gridToWorld(game.world.width, game.world.height);
  for (let i = 0, entity; entity = game.world.entities[i]; i++) {
    switch (entity.type) {
      case 'bee':
        const canvasCoord = game.worldToCanvas(entity.pos.x, entity.pos.y);

        if (entity.selected) {
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.arc(
            canvasCoord.x, canvasCoord.y,
            entity.radius,
            0, Math.PI * 2
          );
          ctx.strokeStyle = game.player.color;
          ctx.stroke();
          ctx.cl
        }

        ctx.save();
        ctx.resetTransform();
        ctx.translate(canvasCoord.x, canvasCoord.y);
        ctx.rotate(entity.angle);
        ctx.drawImage(
          game.sprites.bee[entity.spriteIndex],
          -entity.radius, -entity.radius,
          entity.radius*2, entity.radius*2,
        );
        ctx.restore();

        break;
      case 'grass':
          const grassCoord = game.worldToCanvas(entity.pos.x, entity.pos.y);
          ctx.drawImage(
            game.sprites.grass[entity.spriteIndex],
            grassCoord.x, grassCoord.y,
            worldSize.x * 0.45, worldSize.y/3,
          );
        break;
    }
  }
}
