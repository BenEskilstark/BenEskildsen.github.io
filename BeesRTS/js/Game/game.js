
/**
 *  The game object contains everything needed to recreate the game state
 *  including which mouse/keyboard buttons are down. Plus it has some helper
 *  functions for converting between the different canvas, world, and grid
 *  coordinate systems
 */
function initGame(canvasWidth = 700, canvasHeight = 700) {
  const game = {
    canvas: {
      id: 'canvas',
      width: canvasWidth,
      height: canvasHeight,
    },
    keys: {
      // keys that are down are true here
      // but handlers will also be here
    },
    mouse: {},

    player: {
      color: 'red'
    },

    stepMillis: 30,
    step: 0,
    world: initializeWorld(canvasWidth, canvasHeight),

    sprites: {},

  };


  //////////////////////////////////////////////////////////////////////////////
  // Helpers
 addCoordHelpers(game);

 loadSprites(game);

  /**
   * NOTE: the system checking for clicks and keypresses needs to handle
   * deleting the key/mouse down properties when it is done
   */
  addEventHandlers(game);

  populateWorld(game);
  return game;
}
