'use strict';

var initTrashSystem = function initTrashSystem(store) {

  var time = store.getState().time;
  store.subscribe(function () {
    var state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    var _state$config = state.config,
        trashInterval = _state$config.trashInterval,
        trashMultiplier = _state$config.trashMultiplier;


    if (time % (trashInterval / trashMultiplier) == 0) {
      var trashAmount = 200 * (time / trashInterval) * trashMultiplier;
      store.dispatch({ type: 'ADD_TRASH', trash: trashAmount });
    }
  });
};

module.exports = { initTrashSystem: initTrashSystem };