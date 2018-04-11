function populateWorld(game) {
  const world = game.world;
  // foreground
  const worldCoord = game.gridToWorld(7, 34);
  world.entities.push(makeGrass({x: 0, y: 970}));
  world.entities.push(makeBee('queen', worldCoord));

  // nest
  for (let x = 4; x <= 8; x++) {
    for (let y = 20; y <= 35; y++) {
      world.grid[x][y] = makeHoneycomb();
      if ((x == 6 && y <= 34) || (x == 7 && y == 33)) {
        world.grid[x][y].contains = {type: 'honey', amount: 100};
      }
    }
  }

  // position on the grid         // where it renders (in grid coords :/)
  world.grid[16][27] = makeFlower({x: 14, y: 25});

  return world;
}
