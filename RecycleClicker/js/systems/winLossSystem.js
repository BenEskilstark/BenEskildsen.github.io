// @flow

const React = require('React');
const RestartButtonOption = require('../ui/components/RestartButtonOption.react');

const initWinLossSystem = (store) => {

  let time = store.getState().time;
  const {dispatch} = store;
  store.subscribe(() => {
    const state = store.getState();
    // only check on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    const {warningsShown} = state.systems;

    // ----------------------------------------------------------------
    // Too much burning
    // ----------------------------------------------------------------
    const {burn} = state;
    if (burn.cur >= burn.max * 0.25 && !warningsShown.burning25) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'burning25', value: true
      });
      dispatch(ticker(
        'Burning too much trash leads to catastrophe',
      ));
    }
    if (burn.cur >= burn.max * 0.50 && !warningsShown.burning50) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'burning50', value: true
      });
      dispatch(ticker(
        'Amount of trash burned is dangerously high',
      ));
    }
    if (burn.cur >= burn.max * 0.75 && !warningsShown.burning75) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'burning75', value: true
      });
      dispatch(ticker(
        'Burning trash will soon lead to catastrophe!',
      ));
    }
    if (burn.cur >= burn.max * 0.90 && !warningsShown.burning90) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'burning90', value: true
      });
      dispatch(ticker(
        'Burning will destroy the world imminently',
      ));
    }

    if (burn.cur >= burn.max && !state.ui.gameOver) {
      dispatch(ticker(
        'You burned so much trash the world collapsed!',
      ));
      dispatch(ticker(
        <RestartButtonOption
          win={false}
          dispatch={dispatch}
        />
      ));
      dispatch({type: 'GAME_OVER', win: false});
    }


    // ----------------------------------------------------------------
    // Too much trash
    // ----------------------------------------------------------------
    const {trash} = state;
    if (trash.cur >= trash.max * 0.25 && !warningsShown.trash25) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'trash25', value: true
      });
      dispatch(ticker(
        'Collect trash quickly to avoid catastrophe',
      ));
    }
    if (trash.cur >= trash.max * 0.50 && !warningsShown.trash50) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'trash50', value: true
      });
      dispatch(ticker(
        'The streets overflow with uncollected trash',
      ));
    }
    if (trash.cur >= trash.max * 0.75 && !warningsShown.trash75) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'trash75', value: true
      });
      dispatch(ticker(
        'Uncollected trash levels are dangerously high',
      ));
    }
    if (trash.cur >= trash.max * 0.90 && !warningsShown.trash90) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'warningsShown', property: 'trash90', value: true
      });
      dispatch(ticker(
        'Trash catastrophe will occur at any moment',
      ));
    }

    if (trash.cur >= trash.max && !state.ui.gameOver) {
      dispatch(ticker(
        'You didn\'t collect trash fast enough to stop collapse',
      ));
      dispatch(ticker(
        <RestartButtonOption
          win={false}
          dispatch={dispatch}
        />
      ));
      dispatch({type: 'GAME_OVER', win: false});
    }

    // ----------------------------------------------------------------
    // No trash and no trash rate
    // ----------------------------------------------------------------
    if (trash.cur <= 0 && state.config.trashMultiplier == 0 && !state.ui.gameOver) {
      dispatch(ticker(
        'You collected all the trash!',
      ));
      dispatch(ticker(
        <RestartButtonOption
          win={true}
          dispatch={dispatch}
        />
      ));
      dispatch({type: 'GAME_OVER', win: true});
    }
  });
}

const ticker = (message) => {
  return {type: 'TICKER', message};
};

module.exports = {initWinLossSystem};
