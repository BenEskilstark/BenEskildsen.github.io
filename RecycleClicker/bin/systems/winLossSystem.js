"use strict";

var initWinLossSystem = function initWinLossSystem(store) {

  var time = store.getState().time;
  var dispatch = store.dispatch;

  store.subscribe(function () {
    var state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
  });
};

module.exports = { initWinLossSystem: initWinLossSystem };