'use strict';

var setControls = function setControls(store, gameRunner) {
  document.onkeydown = function (ev) {
    switch (ev.keyCode) {
      case 32:
        // space
        store.dispatch({ type: 'TOGGLE' });
        if (store.getState().running) {
          gameRunner.interval = gameRunner.start(store);
        } else {
          gameRunner.pause(gameRunner.interval);
        }
        break;
      case 38:
        // up
        store.dispatch({ type: 'ACCELERATE', player: 0 });
        break;
      case 37:
        // left
        store.dispatch({ type: 'TURN', dir: -1, player: 0 });
        break;
      case 39:
        // right
        store.dispatch({ type: 'TURN', dir: 1, player: 0 });
        break;
      case 87:
        // w
        store.dispatch({ type: 'ACCELERATE', player: 1 });
        break;
      case 65:
        // a left
        store.dispatch({ type: 'TURN', dir: -1, player: 1 });
        break;
      case 68:
        // d right
        store.dispatch({ type: 'TURN', dir: 1, player: 1 });
        break;
    }
  };

  document.onkeyup = function (ev) {
    switch (ev.keyCode) {
      case 38:
        // up
        store.dispatch({ type: 'DEACCELERATE', player: 0 });
        break;
      case 37:
        // left
        store.dispatch({ type: 'TURN', dir: 0, player: 0 });
        break;
      case 39:
        // right
        store.dispatch({ type: 'TURN', dir: 0, player: 0 });
        break;
      case 87:
        // w
        store.dispatch({ type: 'DEACCELERATE', player: 1 });
        break;
      case 65:
        // a left
        store.dispatch({ type: 'TURN', dir: 0, player: 1 });
        break;
      case 68:
        // d right
        store.dispatch({ type: 'TURN', dir: 0, player: 1 });
        break;
      // case 190: // period
      //   store.dispatch({type: 'fire', side: 'left', player: 0});
      //   break;
      // case 191: // forward slash
      //   store.dispatch({type: 'fire', side: 'right', player: 0});
      //   break;
      // case 81: // q
      //   store.dispatch({type: 'fire', side: 'left', player: 1});
      //   break;
      // case 69: // d
      //   store.dispatch({type: 'fire', side: 'right', player: 1});
      //   break;
    }
  };
};

module.exports = { setControls: setControls };