'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var uiReducer = function uiReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ROLE':
      return _extends({}, state, {
        ui: _extends({}, state.ui, {
          selectedRole: action.role
        })
      });
  }
  return state;
};

module.exports = { uiReducer: uiReducer };