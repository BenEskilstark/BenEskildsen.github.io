'use strict';

var cards = ['hireVisible', 'payContractorVisible', 'payEmployeeVisible', 'researchVisible', 'lobbyVisible'];
var MAX = 20;

var initCardFlickerSystem = function initCardFlickerSystem(store) {

  var time = store.getState().time;
  var dispatch = store.dispatch;

  store.subscribe(function () {
    var state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    var ui = state.ui;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {

      for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var card = _step.value;

        var cardFlicker = card + 'Flicker';
        if (ui[card] && ui[cardFlicker] == 0 || ui[cardFlicker] > 0 && ui[cardFlicker] < MAX) {
          dispatch({ type: 'FLICKER_CARD', card: card });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
};

module.exports = { initCardFlickerSystem: initCardFlickerSystem };