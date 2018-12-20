'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./utils'),
    getCol = _require.getCol;

var canPlacePiece = function canPlacePiece(state, piece) {
  var board = state.board;
  var x = piece.x,
      y = piece.y,
      player = piece.player,
      size = piece.size;

  var stack = board[x][y];
  if (!stack[0]) return true;
  return stack[0].size > piece.size;
};

var canRemovePiece = function canRemovePiece(state, x, y, player) {
  var board = state.board;

  var stack = board[x][y];
  if (!stack[0]) return false;
  return stack[0].player == player;
};

var hasWon = function hasWon(state) {
  var board = state.board;
  // rows and cols

  for (var i = 0; i < 3; i++) {
    if (samePlayer3.apply(undefined, _toConsumableArray(board[i]))) {
      return board[i][0][0].player;
    }
    if (samePlayer3.apply(undefined, _toConsumableArray(getCol(board, i)))) {
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

var samePlayer = function samePlayer(a, b) {
  return a && b && a.player == b.player;
};

var samePlayer3 = function samePlayer3(a, b, c) {
  return a && b && c && a.player == b.player && b.player == c.player;
};

module.exports = {
  canPlacePiece: canPlacePiece,
  canRemovePiece: canRemovePiece,
  samePlayer: samePlayer,
  hasWon: hasWon
};