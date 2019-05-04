'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buttonReducer = function buttonReducer(state, action) {
  var _state$config = state.config,
      trashPerBurn = _state$config.trashPerBurn,
      revenuePerBurn = _state$config.revenuePerBurn,
      trashPerRecycle = _state$config.trashPerRecycle,
      revenuePerRecycle = _state$config.revenuePerRecycle;

  switch (action.type) {
    case 'BURN':
      return _extends({}, state, {
        trash: _extends({}, state.trash, {
          cur: state.trash.cur - trashPerBurn
        }),
        burn: _extends({}, state.burn, {
          cur: state.burn.cur + trashPerBurn
        }),
        money: _extends({}, state.money, {
          cur: state.money.cur + revenuePerBurn
        })
      });
    case 'RECYCLE':
      return _extends({}, state, {
        trash: _extends({}, state.trash, {
          cur: state.trash.cur - trashPerRecycle
        }),
        recycle: _extends({}, state.recycle, {
          cur: state.recycle.cur + trashPerRecycle
        }),
        money: _extends({}, state.money, {
          cur: state.money.cur + revenuePerRecycle
        })
      });
    case 'HIRE':
      return _extends({}, state, {
        employees: _extends({}, state.employees, _defineProperty({
          cur: state.employees.cur + 1
        }, action.role, _extends({}, state.employees[action.role], {
          cur: state.employees[action.role] + 1
        })))
      });
  }
};

module.exports = { buttonReducer: buttonReducer };