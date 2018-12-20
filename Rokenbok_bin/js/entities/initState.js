// @flow

const {
  VIEW_WIDTH, VIEW_HEIGHT,
  INIT_VIEW_X, INIT_VIEW_Y,
} = require('../settings');
const {make} = require('./makeEntity');

const FAC_POS_X = 400;
const FAC_POS_Y = 400;

const getInitialState = (): State => {
  return {
    running: true,
    entities: [
      make('base', 0, 0),
      make('truck', -50, -50),
      make('miner', 75, -50),
      make('factory', FAC_POS_X, FAC_POS_Y),
    ],
    bokEntities: seedBoks(),
    automatedTrucks: false,
    placing: null,
    startTime: Date.now(),
    bokMilestones: [],
    nextBokMilestone: 10,
    view: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      x: INIT_VIEW_X,
      y: INIT_VIEW_Y,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0,
      shouldRender: true,
      image: null,
      imgCount: 0,
    }
  };
};

const seedBoks = () => {
  const boks = [];
  for (let x = -1000; x < 1000; x+=5) {
    for (let y = -1000; y < 1000; y+=5) {
      if (
        Math.sqrt(x * x + y * y) >= 200 &&
        Math.sqrt((x-FAC_POS_X) * (x-FAC_POS_X) + (y-FAC_POS_Y) * (y-FAC_POS_Y)) >= 600
      ) {
        boks.push(make('bok', x, y));
      }
    }
  }
  return boks;
};

module.exports = {
  getInitialState,
}
