// @flow

const {createStore} = require('redux');
const Game = require('./ui/Game.react');
const React = require('react');
const ReactDOM = require('react-dom');
const {rootReducer} = require('./reducers/rootReducer');

const {initEmployeeClickSystem} = require('./systems/employeeClickSystem');
const {initTrashSystem} = require('./systems/trashSystem');
const {initResearchAndLobbySystem} = require('./systems/researchAndLobbySystem');
const {initEmployeeNeedPaySystem} = require('./systems/employeeNeedPaySystem');

const store = createStore(rootReducer);
window.store = store; // useful for debugging

store.dispatch({type: 'START'});
store.dispatch({type: 'TICKER', message: 'Welcome to An Inconvenient Clicker'});
store.dispatch({type: 'TICKER', message: 'Please handle Earth\'s trash problem!'});

// set up systems
initEmployeeClickSystem(store);
initTrashSystem(store);
initEmployeeNeedPaySystem(store);
initResearchAndLobbySystem(store);

const interval = setInterval(
  () => store.dispatch({type: 'TICK'}),
  store.getState().config.msPerTick,
);

ReactDOM.render(
  <Game store={store} />,
  document.getElementById('container'),
);
