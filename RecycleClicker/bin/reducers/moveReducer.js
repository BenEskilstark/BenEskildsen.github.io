'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../selectors/selectors.js'),
    hitsWall = _require.hitsWall,
    getPlayerAgent = _require.getPlayerAgent;

var moveReducer = function moveReducer(state, action) {
  return _extends({}, state, {
    level: doMove(state.level, action)
  });
};

var doMove = function doMove(level, action) {
  var curPos = [].concat(_toConsumableArray(getPlayerAgent(level).history)).pop();
  var nextPos = {
    x: curPos.x + (action.dir.x || 0),
    y: curPos.y + (action.dir.y || 0)
  };

  // collisions with other agents
  var collisions = level.agents.filter(function (agent) {
    var prevPos = agent.history[level.time] || { x: null, y: null };
    var pos = agent.history[level.time + 1] || { x: null, y: null };
    return pos.x === nextPos.x && pos.y === nextPos.y ||
    // check for switching places (which is not allowed)
    prevPos.x === nextPos.x && prevPos.y === nextPos.y && pos.x === curPos.x && pos.y === curPos.y;
  });
  if (collisions.length > 0) {
    return _extends({}, level, {
      rumble: {
        shouldRumble: true,
        offset: { x: 0, y: 0 },
        count: -1
      },
      moveAttempts: _extends({}, level.moveAttempts, _defineProperty({}, action.key, true))
    });
  }

  if (hitsWall(level, curPos, nextPos)) {
    return _extends({}, level, {
      rumble: {
        shouldRumble: true,
        offset: { x: 0, y: 0 },
        count: -1
      },
      moveAttempts: _extends({}, level.moveAttempts, _defineProperty({}, action.key, true))
    });
  }

  // check if any agent hits a door
  var stuck = false;
  level.agents.forEach(function (agent) {
    var cur = agent.history[level.time];
    var next = agent.history[level.time + 1];
    if (next && cur && hitsWall(level, cur, next)) {
      stuck = true;
    }
  });
  if (stuck) {
    return _extends({}, level, {
      rumble: {
        shouldRumble: true,
        offset: { x: 0, y: 0 },
        count: -1
      },
      moveAttempts: _extends({}, level.moveAttempts, _defineProperty({}, action.key, true))
    });
  }

  // check if reached target location
  var pos = level.target.pos;

  if (level.target.reached == 0 && nextPos.x == pos.x && nextPos.y == pos.y) {
    level.target.reached++;
  } else {
    var agent1Pos = level.agents[level.agents.length - 1].history[level.time + 1];
    if (agent1Pos && agent1Pos.x == pos.x && agent1Pos.y == pos.y) {
      level.target.reached++;
    }
  }

  // update level
  level.agents[0].history.push(nextPos);
  level.prevTime = level.time;
  level.time++;

  level.agents.forEach(function (agent) {
    var cur = agent.history[level.time];
    if (!cur) {
      return;
    }
    level.buttons.forEach(function (button) {
      if (cur.x === button.position.x && cur.y === button.position.y) {
        button.pressed = true;
        level.walls.forEach(function (wall) {
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
    revTime: false
  };

  return level;
};

module.exports = { moveReducer: moveReducer };