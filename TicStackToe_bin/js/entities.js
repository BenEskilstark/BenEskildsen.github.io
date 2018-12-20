// @flow

const {initMatrix} = require('./utils');

import type {State, Player, Board, Piece} from 'types';

const getInitialState = (): State => {
  return {
    turn: 0,
    board: initMatrix(() => [], 3, 3),
    offset: 0,
  }
};

module.exports = {
  getInitialState,
}
