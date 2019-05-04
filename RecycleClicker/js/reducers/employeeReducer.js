// @flow

import type {State} from '../types';
const {max, min, floor, random} = Math;

const employeeReducer = (state: State, action): State => {
  switch (action.type) {
    case 'HIRE': {
      const {num} = action;
      const role = state.ui.selectedRole;
      const roleType = state.config.employees.includes(role) ? 'employee' : 'contractor';
      const byRoleType = state.employees[roleType];
      const {money} = state;
      // hiring costs the wage up front so you can't get free labor
      const wage = byRoleType.wage;
      if (wage > money.cur) {
        return state;
      }
      const numPaidWage = min(floor(money.cur / wage), num);
      const wagePaid = numPaidWage * wage;

      return {
        ...state,
        money: {
          ...state.money,
          cur: money.cur - wagePaid,
        },
        employees: {
          ...state.employees,
          cur: state.employees.cur + numPaidWage,
          [roleType]: {
            ...state.employees[roleType],
            cur: state.employees[roleType].cur + numPaidWage,
            dontNeedPay: state.employees[roleType].dontNeedPay + numPaidWage,
          },
          [role]: {
            ...state.employees[role],
            cur: state.employees[role].cur + numPaidWage,
          },
        },
      };
    }
    case 'SET_WAGE':
      return {
        ...state,
        employees: {
          ...state.employees,
          [action.roleType]: {
            ...state.employees[action.roleType],
            wage: action.wage,
          }
        },
      };
    case 'PAY_CONTRACTOR':
    case 'PAY_EMPLOYEE':
      const roleType = action.type == 'PAY_EMPLOYEE' ? 'employee' : 'contractor';
      const {employees, money} = state;
      const {num} = action;
      const byRoleType = employees[roleType];

      // can't pay if you can't afford the wage
      const wage = byRoleType.wage;
      if (wage > money.cur) {
        return state;
      }
      let numPaidWage = 0;
      const payableNum = min(floor(money.cur / wage), num);
      const nextAboutToLeave = max(byRoleType.aboutToLeave - payableNum, 0);
      numPaidWage = byRoleType.aboutToLeave - nextAboutToLeave;
      const nextNeedPay = max(byRoleType.needPay - (payableNum - numPaidWage), 0);
      numPaidWage += byRoleType.needPay - nextNeedPay;
      const nextDontNeedPay = byRoleType.dontNeedPay + numPaidWage;

      const paidWage = numPaidWage * wage;

      return {
        ...state,
        money: {
          ...money,
          cur: money.cur - paidWage,
        },
        employees: {
          ...employees,
          [roleType]: {
            ...byRoleType,
            aboutToLeave: nextAboutToLeave,
            needPay: nextNeedPay,
            dontNeedPay: nextDontNeedPay,
          },
        }
      };
    case 'NEED_PAY':{
      const {roleType} = action;
      const {employees} = state;
      const byRoleType = state.employees[roleType];

      // employees leave by role, randomly -- IN PLACE!
      const roles = state.config[roleType + 's']; // TODO shuffle this
      const numQuitting = byRoleType.aboutToLeave;
      let toQuit = numQuitting;
      let numQuit = 0;
      let i = 0;
      while (toQuit > 0 && i < roles.length) {
        const role = roles[i];
        const curInRole = employees[role].cur;
        employees[role].cur = max(employees[role].cur - toQuit, 0);
        numQuit += (curInRole - employees[role].cur);
        toQuit = numQuitting - numQuit;
        i++;
      }

      return {
        ...state,
        employees: {
          ...state.employees,
          cur: state.employees.cur - byRoleType.aboutToLeave,
          [roleType]: {
            ...byRoleType,
            quit: byRoleType.quit + numQuitting,
            aboutToLeave: byRoleType.needPay,
            needPay: byRoleType.dontNeedPay,
            dontNeedPay: 0,
            cur: byRoleType.cur - byRoleType.aboutToLeave,
          },
        },
      };
    }
  }
  return state;
}

module.exports = {employeeReducer};
