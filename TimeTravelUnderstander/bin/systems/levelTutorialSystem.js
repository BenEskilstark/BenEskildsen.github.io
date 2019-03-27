'use strict';

var initLevelTutorialSystem = function initLevelTutorialSystem(store) {
  var shouldShowLevel1Tutorial = true;
  var shouldShowLevel2Tutorial = true;
  var dispatch = store.dispatch;
  var level1TutorialModal = {
    type: 'SET_MODAL',
    text: 'You\'ve reached the button that opens the orange door. Now keep moving until your' + ' original self reaches the time machine again.',
    buttons: [{ text: 'Got it, gonna move around', onClick: function onClick() {
        return dispatch({ type: 'DISMISS_MODAL' });
      } }]
  };

  var level2TutorialModal = {
    type: 'SET_MODAL',
    text: 'Your original self is stuck at the door. Press the space bar to go back in time' + ' again and keep going.',
    buttons: [{ text: 'Ok. Gotta go back in time', onClick: function onClick() {
        return dispatch({ type: 'DISMISS_MODAL' });
      } }]
  };

  store.subscribe(function () {
    var state = store.getState();
    if (!state.level) {
      return;
    }
    var level = state.level;

    var levelNum = level.level;

    // level 1 tutorial
    if (levelNum == 0) {
      var atButton = false;
      var agent = level.agents[0];
      var agentPos = agent.history[agent.history.length - 1];
      if (agentPos.x == 1 && agentPos.y == 0) {
        atButton = true;
      }
      if (shouldShowLevel1Tutorial && atButton) {
        shouldShowLevel1Tutorial = false;
        dispatch(level1TutorialModal);
      }
    }

    // level 2 tutorial
    if (levelNum == 1) {
      var mustReverseTime = false;
      if (level.time == 4 && level.prevTime == 3 && level.rumble && level.rumble.shouldRumble == true && level.numReversals == 1) {
        mustReverseTime = true;
      }
      if (shouldShowLevel2Tutorial && mustReverseTime) {
        shouldShowLevel2Tutorial = false;
        dispatch(level2TutorialModal);
      }
    }
  });
};

module.exports = { initLevelTutorialSystem: initLevelTutorialSystem };