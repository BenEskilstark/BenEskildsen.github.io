// @flow
const React = require('React');
const ButtonOption = require('../ui/components/ButtonOption.react');

const buttonsShown = {
  contractors2: false,
  contractors5: false,
  contractors10: false,
};


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

    // -----------------------------------------------------------------------------------
    // Hiring multiple contractors at once
    // -----------------------------------------------------------------------------------

    if (state.employees.contractor.cur >= 200 && !buttonsShown.contractors2) {
      buttonsShown.contractors2 = true;
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
      buttonsShown.contractors5 = true;
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
      buttonsShown.contractors10 = true;
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
