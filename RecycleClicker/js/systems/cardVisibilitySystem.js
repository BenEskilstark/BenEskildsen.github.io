// @flow

// only trigger one time per card
const cards = {
  'hireVisible': false,
  'payContractorVisible': false,
  'payEmployeeVisible': false,
  'researchVisible': false,
  'lobbyVisible': false,
};
const MAX = 20;

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
      cards.hireVisible == false &&
      state.burn.cur + state.recycle.cur > 50
    ) {
      cards.hireVisible = true;
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'hireVisible'});
    }

    // pay contractors
    if (
      cards.payContractorVisible == false &&
      state.employees.contractor.cur > 0
    ) {
      cards.payContractorVisible = true;
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'payContractorVisible'});
    }

    // pay employees
    if (
      cards.payEmployeeVisible == false &&
      state.employees.employee.cur > 0
    ) {
      cards.payEmployeeVisible = true;
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'payEmployeeVisible'});
    }

    // research
    if (
      cards.researchVisible == false &&
      (state.employees.Manager.cur > 0 || state.employees.Scientist.cur > 0 ||
      state.employees.Lawyer.cur > 0)
    ) {
      cards.researchVisible = true;
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'researchVisible'});
    }

    // lobby
    if (
      cards.lobbyVisible == false &&
      (state.employees.Manager.cur > 0 || state.employees.Scientist.cur > 0 ||
      state.employees.Lawyer.cur > 0)
    ) {
      cards.lobbyVisible = true;
      dispatch({type: 'SET_CARD_VISIBILITY', card: 'lobbyVisible'});
    }

  });
}

module.exports = {initCardVisibilitySystem};
