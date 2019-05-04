'use strict';

var timeInterval = 1500;

var initTrashSystem = function initTrashSystem(store) {

  var time = store.getState().time;
  store.subscribe(function () {
    var state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;

    var trashMultiplier = state.config.trashMultiplier;

    if (time % (timeInterval / trashMultiplier) == 0) {
      var trashAmount = 200 * (time / timeInterval) * trashMultiplier;
      store.dispatch({ type: 'ADD_TRASH', trash: trashAmount });
    }
  });
};

module.exports = { initTrashSystem: initTrashSystem };