// @flow

const initRumbleSystem = (store) => {
  let rumbleInterval;
  store.subscribe(() => {
    const state = store.getState();
    if (!state.level) {
      return;
    }
    const {rumble} = state.level;
    if (!rumble || !rumble.shouldRumble) {
      clearInterval(rumbleInterval);
      return;
    }
    if (rumble.count == -1) {
      store.dispatch({type: 'START_RUMBLE', count: 10});
      rumbleInterval = setInterval(() => {
        store.dispatch({type: 'RUMBLE'});
      }, 50);
    }
  });
}

module.exports = {initRumbleSystem};
