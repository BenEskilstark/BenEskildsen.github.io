'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var random = Math.random,
    round = Math.round;


var OFFSET = 6;

var rumbleReducer = function rumbleReducer(state, action) {
  switch (action.type) {
    case 'START_RUMBLE':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          rumble: _extends({}, state.level.rumble, {
            count: action.count
          })
        })
      });
    case 'RUMBLE':
      if (state.level.rumble.count == 0) {
        return _extends({}, state, {
          level: _extends({}, state.level, {
            rumble: _extends({}, state.level.rumble, {
              count: 0,
              offset: { x: 0, y: 0 },
              shouldRumble: false
            })
          })
        });
      }
      return _extends({}, state, {
        level: _extends({}, state.level, {
          rumble: _extends({}, state.level.rumble, {
            count: state.level.rumble.count - 1,
            offset: {
              x: round(random() * OFFSET) - OFFSET / 2,
              y: round(random() * OFFSET) - OFFSET / 2
            }
          })
        })
      });
  }
};

module.exports = { rumbleReducer: rumbleReducer };