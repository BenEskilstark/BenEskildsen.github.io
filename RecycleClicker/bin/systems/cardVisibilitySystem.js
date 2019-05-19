'use strict';

// only trigger one time per card
var cards = {
  'hireVisible': false,
  'payContractorVisible': false,
  'payEmployeeVisible': false,
  'researchVisible': false,
  'lobbyVisible': false
};
var MAX = 20;

var initCardVisibilitySystem = function initCardVisibilitySystem(store) {

  var time = store.getState().time;
  var dispatch = store.dispatch;

  store.subscribe(function () {
    var state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    var ui = state.ui;

    // hire

    if (cards.hireVisible == false && state.burn.cur + state.recycle.cur > 50) {
      cards.hireVisible = true;
      dispatch({ type: 'SET_CARD_VISIBILITY', card: 'hireVisible' });
    }

    // pay contractors
    if (cards.payContractorVisible == false && state.employees.contractor.cur > 0) {
      cards.payContractorVisible = true;
      dispatch({ type: 'SET_CARD_VISIBILITY', card: 'payContractorVisible' });
    }

    // pay employees
    if (cards.payEmployeeVisible == false && state.employees.employee.cur > 0) {
      cards.payEmployeeVisible = true;
      dispatch({ type: 'SET_CARD_VISIBILITY', card: 'payEmployeeVisible' });
    }

    // research
    if (cards.researchVisible == false && (state.employees.Manager.cur > 0 || state.employees.Scientist.cur > 0 || state.employees.Lawyer.cur > 0)) {
      cards.researchVisible = true;
      dispatch({ type: 'SET_CARD_VISIBILITY', card: 'researchVisible' });
    }

    // lobby
    if (cards.lobbyVisible == false && (state.employees.Manager.cur > 0 || state.employees.Scientist.cur > 0 || state.employees.Lawyer.cur > 0)) {
      cards.lobbyVisible = true;
      dispatch({ type: 'SET_CARD_VISIBILITY', card: 'lobbyVisible' });
    }
  });
};

module.exports = { initCardVisibilitySystem: initCardVisibilitySystem };