'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

var moveReducer = function moveReducer(state, action) {
  var curPos = [].concat(_toConsumableArray(state.agents[0].history)).pop();
  var nextPos = {
    x: curPos.x + (action.dir.x || 0),
    y: curPos.y + (action.dir.y || 0)
  };

  // collisions with other agents
  var collisions = state.agents.filter(function (agent) {
    var prevPos = agent.history[state.time] || { x: null, y: null };
    var pos = agent.history[state.time + 1] || { x: null, y: null };
    return pos.x === nextPos.x && pos.y === nextPos.y || prevPos.x === nextPos.x && prevPos.y === nextPos.y;
  });
  if (collisions.length > 0) {
    return state;
  }

  if (hitsWall(state, curPos, nextPos)) {
    return state;
  }

  // check if any agent hits a wall/door
  var lose = false;
  state.agents.forEach(function (agent) {
    var cur = agent.history[state.time];
    var next = agent.history[state.time + 1];
    if (next && cur && hitsWall(state, cur, next)) {
      lose = true;
    }
  });
  if (lose) {
    console.log("you need to go back in time");
    return state;
  }

  state.agents[0].history.push(nextPos);
  state.prevTime = state.time;
  state.time++;

  state.agents.forEach(function (agent) {
    var cur = agent.history[state.time];
    if (!cur) {
      return;
    }
    state.buttons.forEach(function (button) {
      if (cur.x === button.position.x && cur.y === button.position.y) {
        button.pressed = true;
        state.walls.forEach(function (wall) {
          if (wall.doorID === button.doorID) {
            wall.isOpen = true;
          }
        });
      }
    });
  });

  return state;
};

var reverseTimeReducer = function reverseTimeReducer(state, action) {
  var latestPos = [].concat(_toConsumableArray(state.agents[0].history)).pop();
  var walls = state.walls;

  walls.forEach(function (wall) {
    return wall.isOpen = false;
  });
  return _extends({}, state, {
    prevTime: state.time,
    time: 0,
    numReversals: state.numReversals + 1,
    agents: [{ history: [latestPos] }].concat(_toConsumableArray(state.agents)),
    walls: walls
  });
};

module.exports = { moveReducer: moveReducer, reverseTimeReducer: reverseTimeReducer };