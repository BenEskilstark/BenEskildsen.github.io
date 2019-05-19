// @flow

const depressedStr =
  'background: rgba(158,158,158,0.3); ' +
  'color: rgba(0, 0, 0, 0.6);'

const unDepressedStr =
  'background: rgba(158,158,158,0.1); ' +
  'color: rgba(0, 0, 0, 0.5);'


const initEmployeeClickSystem = (store) => {

  let time = store.getState().time;
  const {dispatch} = store;
  store.subscribe(() => {
    const state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;

    for (const roleOption of state.employees.roleOptions) {
      const role = state.employees[roleOption];
      const button = document.getElementById(role.action + '_button');

      if (time % role.clickRate == 0 && role.cur > 0) {

        // don't press button if it won't do anything
        if (
          role.action == 'PAY_CONTRACTOR' &&
          state.employees.contractor.dontNeedPay == state.employees.contractor.cur
        ) {
          continue;
        }
        if (
          role.action == 'PAY_EMPLOYEE' &&
          state.employees.employee.dontNeedPay == state.employees.employee.cur
        ) {
          continue;
        }
        if (
          (role.action == 'RECYCLE' || role.action == 'BURN') && state.trash.cur <= 0
        ) {
          continue;
        }

        setTimeout(() => {
          button.setAttribute('style', depressedStr);
          setTimeout(() => button.setAttribute('style', unDepressedStr), 150);
        }, 0);
        dispatch({type: role.action, num: role.cur});
      }
    }
  });
}

module.exports = {initEmployeeClickSystem};
