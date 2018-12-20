'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var _require2 = require('./reducers/rootReducer'),
    rootReducer = _require2.rootReducer;

var Sidebar = require('./ui/Sidebar.react');
var React = require('react');
var ReactDOM = require('react-dom');

var _require3 = require('./settings'),
    TICK_TIME = _require3.TICK_TIME;

var _require4 = require('./controls'),
    setControls = _require4.setControls;

var _require5 = require('./render/render'),
    initCanvas = _require5.initCanvas,
    renderToCanvas = _require5.renderToCanvas;

var store = createStore(rootReducer);
window.store = store; // useful for debugging

var gameRunner = {
  interval: null,
  pause: function pause(interval) {
    return clearInterval(interval);
  },
  start: function start(store) {
    return setInterval(function () {
      return store.dispatch({ type: 'TICK' });
    }, TICK_TIME);
  }
};

setControls(store, gameRunner);

ReactDOM.render(React.createElement(Sidebar, { store: store }), document.getElementById('container'));

initCanvas();
store.subscribe(function () {
  return renderToCanvas(store.getState());
});
gameRunner.interval = gameRunner.start(store);