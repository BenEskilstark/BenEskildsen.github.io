'use strict';

var _require = require('../selectors/selectors.js'),
    isGameOver = _require.isGameOver;

var initLevelCompleteSystem = function initLevelCompleteSystem(store) {
  store.subscribe(function () {
    var state = store.getState();
    if (!state.level) {
      return;
    }
    var dispatch = store.dispatch;
    var reached = state.level.target.reached;

    var levelNum = state.level.level;
    var dismissModalButton = {
      text: 'Dismiss',
      onClick: function onClick() {
        return dispatch({ type: 'DISMISS_MODAL' });
      }
    };
    var reverseTimeButton = {
      text: 'Go Back in Time',
      onClick: function onClick() {
        dispatch({ type: 'DISMISS_MODAL' });
        dispatch({ type: 'REVERSE_TIME' });
      }
    };
    var nextLevelButton = {
      text: 'Next Level',
      onClick: function onClick() {
        dispatch({ type: 'DISMISS_MODAL' });
        dispatch({ type: 'NEXT_LEVEL' });
      }
    };
    if (reached == 1) {
      var maybeTellAboutReverseTime = levelNum > 1 ? "\n\nPress the space bar whenever you want to go back in time again." : "";
      var _buttons = [reverseTimeButton];
      if (state.editor) {
        _buttons.push(dismissModalButton);
      }
      dispatch({ type: 'SET_REACHED', reached: 1.5 }); // hack to prevent infinite loop
      dispatch({
        type: 'SET_MODAL',
        text: "You've reached the time machine! " + "Now go back in time and help yourself through the maze. " + maybeTellAboutReverseTime,
        buttons: _buttons
      });
      return;
    }
    if (reached >= 2) {
      var _buttons2 = [nextLevelButton];
      if (state.editor) {
        _buttons2 = [dismissModalButton];
      }
      dispatch({ type: 'SET_REACHED', reached: 0.5 }); // hack to prevent infinite loop
      dispatch({
        type: 'SET_MODAL',
        text: "You made it through the maze (with a little help from yourself)!",
        buttons: _buttons2
      });
      return;
    }

    // game over system
    var editor = state.editor,
        modal = state.modal;
    var _state$level = state.level,
        stepLimit = _state$level.stepLimit,
        time = _state$level.time;

    var gameOver = isGameOver(state);
    if (!gameOver || modal || editor || gameOver.type == 'STEPS' && reached > 0) {
      return;
    }
    var text = gameOver.text;

    var buttons = [{ text: 'Restart', onClick: function onClick() {
        return dispatch({ type: 'RESET' });
      } }];
    store.dispatch({ type: 'SET_MODAL', text: text, buttons: buttons });
    return;
  });
};

module.exports = { initLevelCompleteSystem: initLevelCompleteSystem };