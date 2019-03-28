'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../state/emptyLevel.js'),
    initEmptyLevel = _require.initEmptyLevel;

var _require2 = require('../state/vanceLevel.js'),
    vanceLevel = _require2.vanceLevel;

var editorReducer = function editorReducer(state, action) {
  switch (action.type) {
    case 'EDITOR':
      return _extends({}, state, {
        mainMenu: false,
        editor: {
          selectedCell: null,
          doorSelected: false
        },
        level: initEmptyLevel(0)
      });
    case 'SELECT_CELL':
      return _extends({}, state, {
        editor: _extends({}, state.editor, {
          selectedCell: { x: action.x, y: action.y }
        })
      });
    case 'DOOR_SELECT':
      return _extends({}, state, {
        editor: _extends({}, state.editor, {
          doorSelected: !state.editor.doorSelected
        })
      });
    case 'DELETE_SELECT':
      return _extends({}, state, {
        editor: _extends({}, state.editor, {
          deleteSelected: !state.editor.deleteSelected
        })
      });
    case 'OUTPUT_LEVEL':
      if (state.level.time != 0) {
        console.error('you must RESET before OUTPUT');
      } else {
        console.log(JSON.stringify(state.level));
      }
      return state;
  }
};

module.exports = { editorReducer: editorReducer };