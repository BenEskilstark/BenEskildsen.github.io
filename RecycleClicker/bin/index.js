'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var Game = require('./ui/Game.react');
var React = require('react');
var ReactDOM = require('react-dom');

var _require2 = require('./reducers/rootReducer'),
    rootReducer = _require2.rootReducer;

var _require3 = require('./systems/employeeClickSystem'),
    initEmployeeClickSystem = _require3.initEmployeeClickSystem;

var _require4 = require('./systems/trashSystem'),
    initTrashSystem = _require4.initTrashSystem;

var _require5 = require('./systems/researchAndLobbySystem'),
    initResearchAndLobbySystem = _require5.initResearchAndLobbySystem;

var _require6 = require('./systems/employeeNeedPaySystem'),
    initEmployeeNeedPaySystem = _require6.initEmployeeNeedPaySystem;

var _require7 = require('./systems/cardFlickerSystem'),
    initCardFlickerSystem = _require7.initCardFlickerSystem;

var _require8 = require('./systems/cardVisibilitySystem'),
    initCardVisibilitySystem = _require8.initCardVisibilitySystem;

var store = createStore(rootReducer);
window.store = store; // useful for debugging

store.dispatch({ type: 'START' });
store.dispatch({ type: 'TICKER', message: 'Welcome to An Inconvenient Clicker' });
store.dispatch({ type: 'TICKER', message: 'Please handle Earth\'s trash problem!' });

// set up systems
initEmployeeClickSystem(store);
initTrashSystem(store);
initEmployeeNeedPaySystem(store);
initResearchAndLobbySystem(store);
initCardFlickerSystem(store);
initCardVisibilitySystem(store);

var interval = setInterval(function () {
  return store.dispatch({ type: 'TICK' });
}, store.getState().config.msPerTick);

ReactDOM.render(React.createElement(Game, { store: store }), document.getElementById('container'));