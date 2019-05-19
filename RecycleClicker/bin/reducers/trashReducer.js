'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var trashReducer = function trashReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRASH':
      return _extends({}, state, {
        trash: _extends({}, state.trash, {
          cur: state.trash.cur + action.trash
        })
      });
    case 'SET_TRASH_MULTIPLIER':
      return _extends({}, state, {
        config: _extends({}, state.config, {
          trashMultiplier: action.multiplier
        })
      });
  }
  return state;
};

module.exports = { trashReducer: trashReducer };