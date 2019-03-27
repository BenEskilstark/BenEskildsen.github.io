'use strict';

var hitsWall = function hitsWall(state, curPos, nextPos) {
  var wallCollisions = state.walls.filter(function (wall) {
    if (wall.isOpen) {
      return false;
    }
    if (curPos.x !== nextPos.x && wall.orientation == 'vertical') {
      var startDist = curPos.x - wall.start.x;
      var endDist = nextPos.x - wall.start.x;
      return curPos.y >= wall.start.y && curPos.y < wall.end.y && startDist != endDist && (startDist == -1 && endDist == 0 || startDist == 0 && endDist == -1);
    } else if (curPos.y !== nextPos.y && wall.orientation == 'horizontal') {
      var _startDist = curPos.y - wall.start.y;
      var _endDist = nextPos.y - wall.start.y;
      return curPos.x >= wall.start.x && curPos.x < wall.end.x && _startDist != _endDist && (_startDist == -1 && _endDist == 0 || _startDist == 0 && _endDist == -1);
    }
    return false;
  });
  return wallCollisions.length > 0;
};

var getAgentPositions = function getAgentPositions(level) {
  var time = level.time,
      agents = level.agents;

  return agents.map(function (agent, i) {
    // should only occur while reversing time
    if (i == 0 && agent.history[time] == null) {
      return agent.history[0];
    }
    return agent.history[time] || null;
  });
};

var getPlayerAgent = function getPlayerAgent(level) {
  return level.agents[0];
};

var getDoors = function getDoors(state) {
  return state.level.walls.filter(function (wall) {
    return wall.doorID != null;
  });
};

var getNextDoorID = function getNextDoorID(state) {
  var maxDoorID = 0;
  getDoors(state).forEach(function (door) {
    return door.doorID >= maxDoorID ? maxDoorID = door.doorID : null;
  });
  return maxDoorID + 1;
};

var doorColors = ['orange', 'green', 'blue', 'red', 'brown', 'pink', 'cyan', 'yellow', 'purple', 'steelblue'];

var getDoorColors = function getDoorColors() {
  return doorColors;
};
var getDoorColor = function getDoorColor(doorNum) {
  return doorColors[doorNum - 1];
};

var getRumbleOffset = function getRumbleOffset(level) {
  var _level$rumble = level.rumble,
      shouldRumble = _level$rumble.shouldRumble,
      offset = _level$rumble.offset;

  return {
    x: shouldRumble ? offset.x : 0,
    y: shouldRumble ? offset.y : 0
  };
};

var isGameOver = function isGameOver(state) {
  var _state$level = state.level,
      time = _state$level.time,
      stepLimit = _state$level.stepLimit,
      moveAttempts = _state$level.moveAttempts;

  if (time >= stepLimit) {
    return { type: 'STEPS', text: 'You ran out of steps to reach the time machine!' };
  }
  var anyMovesLeft = false;
  for (var move in moveAttempts) {
    if (!moveAttempts[move]) {
      anyMovesLeft = true;
    }
  }
  if (!anyMovesLeft) {
    return { type: 'STUCK', text: "You've tried every possible move and now you're stuck!" };
  }
  return false;
};

var selectors = {
  getAgentPositions: getAgentPositions,
  getPlayerAgent: getPlayerAgent,
  hitsWall: hitsWall,
  getDoors: getDoors,
  getNextDoorID: getNextDoorID,
  getDoorColors: getDoorColors,
  getDoorColor: getDoorColor,
  getRumbleOffset: getRumbleOffset,
  isGameOver: isGameOver
};

window.selectors = selectors;
module.exports = selectors;