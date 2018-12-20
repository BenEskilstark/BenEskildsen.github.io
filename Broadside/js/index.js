const {createStore} = require('redux');
const {rootReducer} = require('./reducers');
const {renderToCanvas} = require('./render');
const {setControls} = require('./controls');

const store = createStore(rootReducer);
store.subscribe(() => renderToCanvas(store.getState()));
window.store = store; // useful to debugging

const gameRunner = {
  interval: setInterval(() => store.dispatch({type: 'tick'}), 40),
  pause: (interval) => clearInterval(interval),
  start: (store) => setInterval(() => store.dispatch({type: 'tick'}), 40),
};

setControls(store, gameRunner);
