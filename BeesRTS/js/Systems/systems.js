
// Systems are just functions that take in a game object and then change the
// state of the game based on whatever that system is for (except render which
// just draws to a canvas and does not change game state at all).
// Theoretically these should be pure functions and the game object should be
// immutable, but in practice I think this would be more trouble than it's worth
// based on how I am attaching key/mouse listeners to the game object (which
// themselves write into the game as a side-effect :/ ) and so all these systems
// write their changes directly to the game state object and then return it.
// Should be fine for now..
function getSystems() {
  return {
    drag: dragSystem,
    selection: selectionSystem,
    setGoal: setGoalSystem,
    layEgg: layEggSystem,

    entityUpdate: entityUpdateSystem,
    death: deathSystem,
    reachedGoal: reachedGoalSystem,

    render: renderSystem,
    marquee: marqueeSystem,
  }
}

function stepSystems(game, systems) {
  if (game.paused) {
    return;
  }
  game.step++;
  forEachObject(systems, (system) => {
    game = system(game);
  });
}
