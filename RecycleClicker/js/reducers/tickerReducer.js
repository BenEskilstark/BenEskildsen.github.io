// @flow

const tickerReducer = (state, action) => {
  switch (action.type) {
    case 'TICKER':
      return {
        ...state,
        ticker: {
          ...state.ticker,
          messages: [...state.ticker.messages, action.message],
        }
      };
  }
  return state;
}

module.exports = {tickerReducer};
