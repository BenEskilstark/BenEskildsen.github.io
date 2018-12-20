// @flow

const {getInitialState} = require('./entities');
const {oneOf, maybeMinus, minusToZero} = require('./utils');
const {ceil, floor, random, round} = Math;

import type {State, Player, Board, Piece} from 'types';
import type {Action, PlacePiece, RemovePiece, Rumble} from 'actions';

const rootReducer = (state: State, action: Action): State => {
	if (state === undefined) return getInitialState();
  const {turn, board, offset} = state;
	switch (action.type) {
    case 'PLACE_PIECE':
      let {piece} = action;
      board[piece.x][piece.y].unshift(piece);
      return state;
    case 'REMOVE_PIECE':
      let {x, y} = action;
      board[x][y].shift();
      return state;
    case 'RUMBLE':
      console.log('rumble -- illegal move');
      return {
        ...state,
        // offset: oneOf([-2, -1, 1, 2]) + offset,
      };
    case 'END_TURN':
      return {
        ...state,
        turn: (turn + 1) % 2,
      };
	}
  return state;
};

module.exports = {rootReducer};
