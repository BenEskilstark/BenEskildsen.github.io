// @flow
const React = require('React');
const ButtonOption = require('../ui/components/ButtonOption.react');

const initRandomEventSystem = (store) => {

  let time = store.getState().time;
  const {dispatch} = store;
  store.subscribe(() => {
    const state = store.getState();
    // only run the system on a new tick
    if (state.time == time) {
      return;
    }
    time = state.time;
    const {buttonsShown} = state.systems;

    // -----------------------------------------------------------------------------------
    // Hiring multiple contractors at once
    // -----------------------------------------------------------------------------------

    if (state.employees.contractor.cur >= 200 && !buttonsShown.contractors2) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'buttonsShown', property: 'contractors2', value: true
      });
      dispatch(ticker(
        <ButtonOption
          label="Hire 2 contractors at a time?"
          optionNames={['Yes']}
          onClicks={[
            () => dispatch({type: 'SET_CONFIG_VALUE', config: 'employeesPerHire', value: 2})
          ]}
        />
      ));
    }
    if (state.employees.contractor.cur >= 1000 && !buttonsShown.contractors5) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'buttonsShown', property: 'contractors5', value: true
      });
      dispatch(ticker(
        <ButtonOption
          label="Hire 5 contractors at a time?"
          optionNames={['Yes']}
          onClicks={[
            () => dispatch({type: 'SET_CONFIG_VALUE', config: 'employeesPerHire', value: 5})
          ]}
        />
      ));
    }
    if (state.employees.contractor.cur >= 2500 && !buttonsShown.contractors10) {
      dispatch({type: 'SET_SYSTEM_VALUE',
        system: 'buttonsShown', property: 'contractors10', value: true
      });
      dispatch(ticker(
        <ButtonOption
          label="Hire 10 contractors at a time?"
          optionNames={['Yes']}
          onClicks={[
            () => dispatch({type: 'SET_CONFIG_VALUE', config: 'employeesPerHire', value: 10})
          ]}
        />
      ));
    }

    // -----------------------------------------------------------------------------------
    // Layoffs
    // -----------------------------------------------------------------------------------



    // -----------------------------------------------------------------------------------
    // Strike
    // -----------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------
    // Government fine
    // -----------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------
    // Wage-theft lawsuit
    // -----------------------------------------------------------------------------------

  });
}

const ticker = (message) => {
  return {type: 'TICKER', message};
};

module.exports = {initRandomEventSystem};
