// @flow

const {random, round} = Math;

const OFFSET = 6;

const rumbleReducer = (state, action) => {
  switch (action.type) {
    case 'START_RUMBLE':
      return {
        ...state,
        level: {
          ...state.level,
          rumble: {
            ...state.level.rumble,
            count: action.count,
          },
        },
      };
    case 'RUMBLE':
      if (state.level.rumble.count == 0) {
        return {
          ...state,
          level: {
            ...state.level,
            rumble: {
              ...state.level.rumble,
              count: 0,
              offset: {x: 0, y: 0},
              shouldRumble: false,
            },
          },
        };
      }
      return {
        ...state,
        level: {
          ...state.level,
          rumble: {
            ...state.level.rumble,
            count: state.level.rumble.count - 1,
            offset: {
              x: round(random() * OFFSET) - OFFSET / 2,
              y: round(random() * OFFSET) - OFFSET / 2,
            },
          },
        },
      };
  }
};

module.exports = {rumbleReducer};
