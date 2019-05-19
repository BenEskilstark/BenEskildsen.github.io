'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var uiReducer = function uiReducer(state, action) {
  switch (action.type) {
    case 'SELECT_ROLE':
      return _extends({}, state, {
        ui: _extends({}, state.ui, {
          selectedRole: action.role
        })
      });
    case 'SET_GOD_MODE':
      {
        var godMode = action.godMode !== undefined ? action.godMode : true;
        return _extends({}, state, {
          ui: _extends({}, state.ui, {
            godMode: godMode
          })
        });
      }
    case 'SET_CARD_VISIBILITY':
      {
        var visibility = action.visible !== undefined ? action.visible : true;
        return _extends({}, state, {
          ui: _extends({}, state.ui, _defineProperty({}, action.card, visibility))
        });
      }
    case 'FLICKER_CARD':
      {
        var _extends3;

        var card = action.card;
        var cardFlicker = card + 'Flicker';
        return _extends({}, state, {
          ui: _extends({}, state.ui, (_extends3 = {}, _defineProperty(_extends3, cardFlicker, state.ui[cardFlicker] + 1), _defineProperty(_extends3, card, !state.ui[card]), _extends3))
        });
      }
  }
  return state;
};

module.exports = { uiReducer: uiReducer };