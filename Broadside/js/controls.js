
const setControls = (store, gameRunner) => {
  document.onkeydown = (ev) => {
    switch (ev.keyCode) {
      case 32: // space
        store.dispatch({type: 'toggle'});
        if (store.getState().running) {
          gameRunner.interval = gameRunner.start(store);
        } else {
          gameRunner.pause(gameRunner.interval);
        }
        break;
      case 37: // left
        store.dispatch({type: 'turn', dir: -1, ship: 'ship1'});
        break;
      case 39: // right
        store.dispatch({type: 'turn', dir: 1, ship: 'ship1'});
        break;
      case 65: // a left
        store.dispatch({type: 'turn', dir: -1, ship: 'ship2'});
        break;
      case 68: // d right
        store.dispatch({type: 'turn', dir: 1, ship: 'ship2'});
        break;
    }
  };

  document.onkeyup = (ev) => {
    switch (ev.keyCode) {
      case 37: // left
        store.dispatch({type: 'turn', dir: 0, ship: 'ship1'});
        break;
      case 39: // right
        store.dispatch({type: 'turn', dir: 0, ship: 'ship1'});
        break;
      case 65: // a left
        store.dispatch({type: 'turn', dir: 0, ship: 'ship2'});
        break;
      case 68: // d right
        store.dispatch({type: 'turn', dir: 0, ship: 'ship2'});
        break;
      case 190: // period
        store.dispatch({type: 'fire', side: 'left', ship: 'ship1'});
        break;
      case 191: // forward slash
        store.dispatch({type: 'fire', side: 'right', ship: 'ship1'});
        break;
      case 81: // q
        store.dispatch({type: 'fire', side: 'left', ship: 'ship2'});
        break;
      case 69: // d
        store.dispatch({type: 'fire', side: 'right', ship: 'ship2'});
        break;
    }
  };

}

module.exports = {setControls};
