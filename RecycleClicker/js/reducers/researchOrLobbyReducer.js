// @flow

import type {State, Action} from '../types';

const researchOrLobbyReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'RESEARCH':
    case 'LOBBY':
      const researchOrLobby = action.type.toLowerCase();
      const num = action.num != null ? action.num : 1;
      return {
        ...state,
        [researchOrLobby]: {
          ...state[researchOrLobby],
          cur: state[researchOrLobby].cur + num,
        },
      };
    case 'RESEARCH_GREEDY': {
      // only if you can afford it and it exists
      if (state.research.greedyOptions.length == 0) {
        return state;
      }
      if (state.research.cur < state.research.greedyOptions[0].cost && !state.ui.godMode) {
        return state;
      }
      const option = state.research.greedyOptions.shift();
      return {
        ...state,
        research: {
          ...state.research,
          cur: state.research.cur - option.cost,
          greedyOptions: state.research.greedyOptions,
          justResearched: option,
        },
      };
    }
    case 'RESEARCH_GOOD': {
      // only if you can afford it and it exists
      if (state.research.goodOptions.length == 0) {
        return state;
      }
      if (state.research.cur < state.research.goodOptions[0].cost && !state.ui.godMode) {
        return state;
      }
      const option = state.research.goodOptions.shift();
      return {
        ...state,
        research: {
          ...state.research,
          cur: state.research.cur - option.cost,
          goodOptions: state.research.goodOptions,
          justResearched: option,
        },
      };
    }
    case 'LOBBY_GREEDY': {
      // only if you can afford it and it exists
      if (state.lobby.greedyOptions.length == 0) {
        return state;
      }
      if (state.lobby.cur < state.lobby.greedyOptions[0].cost && !state.ui.godMode) {
        return state;
      }
      const option = state.lobby.greedyOptions.shift();
      return {
        ...state,
        lobby: {
          ...state.lobby,
          cur: state.lobby.cur - option.cost,
          greedyOptions: state.lobby.greedyOptions,
          justResearched: option,
        },
      };
    }
    case 'LOBBY_GOOD': {
      // only if you can afford it and it exists
      if (state.lobby.goodOptions.length == 0) {
        return state;
      }
      if (state.lobby.cur < state.lobby.goodOptions[0].cost && !state.ui.godMode) {
        return state;
      }
      const option = state.lobby.goodOptions.shift();
      return {
        ...state,
        lobby: {
          ...state.lobby,
          cur: state.lobby.cur - option.cost,
          goodOptions: state.lobby.goodOptions,
          justResearched: option,
        },
      };
    }
    case 'REMOVE_JUST_RESEARCHED': {
      const researchOrLobby = action.researchOrLobby;
      return {
        ...state,
        [researchOrLobby]: {
          ...state[researchOrLobby],
          justResearched: null,
        },
      };
    }
  }
};

module.exports = {researchOrLobbyReducer};
