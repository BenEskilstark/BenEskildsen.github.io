// @flow

const {hitsWall, getPlayerAgent} = require('../selectors/selectors.js');

import type {LevelState, State, MoveAction} from './types';

const moveReducer = (state: State, action: MoveAction): State => {
  return {
    ...state,
    level: doMove(state.level, action),
  };
}

const doMove = (level: LevelState, action: MoveAction): LevelState => {
  const curPos = [...getPlayerAgent(level).history].pop();
  const nextPos = {
    x: curPos.x + (action.dir.x || 0),
    y: curPos.y + (action.dir.y || 0),
  };

  // collisions with other agents
  const collisions = level.agents.filter(agent => {
    const prevPos = agent.history[level.time] || {x: null, y: null};
    const pos = agent.history[level.time+1] || {x: null, y: null};
    return (pos.x === nextPos.x && pos.y === nextPos.y)
      // check for switching places (which is not allowed)
      || (
        prevPos.x === nextPos.x && prevPos.y === nextPos.y &&
        pos.x === curPos.x && pos.y === curPos.y
      );
  });
  if (collisions.length > 0) {
    return {
      ...level,
      rumble: {
        shouldRumble: true,
        offset: {x: 0, y: 0},
        count: -1,
      },
      moveAttempts: {
        ...level.moveAttempts,
        [action.key]: true,
      },
    }
  }

  if (hitsWall(level, curPos, nextPos)) {
    return {
      ...level,
      rumble: {
        shouldRumble: true,
        offset: {x: 0, y: 0},
        count: -1,
      },
      moveAttempts: {
        ...level.moveAttempts,
        [action.key]: true,
      },
    }
  }

  // check if any agent hits a door
  let stuck = false;
  level.agents.forEach(agent => {
    const cur = agent.history[level.time];
    const next = agent.history[level.time + 1];
    if (next && cur && hitsWall(level, cur, next)) {
      stuck = true;
    }
  });
  if (stuck) {
    return {
      ...level,
      rumble: {
        shouldRumble: true,
        offset: {x: 0, y: 0},
        count: -1,
      },
      moveAttempts: {
        ...level.moveAttempts,
        [action.key]: true,
      },
    }
  }

  // check if reached target location
  const {pos} = level.target;
  if (level.target.reached == 0 && nextPos.x == pos.x && nextPos.y == pos.y) {
    level.target.reached++;
  } else {
    const agent1Pos = level.agents[level.agents.length - 1].history[level.time + 1];
    if (agent1Pos && agent1Pos.x == pos.x && agent1Pos.y == pos.y) {
      level.target.reached++;
    }
  }

  // update level
  level.agents[0].history.push(nextPos);
  level.prevTime = level.time;
  level.time++;

  level.agents.forEach(agent => {
    const cur = agent.history[level.time];
    if (!cur) {return}
    level.buttons.forEach(button => {
      if (cur.x === button.position.x && cur.y === button.position.y) {
        button.pressed = true;
        level.walls.forEach(wall => {
          if (wall.doorID === button.doorID) {
            wall.isOpen = true;
          }
        });
      }
    });
  });

  // successfully moved, so reset moveAttempts
  level.moveAttempts = {
    left: false,
    right: false,
    up: false,
    down: false,
    revTime: false,
  }

  return level;
};

module.exports = {moveReducer};
