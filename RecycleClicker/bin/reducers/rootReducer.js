'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var _require8 = require('../initState'),
    initState = _require8.initState;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START':
      {
        // const stateCookie = parseInt(localStorage.getItem('state')) || 0;
        return state;
      }
    case 'RESTART':
      return initState();
    case 'GAME_OVER':
      return _extends({}, state, {
        ui: _extends({}, state.ui, {
          gameOver: action.win ? 'win' : 'lose'
        })
      });
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
    case 'CHEAPER_RECYCLING':
      return burnOrRecycleReducer(state, action);
    case 'HIRE':
    case 'SET_WAGE':
    case 'PAY_CONTRACTOR':
    case 'PAY_EMPLOYEE':
    case 'NEED_PAY':
    case 'ABOUT_TO_LEAVE':
    case 'QUIT':
    case 'CONTRACTOR_OVER_TIME':
    case 'CONVERT_WORKERS':
      return employeeReducer(state, action);
    case 'SELECT_ROLE':
    case 'SET_CARD_VISIBILITY':
    case 'SET_GOD_MODE':
    case 'FLICKER_CARD':
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
    case 'SET_CONFIG_VALUE':
      return _extends({}, state, {
        config: _extends({}, state.config, _defineProperty({}, action.config, action.value))
      });
    case 'SET_SYSTEM_VALUE':
      return _extends({}, state, {
        systems: _extends({}, state.systems, _defineProperty({}, action.system, _extends({}, action.system, _defineProperty({}, action.property, action.value))))
      });
  }
  return state;
};

module.exports = { rootReducer: rootReducer };