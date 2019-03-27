// @flow

const initEmptyLevel = () => {
  return {
    level: Infinity,
    prevTime: -1,
    time: 0,
    numReversals: 0,
    agents: [{history: [{x: 3, y: 0}]}],
    walls: [
      // outer walls
      {orientation: 'horizontal', start: {x: 0, y: 0}, end: {x: 7, y: 0}},
      {orientation: 'horizontal', start: {x: 0, y: 7}, end: {x: 7, y: 7}},
      {orientation: 'vertical', start: {x: 0, y: 0}, end: {x: 0, y: 7}},
      {orientation: 'vertical', start: {x: 7, y: 0}, end: {x: 7, y: 7}},
    ],
    buttons: [],
    stepLimit: 1,
    target: {
      pos: {x: 0, y: 0},
      reached: 0,
    },
    rumble: {
      shouldRumble: false,
      offset: {x: 0, y: 0},
      count: 0,
    },
    moveAttempts: {
      left: false,
      right: false,
      up: false,
      down: false,
      revTime: false,
    },
  };
}

module.exports = {initEmptyLevel};
