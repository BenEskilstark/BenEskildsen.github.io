// @flow

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'DISMISS_MODAL':
      return {
        ...state,
        modal: null,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: {
          text: action.text,
          buttons: [...action.buttons],
        }
      };
  }
}

module.exports = {modalReducer};
