// @flow

const {
  VIEW_WIDTH, VIEW_HEIGHT
} = require('./settings');
const {distance, vecToAngle} = require('./utils');
import type {State} from 'types';

const getSelectedEntities = (state: State): Array<Entity> => {
  return state.entities.filter(entity => entity.selected);
};

// convert given x, y in canvas coordinates to world coordinates based on the
// view position
const getWorldCoord = (state: State, x: number, y: number): {x: number, y: number} => {
  const {view} = state;
  return {
    x: (x - VIEW_WIDTH / 2) * view.width / VIEW_WIDTH - view.x,
    y: (y - VIEW_HEIGHT / 2) * view.height / VIEW_HEIGHT - view.y
  }
};

const thetaToNearestBase = (state: State, entity): number => {
  const bases = state.entities.filter(e => e.type == 'base' || e.type == 'factory');
  let theta = 0;
  let shortestDist = Infinity;
  for (let i = 0; i < bases.length; i++) {
    const dist = distance(entity, bases[i]);
    if (dist < shortestDist) {
      shortestDist = dist;
      const vec = {x: bases[i].x - entity.x, y: bases[i].y - entity.y};
      theta = vecToAngle(vec);
    }
  }
  return theta;
};

const getBokCollected = (state: State): number => {
  const factories = state.entities.filter(e => e.type == 'factory');
  let totalBokCollected = 0;
  for (const factory of factories) {
    totalBokCollected += factory.totalCollected
  }
  return totalBokCollected;
}

module.exports = {
  getSelectedEntities,
  getWorldCoord,
  thetaToNearestBase,
  getBokCollected,
}
