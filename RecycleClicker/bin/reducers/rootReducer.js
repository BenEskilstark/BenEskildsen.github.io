'use strict';

var _require = require('./burnOrRecycleReducer'),
    burnOrRecycleReducer = _require.burnOrRecycleReducer;

var _require2 = require('./employeeReducer'),
    employeeReducer = _require2.employeeReducer;

var _require3 = require('./tickReducer'),
    tickReducer = _require3.tickReducer;

var _require4 = require('./trashReducer'),
    trashReducer = _require4.trashReducer;

var _require5 = require('./uiReducer'),
    uiReducer = _require5.uiReducer;

var _require6 = require('./researchOrLobbyReducer'),
    researchOrLobbyReducer = _require6.researchOrLobbyReducer;

var _require7 = require('./tickerReducer'),
    tickerReducer = _require7.tickerReducer;

var _require8 = require('../state/initState'),
    initState = _require8.initState;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START':
      {
        // const stateCookie = parseInt(localStorage.getItem('state')) || 0;
        return state;
      }
    case 'CLEAR_LOCAL_STORAGE':
      localStorage.clear();
      return state;
    case 'TICK':
      return tickReducer(state, action);
    case 'ADD_TRASH':
    case 'SET_TRASH_MULTIPLIER':
      return trashReducer(state, action);
    case 'BURN':
    case 'FASTER_BURN':
    case 'RECYCLE':
      return burnOrRecycleReducer(state, action);
    case 'HIRE':
    case 'SET_WAGE':
    case 'PAY_CONTRACTOR':
    case 'PAY_EMPLOYEE':
    case 'NEED_PAY':
    case 'ABOUT_TO_LEAVE':
    case 'QUIT':
      return employeeReducer(state, action);
    case 'SELECT_ROLE':
      return uiReducer(state, action);
    case 'RESEARCH':
    case 'RESEARCH_GREEDY':
    case 'RESEARCH_GOOD':
    case 'LOBBY':
    case 'LOBBY_GOOD':
    case 'LOBBY_GREEDY':
    case 'REMOVE_JUST_RESEARCHED':
      return researchOrLobbyReducer(state, action);
    case 'TICKER':
      return tickerReducer(state, action);
  }
  return state;
};

module.exports = { rootReducer: rootReducer };