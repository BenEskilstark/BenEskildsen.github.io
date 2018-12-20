'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var _require2 = require('./reducers'),
    rootReducer = _require2.rootReducer;

var _require3 = require('./render'),
    renderToCanvas = _require3.renderToCanvas;

var _require4 = require('./controls'),
    setControls = _require4.setControls;

var store = createStore(rootReducer);
store.subscribe(function () {
  return renderToCanvas(store.getState());
});
window.store = store; // useful to debugging

var gameRunner = {
  interval: setInterval(function () {
    return store.dispatch({ type: 'tick' });
  }, 40),
  pause: function pause(interval) {
    return clearInterval(interval);
  },
  start: function start(store) {
    return setInterval(function () {
      return store.dispatch({ type: 'tick' });
    }, 40);
  }
};

setControls(store, gameRunner);