'use strict';

var initRumbleSystem = function initRumbleSystem(store) {
  var rumbleInterval = void 0;
  store.subscribe(function () {
    var state = store.getState();
    if (!state.level) {
      return;
    }
    var rumble = state.level.rumble;

    if (!rumble || !rumble.shouldRumble) {
      clearInterval(rumbleInterval);
      return;
    }
    if (rumble.count == -1) {
      store.dispatch({ type: 'START_RUMBLE', count: 10 });
      rumbleInterval = setInterval(function () {
        store.dispatch({ type: 'RUMBLE' });
      }, 50);
    }
  });
};

module.exports = { initRumbleSystem: initRumbleSystem };