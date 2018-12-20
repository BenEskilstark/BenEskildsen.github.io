// @flow

const {getInitialState} = require('../entities/initState');
const {recordReducer} = require('./recordReducer');
const {entityReducer} = require('./entityReducer');
const {tickReducer} = require('./tickReducer');
const {viewReducer} = require('./viewReducer');
const {placeReducer} = require('./placeReducer');
const {buyReducer} = require('./buyReducer');

import type {State} from 'types';

const rootReducer = (state: State, action: Action): State => {
  if (state === undefined) return getInitialState();

  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        running: !state.running,
      };
    case 'TICK':
      return tickReducer(state, action);
    case 'ZOOM':
    case 'MOUSE_MOVE':
    case 'MOUSE_DOWN':
    case 'MOUSE_UP':
      return viewReducer(state, action);
    case 'RECORD':
    case 'STOP':
    case 'PLAY':
    case 'RETURN':
      return recordReducer(state, action);
    case 'MAYBE_SELECT':
    case 'ACCELERATE':
    case 'DEACCELERATE':
    case 'TURN':
      return entityReducer(state, action);
    case 'BUY':
      return buyReducer(state, action);
    case 'PLACE':
      return placeReducer(state, action);
  }
  return state;
};

module.exports = {rootReducer};
