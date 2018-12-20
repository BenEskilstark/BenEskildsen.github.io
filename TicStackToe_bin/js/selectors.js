// @flow

const {getCol} = require('./utils');

import type {State, Player, Board, Piece} from 'types';

const canPlacePiece = (state: State, piece: Piece): boolean => {
  const {board} = state;
  const {x, y, player, size} = piece;
  const stack = board[x][y];
  if (!stack[0]) return true;
  return stack[0].size > piece.size;
};

const canRemovePiece = (state: State, x: number, y: number, player: Player): boolean => {
  const {board} = state;
  const stack = board[x][y];
  if (!stack[0]) return false;
  return stack[0].player == player;
};

const hasWon = (state: State): ?Player => {
  const {board} = state;
  // rows and cols
  for (let i = 0; i < 3; i++) {
    if (samePlayer3(...board[i])) {
      return board[i][0][0].player;
    }
    if (samePlayer3(...getCol(board, i))) {
      return board[0][i][0].player;
    }
  }
  // diagonals
  if (samePlayer3(board[0][0][0], board[1][1][0], board[2][2][0])) {
    return board[1][1][0].player;
  }
  if (samePlayer3(board[0][2][0], board[1][1][0], board[2][0][0])) {
    return board[1][1][0].player;
  }
};

const samePlayer = (a: ?Piece, b: ?Piece): boolean => {
  return a && b && a.player == b.player;
};

const samePlayer3 = (a: ?Piece, b: ?Piece, c: ?Piece): boolean => {
  return a && b && c && a.player == b.player && b.player == c.player;
};

module.exports = {
  canPlacePiece,
  canRemovePiece,
  samePlayer,
  hasWon,
}
