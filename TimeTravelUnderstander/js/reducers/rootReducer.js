// @flow

const {moveReducer} = require('./moveReducer.js');
const {reverseTimeReducer} = require('./reverseTimeReducer.js');
const {editorReducer} = require('./editorReducer.js');
const {levelCreationReducer} = require('./levelCreationReducer.js');
const {rumbleReducer} = require('./rumbleReducer.js');
const {modalReducer} = require('./modalReducer.js');
const {levelReducer} = require('./levelReducer.js');
const {initState} = require('../state/initState.js');
const {levels} = require('../state/allLevels.js');

import type {State, Action} from '../types';

const rootReducer = ((state: State, action: Action): State => {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'MOVE':
      return moveReducer(state, action);
    case 'REVERSE_TIME':
    case 'START_REVERSE_TIME_ANIMATION':
    case 'REVERSE_TIME_ANIMATION':
      return reverseTimeReducer(state, action);
    case 'BACK_TO_MAIN_MENU':
      return initState();
    case 'START': {
      const levelCookie = parseInt(localStorage.getItem('level')) || 0;
      const levelNum = action.level - 1 || levelCookie;
      return {
        ...state,
        mainMenu: false,
        editor: false,
        level: {
          ...levels[levelNum](),
          level: levelNum,
        },
        dispatch: action.dispatch,
      };
    }
    case 'CLEAR_LOCAL_STORAGE':
      localStorage.clear();
      return state;
    case 'CUSTOM':
      const levelData = JSON.parse(document.getElementById('levelPaste').value);
      levelData.level = Infinity;
      console.log(levelData);
      return {
        ...state,
        custom: true,
        mainMenu: false,
        level: levelData,
        dispatch: action.dispatch,
      }
    case 'RESET':
    case 'NEXT_LEVEL':
    case 'SET_REACHED':
      return levelReducer(state, action);
    case 'EDITOR':
    case 'SELECT_CELL':
    case 'DOOR_SELECT':
    case 'DELETE_SELECT':
    case 'OUTPUT_LEVEL':
      return editorReducer(state, action);
    case 'ADD_WALL':
    case 'ADD_DOOR':
    case 'DELETE_WALL':
    case 'ADD_BUTTON':
    case 'SET_STEP_LIMIT':
    case 'SET_START_LOCATION':
    case 'SET_TARGET_LOCATION':
      return levelCreationReducer(state, action);
    case 'START_RUMBLE':
    case 'RUMBLE':
      if (!state.level) {
        return state;
      }
      return rumbleReducer(state, action);
    case 'SET_MODAL':
    case 'DISMISS_MODAL':
      return modalReducer(state, action);
  }
  return state;
});

module.exports = {rootReducer}
