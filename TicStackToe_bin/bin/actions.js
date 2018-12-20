'use strict';

var _require = require('./selectors'),
    canPlacePiece = _require.canPlacePiece,
    canRemovePiece = _require.canRemovePiece;

var placePiece = function placePiece(store, x, y, size) {
  var state = store.getState();
  var dispatch = store.dispatch;
  var board = state.board,
      turn = state.turn;

  var player = turn;

  var piece = { player: player, x: x, y: y, size: size };
  if (canPlacePiece(state, piece)) {
    dispatch({ type: 'PLACE_PIECE', piece: piece });
    dispatch({ type: 'END_TURN' });
  } else {
    dispatch({ type: 'RUMBLE' });
  }
};

var movePiece = function movePiece(store, fromX, fromY, x, y, size) {
  var state = store.getState();
  var dispatch = store.dispatch;
  var board = state.board,
      turn = state.turn;

  var player = turn;

  var piece = { player: player, x: x, y: y, size: size };
  console.log("canRemove", canRemovePiece(state, fromX, fromY, player), "canPlace", canPlacePiece(state, piece));
  if (canRemovePiece(state, fromX, fromY, player) && canPlacePiece(state, piece)) {
    dispatch({ type: 'REMOVE_PIECE', x: fromX, y: fromY });
    dispatch({ type: 'PLACE_PIECE', piece: piece });
    dispatch({ type: 'END_TURN' });
  } else {
    dispatch({ type: 'RUMBLE' });
  }
};

window.placePiece = placePiece;
window.movePiece = movePiece;

module.exports = {
  placePiece: placePiece,
  movePiece: movePiece
};