'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var max = Math.max,
    min = Math.min,
    floor = Math.floor,
    random = Math.random;


var employeeReducer = function employeeReducer(state, action) {
  switch (action.type) {
    case 'HIRE':
      {
        var _extends2;

        var _num = state.config.employeesPerHire;
        var role = state.ui.selectedRole;
        var _roleType = state.config.employees.includes(role) ? 'employee' : 'contractor';
        var _byRoleType = state.employees[_roleType];
        var _money = state.money;
        // hiring costs 2x the wage up front so you can't get free labor

        var _wage = _byRoleType.wage * 2;
        if (_wage > _money.cur) {
          return state;
        }
        var _numPaidWage = min(floor(_money.cur / _wage), _num);
        var wagePaid = _numPaidWage * _wage;

        return _extends({}, state, {
          money: _extends({}, state.money, {
            cur: _money.cur - wagePaid
          }),
          employees: _extends({}, state.employees, (_extends2 = {
            cur: state.employees.cur + _numPaidWage
          }, _defineProperty(_extends2, _roleType, _extends({}, state.employees[_roleType], {
            cur: state.employees[_roleType].cur + _numPaidWage,
            dontNeedPay: state.employees[_roleType].dontNeedPay + _numPaidWage
          })), _defineProperty(_extends2, role, _extends({}, state.employees[role], {
            cur: state.employees[role].cur + _numPaidWage
          })), _extends2))
        });
      }
    case 'SET_WAGE':
      return _extends({}, state, {
        employees: _extends({}, state.employees, _defineProperty({}, action.roleType, _extends({}, state.employees[action.roleType], {
          wage: action.wage
        })))
      });
    case 'PAY_CONTRACTOR':
    case 'PAY_EMPLOYEE':
      var roleType = action.type == 'PAY_EMPLOYEE' ? 'employee' : 'contractor';
      var employees = state.employees,
          money = state.money;
      var num = action.num;

      var byRoleType = employees[roleType];

      // can't pay if you can't afford the wage
      var wage = byRoleType.wage;
      if (wage > money.cur) {
        return state;
      }
      var numPaidWage = 0;
      var payableNum = min(floor(money.cur / wage), num);
      var nextAboutToLeave = max(byRoleType.aboutToLeave - payableNum, 0);
      numPaidWage = byRoleType.aboutToLeave - nextAboutToLeave;
      var nextNeedPay = max(byRoleType.needPay - (payableNum - numPaidWage), 0);
      numPaidWage += byRoleType.needPay - nextNeedPay;
      var nextDontNeedPay = byRoleType.dontNeedPay + numPaidWage;

      var paidWage = numPaidWage * wage;

      return _extends({}, state, {
        money: _extends({}, money, {
          cur: money.cur - paidWage
        }),
        employees: _extends({}, employees, _defineProperty({}, roleType, _extends({}, byRoleType, {
          aboutToLeave: nextAboutToLeave,
          needPay: nextNeedPay,
          dontNeedPay: nextDontNeedPay
        })))
      });
    case 'NEED_PAY':
      {
        var _roleType2 = action.roleType;
        var _employees = state.employees;

        var _byRoleType2 = state.employees[_roleType2];

        // employees leave by role, randomly -- IN PLACE!
        var roles = state.config[_roleType2 + 's'];
        var numQuitting = _byRoleType2.aboutToLeave;
        var toQuit = numQuitting;
        var numQuit = 0;
        var i = Math.floor(Math.random() * roles.length); // randomize who quits
        var count = 0;
        while (toQuit > 0 && count < roles.length) {
          var _role = roles[i];
          var curInRole = _employees[_role].cur;
          _employees[_role].cur = max(_employees[_role].cur - toQuit, 0);
          numQuit += curInRole - _employees[_role].cur;
          toQuit = numQuitting - numQuit;
          count++;
          i = (i + 1) % roles.length;
        }

        return _extends({}, state, {
          employees: _extends({}, state.employees, _defineProperty({
            cur: state.employees.cur - _byRoleType2.aboutToLeave
          }, _roleType2, _extends({}, _byRoleType2, {
            quit: _byRoleType2.quit + numQuitting,
            aboutToLeave: _byRoleType2.needPay,
            needPay: _byRoleType2.dontNeedPay,
            dontNeedPay: 0,
            cur: _byRoleType2.cur - _byRoleType2.aboutToLeave
          })))
        });
      }
    case 'CONTRACTOR_OVER_TIME':
      {
        return _extends({}, state, {
          config: _extends({}, state.config, {
            contractorNeedPayInterval: state.config.contractorNeedPayInterval * 1.5
          })
        });
      }
    case 'CONVERT_WORKERS':
      {
        var _extends6;

        return _extends({}, state, {
          employees: _extends({}, state.employees, (_extends6 = {}, _defineProperty(_extends6, action.roleFrom, _extends({}, state.employees[action.roleFrom], {
            cur: 0
          })), _defineProperty(_extends6, action.roleTo, _extends({}, state.employees[action.roleTo], {
            cur: state.employees[action.roleTo].cur + state.employees[action.roleFrom].cur
          })), _extends6))
        });
      }
  }
  return state;
};

module.exports = { employeeReducer: employeeReducer };