// @flow

const {getPlayerAgent} = require('../selectors/selectors.js');

import type {State, Action} from './types';

const INIT_SIZE = 5;
const INIT_THETA = 0;
const SIZE_INC = 7.5;

const reverseTimeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'REVERSE_TIME':
      return {
        ...state,
        level: reverseTimeFn(state.level),
      };
    case 'START_REVERSE_TIME_ANIMATION':
      return {
        ...state,
        level: {
          ...state.level,
          reverseTime: {
            ...state.level.reverseTime,
            count: action.count,
            max: action.count,
            size: INIT_SIZE,
            theta: INIT_THETA,
          },
        },
      };
    case 'REVERSE_TIME_ANIMATION': {
      if (!state.level.reverseTime || state.level.reverseTime.count == 0) {
        return {
          ...state,
          level: {
            ...state.level,
            reverseTime: {
              ...state.level.reverseTime,
              count: 0,
              shouldAnimate: false,
            },
          },
        };
      }

      const {size, count, max, maxTime, theta} = state.level.reverseTime;
      const time = Math.round(count/max * maxTime);
      return {
        ...state,
        level: {
          ...state.level,
          time,
          reverseTime: {
            ...state.level.reverseTime,
            count: count - 1,
            size: count < max / 2
              ? INIT_SIZE + count * SIZE_INC
              : (max - count) * SIZE_INC + INIT_SIZE,
            theta: theta + (2 * Math.PI / max),
          },
        },
      };
    }
  }
};

function reverseTimeFn(level) {
  const latestPos = [...getPlayerAgent(level).history].pop();

  // can't reverse time if you haven't reached the target yet
  if (level.target.reached < 1) {
    return level;
  }

  // check whether going back in time would cause a collision and prevent it
  for (let i = 0; i < level.agents.length; i++) {
    const agentPos = level.agents[i].history[0];
    if (latestPos.x == agentPos.x && latestPos.y == agentPos.y) {
      return collision(level);
    }
  }

  // close all doors
  const {walls} = level;
  walls.forEach(wall => wall.isOpen = false);

  return {
    ...level,
    prevTime: level.time,
    // time: 0, // the animation does this
    numReversals: level.numReversals + 1,
    agents: [{history: [latestPos]}, ...level.agents],
    walls,
    reverseTime: {
      shouldAnimate: true,
      count: -1,
      maxTime: level.time,
    }
  }
};

const collision = (level) => {
  return {
    ...level,
    rumble: {
      shouldRumble: true,
      offset: {x: 0, y: 0},
      count: -1,
    },
    moveAttempts: {
      ...level.moveAttempts,
      revTime: true,
    },
  };
}

module.exports = {reverseTimeReducer};
