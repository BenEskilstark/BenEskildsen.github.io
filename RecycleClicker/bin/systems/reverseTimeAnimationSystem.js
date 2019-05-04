'use strict';

var STEPS = 90;

var initReverseTimeAnimationSystem = function initReverseTimeAnimationSystem(store) {
  var reverseTimeInterval = void 0;
  store.subscribe(function () {
    var state = store.getState();
    if (!state.level) {
      return;
    }
    var reverseTime = state.level.reverseTime;

    if (!reverseTime || !reverseTime.shouldAnimate) {
      clearInterval(reverseTimeInterval);
      return;
    }
    if (reverseTime.count == -1) {
      store.dispatch({ type: 'START_REVERSE_TIME_ANIMATION', count: STEPS });
      reverseTimeInterval = setInterval(function () {
        store.dispatch({ type: 'REVERSE_TIME_ANIMATION' });
      }, 20);
    }
  });
};

module.exports = { initReverseTimeAnimationSystem: initReverseTimeAnimationSystem };