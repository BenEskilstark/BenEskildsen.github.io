const {createStore} = require('redux');
const {rootReducer} = require('./reducers/rootReducer');
const Sidebar = require('./ui/Sidebar.react');
const React = require('react');
const ReactDOM = require('react-dom');
const {TICK_TIME} = require('./settings');
const {setControls} = require('./controls');
const {initCanvas, renderToCanvas} = require('./render/render');

const store = createStore(rootReducer);
window.store = store; // useful for debugging

const gameRunner = {
  interval: null,
  pause: (interval) => clearInterval(interval),
  start: (store) => setInterval(() => store.dispatch({type: 'TICK'}), TICK_TIME),
};

setControls(store, gameRunner);

ReactDOM.render(
  <Sidebar store={store} />,
  document.getElementById('container'),
);

initCanvas();
store.subscribe(() => renderToCanvas(store.getState()));
gameRunner.interval = gameRunner.start(store);
