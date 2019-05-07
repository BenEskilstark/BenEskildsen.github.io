'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var burnOrRecycleReducer = function burnOrRecycleReducer(state, action) {
  var _state$config = state.config,
      trashPerBurn = _state$config.trashPerBurn,
      revenuePerBurn = _state$config.revenuePerBurn,
      trashPerRecycle = _state$config.trashPerRecycle,
      revenuePerRecycle = _state$config.revenuePerRecycle;

  switch (action.type) {
    case 'BURN':
      {
        var num = action.num;

        if (state.trash.cur <= 0) {
          return state;
        }
        var nextTrash = Math.max(state.trash.cur - trashPerBurn * num, 0);
        return _extends({}, state, {
          trash: _extends({}, state.trash, {
            cur: nextTrash
          }),
          burn: _extends({}, state.burn, {
            cur: state.burn.cur + trashPerBurn * num
          }),
          money: _extends({}, state.money, {
            cur: state.money.cur + revenuePerBurn * num
          })
        });
      }
    case 'FASTER_BURN':
      {
        return _extends({}, state, {
          employees: _extends({}, state.employees, {
            Burner: _extends({}, state.employees.Burner, {
              clickRate: action.clickRate
            })
          })
        });
      }
    case 'RECYCLE':
      {
        var _num = action.num;

        if (state.trash.cur <= 0) {
          return state;
        }
        var _nextTrash = Math.max(state.trash.cur - trashPerRecycle * _num, 0);
        return _extends({}, state, {
          trash: _extends({}, state.trash, {
            cur: _nextTrash
          }),
          recycle: _extends({}, state.recycle, {
            cur: state.recycle.cur + trashPerRecycle * _num
          }),
          money: _extends({}, state.money, {
            cur: state.money.cur + revenuePerRecycle * _num
          })
        });
      }
    case 'CHEAPER_RECYCLING':
      return _extends({}, state, {
        config: _extends({}, state.config, {
          revenuePerRecycle: revenuePerRecycle + action.additionalRevenuePerRecycle
        })
      });
  }
};

module.exports = { burnOrRecycleReducer: burnOrRecycleReducer };