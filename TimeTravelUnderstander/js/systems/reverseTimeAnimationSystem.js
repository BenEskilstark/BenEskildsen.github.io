// @flow

const STEPS = 90;

const initReverseTimeAnimationSystem = (store) => {
  let reverseTimeInterval;
  store.subscribe(() => {
    const state = store.getState();
    if (!state.level) {
      return;
    }
    const {reverseTime} = state.level;
    if (!reverseTime || !reverseTime.shouldAnimate) {
      clearInterval(reverseTimeInterval);
      return;
    }
    if (reverseTime.count == -1) {
      store.dispatch({type: 'START_REVERSE_TIME_ANIMATION', count: STEPS});
      reverseTimeInterval = setInterval(() => {
        store.dispatch({type: 'REVERSE_TIME_ANIMATION'});
      }, 20);
    }
  });
}

module.exports = {initReverseTimeAnimationSystem};
