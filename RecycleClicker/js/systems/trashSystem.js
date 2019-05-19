// @flow

const initTrashSystem = (store) => {

  let time = store.getState().time;
  store.subscribe(() => {
    const state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    const {trashInterval, trashMultiplier} = state.config;

    if (time % (trashInterval / trashMultiplier) == 0) {
      const trashAmount = 200 * (time / trashInterval) * trashMultiplier;
      store.dispatch({type: 'ADD_TRASH', trash: trashAmount});
    }
  });
}

module.exports = {initTrashSystem};
