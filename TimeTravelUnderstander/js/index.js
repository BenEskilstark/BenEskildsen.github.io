// @flow

const {createStore} = require('redux');
const Game = require('./ui/Game.react');
const React = require('react');
const ReactDOM = require('react-dom');
const {rootReducer} = require('./reducers/rootReducer.js');
const {initRumbleSystem} = require('./systems/rumbleSystem.js');
const {initReverseTimeAnimationSystem} = require('./systems/reverseTimeAnimationSystem.js');
const {initLevelCompleteSystem} = require('./systems/levelCompleteSystem.js');
const {initLevelTutorialSystem} = require('./systems/levelTutorialSystem.js');

const store = createStore(rootReducer);
window.store = store; // useful for debugging

store.dispatch({type: 'NEW'});

// don't let the Reset button steal focus when you click it
// (when the button gets focus then pressing SPACE presses the button
// which we don't want!!)
// EXCEPT we still want to be able to use our dropdowns >.< so add them here
document.onmousedown = (ev) => {
  if (
    ev && ev.srcElement &&
    (ev.srcElement.id == 'buttonDropdown') ||
    (ev.srcElement.id == 'levelPaste') ||
    (ev.srcElement.id == 'sidebar')
  ) {
    return;
  }
  ev.preventDefault();
}

ReactDOM.render(
  <Game store={store} />,
  document.getElementById('container'),
);

// systems
initRumbleSystem(store);
initReverseTimeAnimationSystem(store);
initLevelCompleteSystem(store);
initLevelTutorialSystem(store);

// key event handlers
document.onkeydown = (ev) => {
  const state = store.getState();
  if (state.modal != null) {
    return; // don't let you move while a modal is showing
  }
  if (state.level && state.level.reverseTime && state.level.reverseTime.shouldAnimate) {
    return; // don't let you move while reversing time
  }
  switch (ev.keyCode) {
    case 32: // space (may not work in firefox because it's printable?)
      store.dispatch({type: 'REVERSE_TIME'});
      break;
    case 37: // left
      store.dispatch({type: 'MOVE', dir: {x: -1}, key: 'left'});
      break;
    case 38: // up
      store.dispatch({type: 'MOVE', dir: {y: -1}, key: 'up'});
      break;
    case 39: // right
       store.dispatch({type: 'MOVE', dir: {x: 1}, key: 'right'});
      break;
    case 40: // down
      store.dispatch({type: 'MOVE', dir: {y: 1}, key: 'down'});
      break;
  }
}
