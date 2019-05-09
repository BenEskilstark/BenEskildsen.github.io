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
        case 'Upgraded incinerators':
          dispatch({type: 'TICKER', message: 'Contractors burn twice as much'});
          dispatch({type: 'SET_CONFIG_VALUE', config: 'trashPerBurn', value: 2});
          break;
        case 'Cheaper recycling':
          dispatch({type: 'CHEAPER_RECYCLING', additionalRevenuePerRecycle: 100});
          break;
        case 'Efficient recycling':
          dispatch({type: 'TICKER', message: 'Contractors recycle twice as much'});
          dispatch({type: 'SET_CONFIG_VALUE', config: 'trashPerRecycle', value: 2});
          break;
        case 'Dredge the oceans':
          dispatch({type: 'TICKER', message: 'We can now pull more garbage from the sea'});
          dispatch({type: 'SET_TRASH_MULTIPLIER', multiplier: 2});
          break;
        case 'Convert all burners to recyclers':
          dispatch({type: 'CONVERT_WORKERS', roleFrom: 'Burner', roleTo: 'Recycler'});
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
        case 'Contractor over-time':
          dispatch({type: 'TICKER', message: 'More work for the same pay'});
          dispatch({type: 'CONTRACTOR_OVER_TIME'});
          break;
        case 'Lower minimum wage':
          dispatch({type: 'SET_WAGE', roleType: 'contractor', wage: 350});
          break;
        case 'Late-stage capitalism':
          dispatch({type: 'TICKER', message: 'Money > Earth'});
          dispatch({type: 'SET_WAGE', roleType: 'contractor', wage: 250});
          dispatch({type: 'SET_WAGE', roleType: 'employee', wage: 40000});
          break;
        case 'Ultra-consumerist society':
          dispatch({type: 'TICKER', message: 'People generate way more trash!'});
          dispatch({type: 'SET_TRASH_MULTIPLIER', multiplier: 5});
          break;
        case 'Recycling subsidies':
          dispatch({type: 'TICKER', message: 'We now make more money per recycle'});
          dispatch({type: 'CHEAPER_RECYCLING', additionalRevenuePerRecycle: 100});
          break;
        case 'Raise contractor wages':
          dispatch({type: 'TICKER', message: 'Contractors will work harder for more pay'});
          dispatch({type: 'SET_WAGE', roleType: 'contractor', wage: 1000});
          dispatch({
            type: 'SET_CONFIG_VALUE',
            config: 'trashPerBurn',
            value: state.config.trashPerBurn + 1,
          });
          dispatch({
            type: 'SET_CONFIG_VALUE',
            config: 'trashPerRecycle',
            value: state.config.trashPerRecycle + 1,
          });
          break;
        case 'Universal healthcare':
          dispatch({type: 'TICKER', message: 'Now we don\'t have to pay employees as much'});
          dispatch({type: 'SET_WAGE', roleType: 'employee', wage: 40000})
        case 'Communism':
          dispatch({type: 'SET_WAGE', roleType: 'contractor', wage: 1500});
          dispatch({type: 'SET_WAGE', roleType: 'employee', wage: state.employees.contractor.wage});
          break;
        case 'Fully-sustainable society':
          dispatch({type: 'TICKER', message: 'People don\'t throw stuff away any more!'});
          dispatch({type: 'SET_TRASH_MULTIPLIER', multiplier: 0});
          break;
      }
    }
  });
}

module.exports = {initResearchAndLobbySystem};
