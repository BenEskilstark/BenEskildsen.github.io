// @flow

export type Action = TickAction | ScoreAction;

export type TickAction = {
  type: 'TICK',
};

export type ScoreAction = {
  type: 'SCORE',
  player: number,
};

export type AccelerationAction = {
  type: 'ACCELERATE',
  player: number,
};

module.exports = {
}
