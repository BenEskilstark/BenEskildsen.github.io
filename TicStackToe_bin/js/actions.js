// @flow

const {canPlacePiece, canRemovePiece} = require('./selectors');

export type Action = PlacePiece | MovePiece | Rumble;
export type PlacePiece = {
  type: 'PLACE_PIECE',
  piece: Piece,
};
export type RemovePiece = {
  type: 'REMOVE_PIECE',
  x: number,
  y: number,
};
export type Rumble = {
  type: 'RUMBLE',
};

const placePiece = (store, x, y, size): void => {
  const state = store.getState();
  const dispatch = store.dispatch;
  const {board, turn} = state;
  const player = turn;

  const piece = {player, x, y, size};
  if (canPlacePiece(state, piece)) {
    dispatch({type: 'PLACE_PIECE', piece});
    dispatch({type: 'END_TURN'});
  } else {
    dispatch({type: 'RUMBLE'});
  }
}

const movePiece = (store, fromX, fromY, x, y, size): void => {
  const state = store.getState();
  const dispatch = store.dispatch;
  const {board, turn} = state;
  const player = turn;

  const piece = {player, x, y, size};
  console.log("canRemove", canRemovePiece(state, fromX, fromY, player), "canPlace",  canPlacePiece(state, piece));
  if (canRemovePiece(state, fromX, fromY, player) && canPlacePiece(state, piece)) {
    dispatch({type: 'REMOVE_PIECE', x: fromX, y: fromY});
    dispatch({type: 'PLACE_PIECE', piece});
    dispatch({type: 'END_TURN'});
  } else {
    dispatch({type: 'RUMBLE'});
  }
}

window.placePiece = placePiece;
window.movePiece = movePiece;

module.exports = {
  placePiece,
  movePiece,
}
