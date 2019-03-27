'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../state/allLevels.js'),
    levels = _require.levels;

var levelReducer = function levelReducer(state, action) {
  switch (action.type) {
    case 'RESET':
      {
        var _state$level = state.level,
            walls = _state$level.walls,
            buttons = _state$level.buttons,
            agents = _state$level.agents;

        walls.forEach(function (wall) {
          return wall.doorID ? wall.isOpen = true : null;
        });
        buttons.forEach(function (button) {
          return button.pressed = false;
        });
        return _extends({}, state, {
          modal: null,
          level: _extends({}, state.level, {
            prevTime: -1,
            numReversals: 0,
            time: 0,
            walls: state.level.walls,
            buttons: state.level.buttons,
            agents: [{ history: [agents[agents.length - 1].history[0]] }],
            target: _extends({}, state.level.target, {
              reached: 0
            }),
            moveAttempts: {
              left: false,
              right: false,
              up: false,
              down: false,
              revTime: false
            }
          })
        });
      }
    case 'NEXT_LEVEL':
      {
        var levelNum = state.level.level + 1;
        localStorage.setItem('level', '' + levelNum);
        var dispatch = state.dispatch;
        if (levelNum >= levels.length) {
          return {
            mainMenu: true,
            editor: false,
            level: null,
            modal: {
              text: 'You beat all the levels! You truly understand time travel.',
              buttons: [{ text: 'Dismiss', onClick: function onClick() {
                  return dispatch({ type: 'DISMISS_MODAL' });
                } }]
            }
          };
        }
        return _extends({}, state, {
          level: _extends({}, levels[levelNum](), {
            level: levelNum
          })
        });
      }
    case 'SET_REACHED':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          target: _extends({}, state.level.target, {
            reached: action.reached
          })
        })
      });
  }
};

module.exports = { levelReducer: levelReducer };