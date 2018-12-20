'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./entities'),
    getInitialState = _require.getInitialState;

var _require2 = require('./utils'),
    oneOf = _require2.oneOf,
    maybeMinus = _require2.maybeMinus,
    minusToZero = _require2.minusToZero;

var ceil = Math.ceil,
    floor = Math.floor,
    random = Math.random,
    round = Math.round;


var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState();
  var turn = state.turn,
      board = state.board,
      offset = state.offset;

  switch (action.type) {
    case 'PLACE_PIECE':
      var piece = action.piece;

      board[piece.x][piece.y].unshift(piece);
      return state;
    case 'REMOVE_PIECE':
      var x = action.x,
          y = action.y;

      board[x][y].shift();
      return state;
    case 'RUMBLE':
      console.log('rumble -- illegal move');
      return _extends({}, state);
    case 'END_TURN':
      return _extends({}, state, {
        turn: (turn + 1) % 2
      });
  }
  return state;
};

module.exports = { rootReducer: rootReducer };