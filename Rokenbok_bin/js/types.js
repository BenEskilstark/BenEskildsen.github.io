// @flow

export type Entity = {
  type: 'bok' | 'truck' | 'miner' | 'factory' | 'base';
  carrying: Array<Entity>;
  selected: boolean,
  x: number,
  y: number,
  speed: number,
  accel: number,
  thetaSpeed: number,
  theta: number, // radians
  prevTheta: number,
  prevX: number,
  prevY: number,
  recording: {
    recording: boolean,
    playing: boolean,
    returning: boolean, // returning to initialPos
    initialPos: {x: number, y: number, theta: number},
    tick: number,
    endTick: number,
    actions: {[tick: number]: Array<Action>},
  },
};

export type State = {
  running: boolean,
  entities: Array<Entity>, // no boks
  bokEntities: Array<Entity>, // boks only
  placing: ?string, // which entity type we're placing
  automatedTrucks: boolean,
  startTime: number,
  bokMilestones: Array<object>,
  nextBokMilestone: number,
  view: {
    width: number,
    height: number,
    x: number,
    y: number,
    dragging: boolean,
    dragStartX: number,
    dragStartY: number,
    shouldRender: boolean,
    image: Image,
  },
};
