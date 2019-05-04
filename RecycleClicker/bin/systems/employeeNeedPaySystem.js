'use strict';

var contractorNeedPayInterval = 1500 / 4;
var employeeNeedPayInterval = 5000;

var initEmployeeNeedPaySystem = function initEmployeeNeedPaySystem(store) {

  var time = store.getState().time;
  var dispatch = store.dispatch;

  store.subscribe(function () {
    var state = store.getState();
    // only run the system on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;

    if (time % contractorNeedPayInterval == 0) {
      dispatch({ type: 'NEED_PAY', roleType: 'contractor' });
    }
    if (time % employeeNeedPayInterval == 0) {
      dispatch({ type: 'NEED_PAY', roleType: 'employee' });
    }
  });
};

module.exports = { initEmployeeNeedPaySystem: initEmployeeNeedPaySystem };