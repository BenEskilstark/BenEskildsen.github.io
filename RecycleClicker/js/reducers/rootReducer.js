// @flow

const {burnOrRecycleReducer} = require('./burnOrRecycleReducer');
const {employeeReducer} = require('./employeeReducer');
const {tickReducer} = require('./tickReducer');
const {trashReducer} = require('./trashReducer');
const {uiReducer} = require('./uiReducer');
const {researchOrLobbyReducer} = require('./researchOrLobbyReducer');
const {tickerReducer} = require('./tickerReducer');

const {initState} = require('../state/initState');

import type {State, Action} from '../types';

const rootReducer = ((state: State, action: Action): State => {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START': {
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
      return {
        ...state,
        config: {
          ...state.config,
          [action.config]: action.value,
        },
      };
  }
  return state;
});

module.exports = {rootReducer}
