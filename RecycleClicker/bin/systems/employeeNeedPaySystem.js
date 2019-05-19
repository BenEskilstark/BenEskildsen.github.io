'use strict';

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
    var _state$config = state.config,
        contractorNeedPayInterval = _state$config.contractorNeedPayInterval,
        employeeNeedPayInterval = _state$config.employeeNeedPayInterval;


    if (time % contractorNeedPayInterval == 0) {
      dispatch({ type: 'NEED_PAY', roleType: 'contractor' });
    }
    if (time % employeeNeedPayInterval == 0) {
      dispatch({ type: 'NEED_PAY', roleType: 'employee' });
    }
  });
};

module.exports = { initEmployeeNeedPaySystem: initEmployeeNeedPaySystem };