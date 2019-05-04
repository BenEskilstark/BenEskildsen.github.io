// @flow

import type {State} from '../types';

const tickReducer = (state: State): State => {
  const nextState = {...state};
  nextState.time = state.time + 1;

  return nextState;
}

module.exports = {tickReducer};
