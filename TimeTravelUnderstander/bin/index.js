'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var Game = require('./ui/Game.react');
var React = require('react');
var ReactDOM = require('react-dom');

var _require2 = require('./reducers/rootReducer.js'),
    rootReducer = _require2.rootReducer;

var _require3 = require('./systems/rumbleSystem.js'),
    initRumbleSystem = _require3.initRumbleSystem;

var _require4 = require('./systems/reverseTimeAnimationSystem.js'),
    initReverseTimeAnimationSystem = _require4.initReverseTimeAnimationSystem;

var _require5 = require('./systems/levelCompleteSystem.js'),
    initLevelCompleteSystem = _require5.initLevelCompleteSystem;

var _require6 = require('./systems/levelTutorialSystem.js'),
    initLevelTutorialSystem = _require6.initLevelTutorialSystem;

var store = createStore(rootReducer);
window.store = store; // useful for debugging

store.dispatch({ type: 'NEW' });

// don't let the Reset button steal focus when you click it
// (when the button gets focus then pressing SPACE presses the button
// which we don't want!!)
// EXCEPT we still want to be able to use our dropdowns >.< so add them here
document.onmousedown = function (ev) {
  if (ev && ev.srcElement && ev.srcElement.id == 'buttonDropdown' || ev.srcElement.id == 'levelPaste' || ev.srcElement.id == 'sidebar') {
    return;
  }
  ev.preventDefault();
};

ReactDOM.render(React.createElement(Game, { store: store }), document.getElementById('container'));

// systems
initRumbleSystem(store);
initReverseTimeAnimationSystem(store);
initLevelCompleteSystem(store);
initLevelTutorialSystem(store);

// key event handlers
document.onkeydown = function (ev) {
  var state = store.getState();
  if (state.modal != null) {
    return; // don't let you move while a modal is showing
  }
  if (state.level && state.level.reverseTime && state.level.reverseTime.shouldAnimate) {
    return; // don't let you move while reversing time
  }
  switch (ev.keyCode) {
    case 32:
      // space (may not work in firefox because it's printable?)
      store.dispatch({ type: 'REVERSE_TIME' });
      break;
    case 37:
      // left
      store.dispatch({ type: 'MOVE', dir: { x: -1 }, key: 'left' });
      break;
    case 38:
      // up
      store.dispatch({ type: 'MOVE', dir: { y: -1 }, key: 'up' });
      break;
    case 39:
      // right
      store.dispatch({ type: 'MOVE', dir: { x: 1 }, key: 'right' });
      break;
    case 40:
      // down
      store.dispatch({ type: 'MOVE', dir: { y: 1 }, key: 'down' });
      break;
  }
};