// @flow

const {make} = require('../entities/makeEntity');
const {getWorldCoord} = require('../selectors');
const {distance} = require('../utils');

const placeReducer = (state: State, action: Action): State => {
  const {entities, placing} = state;
  const {x, y} = getWorldCoord(state, action.x, action.y);

  if (!isValidPlace(state, action)) {
    return state;
  }

  const entity = make(placing, x, y);
  entity.selected = true;
  entities.push(entity);

  return {
    ...state,
    entities,
    placing: null,
  }
};

const isValidPlace = (state: State, action: Action): boolean => {
  const {entities, placing} = state;
  const placeCoord = getWorldCoord(state, action.x, action.y);

  if (placing === null) {
    return false;
  }

  // require miner/truck to be near base/factory
  if (placing == 'miner' || placing == 'truck') {
    for (const entity of entities) {
      const {x, y, type} = entity;
      if (type == 'factory' && distance({x, y}, placeCoord) < 300) {
        return true;
      }
      if (type == 'base' && distance({x, y}, placeCoord) < 150) {
        return true;
      }
    }
    return false;
  }

  return true;
}

module.exports = {
  placeReducer,
};
