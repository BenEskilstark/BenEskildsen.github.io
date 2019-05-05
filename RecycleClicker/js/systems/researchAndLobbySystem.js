// @flow

const initResearchAndLobbySystem = (store) => {
  const {dispatch} = store;
  store.subscribe(() => {
    const state = store.getState();
    let justResearched = state.research.justResearched;
    if (justResearched) {
      dispatch({type: 'REMOVE_JUST_RESEARCHED', researchOrLobby: 'research'});
      dispatch({
        type: 'TICKER',
        message: 'Just researched ' + justResearched.name,
      });
      // activate the research:
      switch (justResearched.name) {
        case 'Faster burning':
          dispatch({type: 'FASTER_BURN', clickRate: 80});
          break;
        case 'Even faster burning':
          dispatch({type: 'FASTER_BURN', clickRate: 50});
          break;
        case 'Cheaper recycling':
          dispatch({type: 'CHEAPER_RECYCLING', additionalRevenuePerRecycle: 100});
          break;
      }
    }

    justResearched = state.lobby.justResearched;
    if (justResearched) {
      dispatch({type: 'REMOVE_JUST_RESEARCHED', researchOrLobby: 'lobby'});
      dispatch({
        type: 'TICKER',
        message: 'Just lobbied for ' + justResearched.name,
      });
      // activate the research:
      switch (justResearched.name) {
        case 'Recycling subsidies':
          dispatch({type: 'CHEAPER_RECYCLING', additionalRevenuePerRecycle: 100});
          break;
        case 'Lower minimum wage':
          dispatch({type: 'SET_WAGE', roleType: 'contractor', wage: 400});
          break;
        case 'Ultra-consumerist society':
          dispatch({type: 'SET_TRASH_MULTIPLIER', multiplier: 5});
          break;
        case 'Fully-sustainable society':
          dispatch({type: 'SET_TRASH_MULTIPLIER', multiplier: 0});
          break;
      }
    }
  });
}

module.exports = {initResearchAndLobbySystem};
