const {
  MINER_COST, TRUCK_COST, BASE_COST, AUTOMATION_COST,
} = require('../settings');

const costLookup = {
  miner: MINER_COST,
  truck: TRUCK_COST,
  base: BASE_COST,
  ['automate trucks']: AUTOMATION_COST,
};

const buyReducer = (state, action) => {
  const factory = state.entities.filter(e => e.type == 'factory')[0];
  const cost = costLookup[action.entityType];
  if (factory.collected < cost) {
    return state;
  }
  factory.collected -= cost;
  if (action.entityType == 'automate trucks') {
    return {
      ...state,
      automatedTrucks: true,
    };
  }
  return {
    ...state,
    placing: action.entityType,
  };
};

module.exports = {buyReducer};
