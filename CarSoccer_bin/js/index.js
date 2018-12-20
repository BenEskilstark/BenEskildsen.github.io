const {createStore} = require('redux');
const {rootReducer} = require('./reducers');
const Game = require('./UI/Game.react');
const React = require('react');
const ReactDOM = require('react-dom');
const {TICK_TIME} = require('./settings');
const {setControls} = require('./controls');
const {renderToCanvas} = require('./render');

const store = createStore(rootReducer);
window.store = store; // useful for debugging

const gameRunner = {
  interval: null,
  pause: (interval) => clearInterval(interval),
  start: (store) => setInterval(() => store.dispatch({type: 'TICK'}), TICK_TIME),
};

setControls(store, gameRunner);

// ReactDOM.render(
//   <Game store={store} />,
//   document.getElementById('container'),
// );

store.subscribe(() => renderToCanvas(store.getState()));
gameRunner.interval = gameRunner.start(store);
