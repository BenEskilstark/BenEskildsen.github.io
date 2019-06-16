// @flow

const initCardVisibilitySystem = (store) => {

  let time = store.getState().time;
  const {dispatch} = store;
  store.subscribe(() => {
    const state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    const {ui} = state;

    // hire
    if (
      ui.hireVisible == false &&
      state.burn.cur + state.recycle.cur > 50
    ) {
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'hireVisible'});
    }

    // pay contractors
    if (
      ui.payContractorVisible == false &&
      state.employees.contractor.cur > 0
    ) {
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'payContractorVisible'});
    }

    // pay employees
    if (
      ui.payEmployeeVisible == false &&
      state.employees.employee.cur > 0
    ) {
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'payEmployeeVisible'});
    }

    // research
    if (
      ui.researchVisible == false &&
      (state.employees.Manager.cur > 0 || state.employees.Scientist.cur > 0 ||
      state.employees.Lawyer.cur > 0)
    ) {
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'researchVisible'});
    }

    // lobby
    if (
      ui.lobbyVisible == false &&
      (state.employees.Manager.cur > 0 || state.employees.Scientist.cur > 0 ||
      state.employees.Lawyer.cur > 0)
    ) {
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'lobbyVisible'});
    }

  });
}

module.exports = {initCardVisibilitySystem};
