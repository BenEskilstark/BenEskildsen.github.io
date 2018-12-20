// @flow

export type Entity = {
  x: number, y: number,
  speed: number, accel: number, theta: number,
  mass: number,
};

export type Ball = Entity & {radius: number, type: 'ball'};
export type Car = Entity & {
  type: 'car',
  player: number,
  width: number, height: number,
};

export type Goal = Entity & {
  type: 'goal',
  player: number,
  width: number, height: number,
}

export type State = {
  running: boolean,
  entities: Array<Entity>,
  score: Array<number>,
  fieldWidth: number,
  fieldHeight: number,
};
