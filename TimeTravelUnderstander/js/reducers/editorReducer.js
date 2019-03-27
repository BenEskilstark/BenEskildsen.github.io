// @flow

const {initEmptyLevel} = require('../state/emptyLevel.js');

import type {State, Action} from '../types';

const editorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'EDITOR':
      return {
        ...state,
        mainMenu: false,
        editor: {
          selectedCell: null,
          doorSelected: false,
        },
        level: initEmptyLevel(0),
      };
    case 'SELECT_CELL':
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedCell: {x: action.x, y: action.y},
        },
      };
    case 'DOOR_SELECT':
      return {
        ...state,
        editor: {
          ...state.editor,
          doorSelected: !state.editor.doorSelected,
        }
      }
    case 'DELETE_SELECT':
      return {
        ...state,
        editor: {
          ...state.editor,
          deleteSelected: !state.editor.deleteSelected,
        }
      }
    case 'OUTPUT_LEVEL':
      if (state.level.time != 0) {
        console.error('you must RESET before OUTPUT');
      } else {
        console.log(JSON.stringify(state.level));
      }
      return state;
  }
};

module.exports = {editorReducer};
