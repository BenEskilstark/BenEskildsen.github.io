
const setControls = (store, gameRunner) => {
  const canvas = document.getElementById('canvas');
  const rect = canvas.getBoundingClientRect();
  canvas.onmousedown = (ev) => {
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    if (ev.button == 0) { // left click
      store.dispatch({type: 'MOUSE_DOWN', x, y});
    }

    if (ev.button == 2) { // right click
      store.dispatch({type: 'MAYBE_SELECT', x, y});
    }
  };

  canvas.onmouseup = (ev) => {
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    if (ev.button == 0) { // left click
      store.dispatch({type: 'MOUSE_UP'});
    }

    if (ev.button == 2) { // right click
      store.dispatch({type: 'PLACE', x, y});
    }
  };

  // don't open the normal right-click menu
  canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());

  canvas.onmousemove = (ev) => {
    if (store.getState().view.dragging) {
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      store.dispatch({type: 'MOUSE_MOVE', x, y});
    }
  }

  canvas.onwheel = (ev) => {
    store.dispatch({type: 'ZOOM', out: ev.wheelDelta < 0 ? 1 : -1});
  }


  document.onkeydown = (ev) => {
    switch (ev.keyCode) {
      case 32: // space
        store.dispatch({type: 'TOGGLE'});
        if (store.getState().running) {
          gameRunner.interval = gameRunner.start(store);
        } else {
          gameRunner.pause(gameRunner.interval);
        }
        break;
      case 38: // up
        store.dispatch({type: 'ACCELERATE'});
        break;
      case 37: // left
        store.dispatch({type: 'TURN', dir: -1});
        break;
      case 39: // right
        store.dispatch({type: 'TURN', dir: 1});
        break;
    }
  };

  document.onkeyup = (ev) => {
    switch (ev.keyCode) {
      case 38: // up
        store.dispatch({type: 'DEACCELERATE'});
        break;
      case 37: // left
        store.dispatch({type: 'TURN', dir: 0});
        break;
      case 39: // right
        store.dispatch({type: 'TURN', dir: 0});
        break;
    }
  };

}

module.exports = {setControls};
