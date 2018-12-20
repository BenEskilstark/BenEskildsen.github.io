// @flow

export type State = {
  turn: Player,
  board: Board,
  offset: number, // for rumbling the board
};

export type Player = 0 | 1;

export type Board = Array<Array<Stack>>;
export type Stack = Array<Piece>;

export type Piece = {player: Player, size: number, x: number, y: number};
