// @flow

const {isGameOver} = require('../selectors/selectors.js');

const initLevelCompleteSystem = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    if (!state.level) {
      return;
    }
    const dispatch = store.dispatch;
    const {reached} = state.level.target;
    const levelNum = state.level.level;
    const dismissModalButton = {
      text: 'Dismiss',
      onClick: () => dispatch({type: 'DISMISS_MODAL'}),
    };
    const reverseTimeButton = {
      text: 'Go Back in Time',
      onClick: () => {
        dispatch({type: 'DISMISS_MODAL'});
        dispatch({type: 'REVERSE_TIME'});
      }
    }
    const nextLevelButton = {
      text: 'Next Level',
      onClick: () => {
        dispatch({type: 'DISMISS_MODAL'});
        dispatch({type: 'NEXT_LEVEL'});
      }
    }
    if (reached == 1) {
      const maybeTellAboutReverseTime = levelNum > 1 ?
        "\n\nPress the space bar whenever you want to go back in time again." :
        "";
      const buttons = [reverseTimeButton];
      if (state.editor) {
        buttons.push(dismissModalButton);
      }
      dispatch({type: 'SET_REACHED', reached: 1.5}); // hack to prevent infinite loop
      dispatch({
        type: 'SET_MODAL',
        text:
          "You've reached the time machine! " +
          "Now go back in time and help yourself through the maze. " +
          maybeTellAboutReverseTime,
        buttons,
      });
      return;
    }
    if (reached >= 2) {
      let buttons = [nextLevelButton];
      if (state.editor) {
        buttons = [dismissModalButton];
      }
      dispatch({type: 'SET_REACHED', reached: 0.5}); // hack to prevent infinite loop
      dispatch({
        type: 'SET_MODAL',
        text:
          "You made it through the maze (with a little help from yourself)!",
        buttons,
      });
      return;
    }

    // game over system
    const {editor, modal} = state;
    const {stepLimit, time} = state.level;
    const gameOver = isGameOver(state);
    if (!gameOver || modal || editor || (gameOver.type == 'STEPS' && reached > 0)) {
      return;
    }
    const {text} = gameOver;
    const buttons = [{text: 'Restart', onClick: () => dispatch({type: 'RESET'})}];
    store.dispatch({type: 'SET_MODAL', text, buttons});
    return;
  });
};

module.exports = {initLevelCompleteSystem};
