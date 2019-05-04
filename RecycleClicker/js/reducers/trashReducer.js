// @flow

const trashReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRASH':
      return {
        ...state,
        trash: {
          ...state.trash,
          cur: state.trash.cur + action.trash,
        },
      };
    case 'SET_TRASH_MULTIPLIER':
      return {
        ...state,
        config: {
          ...state.config,
          trashMultiplier: action.multiplier,
        },
      };
  }
  return state;
}

module.exports = {trashReducer};
