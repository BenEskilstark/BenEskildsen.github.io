// @flow

const {mkWall} = require('../state/helpers.js');

import type {State, Action} from '../types';

const levelCreationReducer = (state: State, action: Action): State => {
  const agents = state.level.agents;
  switch (action.type) {
    case 'ADD_WALL':
      return {
        ...state,
        level: {
          ...state.level,
          walls: [
            ...state.level.walls,
            mkWall(action.x1, action.y1, action.x2, action.y2),
          ],
        },
      };
    case 'DELETE_WALL': {
      const {x1, y1, x2, y2} = action;
      const walls = [];
      for (const wall of state.level.walls) {
        const {start, end} = wall;
        if (start.x == x1 && start.y == y1 && end.x == x2 && end.y == y2) {
          continue;
        }
        walls.push(wall);
      }
      return {
        ...state,
        level: {
          ...state.level,
          walls,
        }
      };
    }
    case 'ADD_DOOR':
      return {
        ...state,
        level: {
          ...state.level,
          walls: [
            ...state.level.walls,
            mkWall(action.x1, action.y1, action.x2, action.y2, action.doorID),
          ],
        },
      };
    case 'ADD_BUTTON':
      return {
        ...state,
        level: {
          ...state.level,
          buttons: [
            ...state.level.buttons,
            {position: {x: action.x, y: action.y}, doorID: action.doorID, pressed: false},
          ]
        },
      };
    case 'SET_STEP_LIMIT':
      return {
        ...state,
        level: {
          ...state.level,
          stepLimit: action.stepLimit,
        },
      };
    case 'SET_START_LOCATION':
      const agents = state.level.agents;
      const agent = agents[0];
      const agentLocation = agent.history[agent.history.length - 1];
      agents[agents.length - 1].history[0] = agentLocation;
      return {
        ...state,
        level: {
          ...state.level,
          agents,
        },
      };
    case 'SET_TARGET_LOCATION':
      return {
        ...state,
        level: {
          ...state.level,
          target: {
            reached: 0,
            pos: {x: action.x, y: action.y},
          }
        }
      };
  }
};

module.exports = {levelCreationReducer};
