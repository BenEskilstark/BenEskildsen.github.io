// @flow

const initLevelTutorialSystem = (store) => {
  let shouldShowLevel1Tutorial = true;
  let shouldShowLevel2Tutorial = true;
  const dispatch = store.dispatch;
  const level1TutorialModal = {
    type: 'SET_MODAL',
    text: 'You\'ve reached the button that opens the orange door. Now keep moving until your'
      + ' original self reaches the time machine again.',
    buttons: [
      {text: 'Got it, gonna move around', onClick: () => dispatch({type: 'DISMISS_MODAL'})},
    ],
  };

  const level2TutorialModal = {
    type: 'SET_MODAL',
    text: 'Your original self is stuck at the door. Press the space bar to go back in time'
      + ' again and keep going.',
    buttons: [
      {text: 'Ok. Gotta go back in time', onClick: () => dispatch({type: 'DISMISS_MODAL'})},
    ],
  };

  store.subscribe(() => {
    const state = store.getState();
    if (!state.level) {
      return;
    }
    const {level} = state;
    const levelNum = level.level;

    // level 1 tutorial
    if (levelNum == 0) {
      let atButton = false;
      const agent = level.agents[0];
      const agentPos = agent.history[agent.history.length - 1];
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
      let mustReverseTime = false;
      if (
        level.time == 4 && level.prevTime == 3 &&
        level.rumble && level.rumble.shouldRumble == true &&
        level.numReversals == 1
      ) {
        mustReverseTime = true;
      }
      if (shouldShowLevel2Tutorial && mustReverseTime) {
        shouldShowLevel2Tutorial = false;
        dispatch(level2TutorialModal);
      }
    }
  });
};

module.exports = {initLevelTutorialSystem};
