// @flow

const timeInterval = 1500;

const initTrashSystem = (store) => {

  let time = store.getState().time;
  store.subscribe(() => {
    const state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;

    const {trashMultiplier} = state.config;
    if (time % (timeInterval / trashMultiplier) == 0) {
      const trashAmount = 200 * (time / timeInterval) * trashMultiplier;
      store.dispatch({type: 'ADD_TRASH', trash: trashAmount});
    }
  });
}

module.exports = {initTrashSystem};
