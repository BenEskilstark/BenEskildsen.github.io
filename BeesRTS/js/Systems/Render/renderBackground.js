

function renderBackground(game, ctx) {
  const worldSize = game.gridToWorld(game.world.width, game.world.height);
  iterateMatrix(game.world.grid, (cell, x, y) => {
    if (!cell || !cell.type) {
      return;
    }
    switch (cell.type) {
      case 'honeycomb':
        const cellCanvasWidth = game.canvas.width / game.world.viewWidth * 1.2;
        const cellCanvasHeight = game.canvas.height / game.world.viewHeight * 1.3;
        const size = cellCanvasHeight * 0.55; // TODO this constant depends on the
        // relative sizing between grid width and height -- hexes are taller than they
        // are wide -- and I'm not sure how to keep it in sync with the grid size...

        let spriteIndex = cell.spriteIndex;
        if (cell.contains && cell.contains.type == 'honey') {
          spriteIndex = 3;
        }

        const centerCanvas = game.gridToCanvas(x, y);
        if (cell.selected) {
          ctx.strokeStyle = "orange";
          ctx.beginPath();
          ctx.arc(
            centerCanvas.x, centerCanvas.y,
            size,
            0, Math.PI * 2
          );
          ctx.stroke();
        }

        ctx.drawImage(
          game.sprites.honeycomb[spriteIndex],
          centerCanvas.x - cellCanvasWidth/2, centerCanvas.y - cellCanvasHeight/2,
          cellCanvasWidth, cellCanvasHeight,
        );


        if (cell.contains && cell.contains.stage) {
          if (cell.contains.stage == 'egg') {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.arc(
              centerCanvas.x, centerCanvas.y,
              size * 0.25,
              0, Math.PI * 2
            );
          } else if (cell.contains.stage == 'larva') {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.arc(
              centerCanvas.x, centerCanvas.y,
              size * (0.5 + cell.contains.fed / 1000),
              0, Math.PI * 2
            );
          } else if (cell.contains.stage == 'pupa') {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.arc(
              centerCanvas.x, centerCanvas.y,
              size * 0.8,
              0, Math.PI * 2
            );
          }
          ctx.fill();
          ctx.stroke();
        }
        break;
      case 'flower':
          const flowerCoord = game.gridToCanvas(cell.pos.x, cell.pos.y);
          ctx.drawImage(
            game.sprites.flower[cell.spriteIndex],
            flowerCoord.x, flowerCoord.y,
            worldSize.x/15, worldSize.y/10,
          );
        break;
    }
  });

}
