'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./moveReducer.js'),
    moveReducer = _require.moveReducer;

var _require2 = require('./reverseTimeReducer.js'),
    reverseTimeReducer = _require2.reverseTimeReducer;

var _require3 = require('./editorReducer.js'),
    editorReducer = _require3.editorReducer;

var _require4 = require('./levelCreationReducer.js'),
    levelCreationReducer = _require4.levelCreationReducer;

var _require5 = require('./rumbleReducer.js'),
    rumbleReducer = _require5.rumbleReducer;

var _require6 = require('./modalReducer.js'),
    modalReducer = _require6.modalReducer;

var _require7 = require('./levelReducer.js'),
    levelReducer = _require7.levelReducer;

var _require8 = require('../state/initState.js'),
    initState = _require8.initState;

var _require9 = require('../state/allLevels.js'),
    levels = _require9.levels;

var rootReducer = function rootReducer(state, action) {
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
    case 'START':
      {
        var levelCookie = parseInt(localStorage.getItem('level')) || 0;
        var levelNum = action.level - 1 || levelCookie;
        return _extends({}, state, {
          mainMenu: false,
          editor: false,
          level: _extends({}, levels[levelNum](), {
            level: levelNum
          }),
          dispatch: action.dispatch
        });
      }
    case 'CLEAR_LOCAL_STORAGE':
      localStorage.clear();
      return state;
    case 'CUSTOM':
      var levelData = JSON.parse(document.getElementById('levelPaste').value);
      levelData.level = Infinity;
      console.log(levelData);
      return _extends({}, state, {
        custom: true,
        mainMenu: false,
        level: levelData,
        dispatch: action.dispatch
      });
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
};

module.exports = { rootReducer: rootReducer };