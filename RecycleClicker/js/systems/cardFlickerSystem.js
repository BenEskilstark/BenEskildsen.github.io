// @flow

const cards = [
  'hireVisible',
  'payContractorVisible',
  'payEmployeeVisible',
  'researchVisible',
  'lobbyVisible',
];
const MAX = 20;

const initCardFlickerSystem = (store) => {

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

    for (const card of cards) {
      const cardFlicker = card + 'Flicker';
      if (
        (ui[card] && ui[cardFlicker] == 0) ||
        (ui[cardFlicker] > 0 && ui[cardFlicker] < MAX)
      ) {
        dispatch({type: 'FLICKER_CARD', card});
      }
    }
  });
}

module.exports = {initCardFlickerSystem};
