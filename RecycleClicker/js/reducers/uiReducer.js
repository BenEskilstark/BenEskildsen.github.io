// @flow

import type {State} from '../types';

const uiReducer = (state: State, action): State => {
  switch (action.type) {
    case 'SELECT_ROLE':
      return {
        ...state,
        ui: {
          ...state.ui,
          selectedRole: action.role,
        }
      };
  }
  return state;
};

module.exports = {uiReducer};
