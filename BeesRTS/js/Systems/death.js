
function deathSystem(game) {
  game.world.entities = game.world.entities
    .filter(entity => entity.subtype == 'queen' || entity.age < 8000);

  return game;
}
