// @flow

import type {Coord, Action, State, MoveAction, ReverseTimeAction, Wall} from './types';

const hitsWall = (state: State, curPos: Coord, nextPos: Coord): boolean => {
  const wallCollisions = state.walls.filter(wall => {
    if (wall.isOpen) {
      return false;
    }
    if (curPos.x !== nextPos.x && wall.orientation == 'vertical') {
      const startDist = curPos.x - wall.start.x;
      const endDist = nextPos.x - wall.start.x;
      return curPos.y >= wall.start.y && curPos.y < wall.end.y && startDist != endDist &&
        ((startDist == -1 && endDist == 0) || (startDist == 0 && endDist == -1))
    } else if (curPos.y !== nextPos.y && wall.orientation == 'horizontal') {
      const startDist = curPos.y - wall.start.y;
      const endDist = nextPos.y - wall.start.y;
      return curPos.x >= wall.start.x && curPos.x < wall.end.x && startDist != endDist &&
        ((startDist == -1 && endDist == 0) || (startDist == 0 && endDist == -1))
    }
    return false;
  });
  return wallCollisions.length > 0;
}

const getAgentPositions = (level: Level): Array<?Coord> => {
  const {time, agents} = level;
  return agents.map((agent, i) => {
    // should only occur while reversing time
    if (i == 0 && agent.history[time] == null) {
      return agent.history[0];
    }
    return agent.history[time] || null;
  });
}

const getPlayerAgent = (level: Level): Agent => {
  return level.agents[0];
}

const getDoors = (state: State): Array<Wall> => {
  return state.level.walls.filter(wall => wall.doorID != null);
};

const getNextDoorID = (state: State): number => {
  let maxDoorID = 0;
  getDoors(state).forEach(door => door.doorID >= maxDoorID ? maxDoorID = door.doorID : null);
  return maxDoorID + 1;
};

const doorColors = [
  'orange',
  'green',
  'blue',
  'red',
  'brown',
  'pink',
  'cyan',
  'yellow',
  'purple',
  'steelblue',
];

const getDoorColors = (): Array<string> => {
  return doorColors;
}
const getDoorColor = (doorNum: number): string => {
  return doorColors[doorNum - 1];
};

const getRumbleOffset = (level): Coord => {
  const {shouldRumble, offset} = level.rumble;
  return {
    x: shouldRumble ? offset.x : 0,
    y: shouldRumble ? offset.y : 0,
  };
}

const isGameOver = (state): Object | false => {
  const {time, stepLimit, moveAttempts} = state.level;
  if (time >= stepLimit) {
    return {type: 'STEPS', text: 'You ran out of steps to reach the time machine!'};
  }
  let anyMovesLeft = false;
  for (const move in moveAttempts) {
    if (!moveAttempts[move]) {
      anyMovesLeft = true;
    }
  }
  if (!anyMovesLeft) {
    return {type: 'STUCK', text: "You've tried every possible move and now you're stuck!"};
  }
  return false;
}

const selectors = {
  getAgentPositions,
  getPlayerAgent,
  hitsWall,
  getDoors,
  getNextDoorID,
  getDoorColors,
  getDoorColor,
  getRumbleOffset,
  isGameOver,
};

window.selectors = selectors;
module.exports = selectors;
