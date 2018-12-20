// @flow

import type {State} from 'types';

const getCar = (state: State, player: number): Car => {
  return state.entities.filter(entity => {
    return entity.type == 'car' && entity.player == player;
  })[0];
};


module.exports = {
  getCar,
}
