// @flow

const initLevelTutorialSystem = (store) => {
  let shouldShowKeepMovingTutorial = true;
  let shouldShowStuckTutorial = true;
  const dispatch = store.dispatch;
  const stuckTutorialModal = {
    type: 'SET_MODAL',
    text: 'Your original self is stuck at the door. Press the space bar to go back in time'
      + ' again and keep going.',
    buttons: [
      {text: 'Ok. Gotta go back in time', onClick: () => dispatch({type: 'DISMISS_MODAL'})},
    ],
  };
  const keepMovingTutorialModal = {
    type: 'SET_MODAL',
    text: 'You\'ve reached the button that opens the orange door. Now keep moving until your'
      + ' original self reaches the time machine again.',
    buttons: [
      {text: 'Got it, gonna move around', onClick: () => dispatch({type: 'DISMISS_MODAL'})},
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
    if (levelNum != 0) {
      return
    }

    // stuck
    let mustReverseTime = false;
    if (
      level.time == 3 && level.prevTime == 2 &&
      level.rumble && level.rumble.shouldRumble == true &&
      level.numReversals == 1
    ) {
      mustReverseTime = true;
    }
    if (shouldShowStuckTutorial && mustReverseTime) {
      shouldShowStuckTutorial = false;
      dispatch(stuckTutorialModal);
    }

    // keep moving
    let atButton = false;
    const agent = level.agents[0];
    const agentPos = agent.history[agent.history.length - 1];
    if (agentPos.x == 3 && agentPos.y == 3) {
      atButton = true;
    }
    if (shouldShowKeepMovingTutorial && atButton) {
      shouldShowKeepMovingTutorial = false;
      dispatch(keepMovingTutorialModal);
    }

  });
};

module.exports = {initLevelTutorialSystem};
