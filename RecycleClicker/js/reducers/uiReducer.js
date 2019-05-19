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
        },
      };
    case 'SET_GOD_MODE': {
      const godMode = action.godMode !== undefined ? action.godMode : true;
      return {
        ...state,
        ui: {
          ...state.ui,
          godMode,
        },
      };
    }
    case 'SET_CARD_VISIBILITY': {
      const visibility = action.visible !== undefined ? action.visible : true;
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.card]: visibility,
        },
      };
    }
    case 'FLICKER_CARD': {
      const card = action.card;
      const cardFlicker = card + 'Flicker';
      return {
        ...state,
        ui: {
          ...state.ui,
          [cardFlicker]: state.ui[cardFlicker] + 1,
          [card]: !state.ui[card],
        },
      };
    }
  }
  return state;
};

module.exports = {uiReducer};
