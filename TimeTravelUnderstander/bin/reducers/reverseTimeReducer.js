'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../selectors/selectors.js'),
    getPlayerAgent = _require.getPlayerAgent;

var INIT_SIZE = 5;
var INIT_THETA = 0;
var SIZE_INC = 7.5;

var reverseTimeReducer = function reverseTimeReducer(state, action) {
  switch (action.type) {
    case 'REVERSE_TIME':
      return _extends({}, state, {
        level: reverseTimeFn(state.level)
      });
    case 'START_REVERSE_TIME_ANIMATION':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          reverseTime: _extends({}, state.level.reverseTime, {
            count: action.count,
            max: action.count,
            size: INIT_SIZE,
            theta: INIT_THETA
          })
        })
      });
    case 'REVERSE_TIME_ANIMATION':
      {
        if (!state.level.reverseTime || state.level.reverseTime.count == 0) {
          // close all doors
          var walls = state.level.walls;

          walls.forEach(function (wall) {
            return wall.isOpen = false;
          });

          return _extends({}, state, {
            level: _extends({}, state.level, {
              reverseTime: _extends({}, state.level.reverseTime, {
                count: 0,
                shouldAnimate: false
              })
            })
          });
        }

        var _state$level$reverseT = state.level.reverseTime,
            size = _state$level$reverseT.size,
            count = _state$level$reverseT.count,
            max = _state$level$reverseT.max,
            maxTime = _state$level$reverseT.maxTime,
            theta = _state$level$reverseT.theta;

        var time = Math.round(count / max * maxTime);
        return _extends({}, state, {
          level: _extends({}, state.level, {
            time: time,
            reverseTime: _extends({}, state.level.reverseTime, {
              count: count - 1,
              size: count < max / 2 ? INIT_SIZE + count * SIZE_INC : (max - count) * SIZE_INC + INIT_SIZE,
              theta: theta + 2 * Math.PI / max
            })
          })
        });
      }
  }
};

function reverseTimeFn(level) {
  var latestPos = [].concat(_toConsumableArray(getPlayerAgent(level).history)).pop();

  // can't reverse time if you haven't reached the target yet
  if (level.target.reached < 1) {
    return level;
  }

  // check whether going back in time would cause a collision and prevent it
  for (var i = 0; i < level.agents.length; i++) {
    var agentPos = level.agents[i].history[0];
    if (latestPos.x == agentPos.x && latestPos.y == agentPos.y) {
      return collision(level);
    }
  }

  return _extends({}, level, {
    prevTime: level.time,
    // time: 0, // the animation does this
    numReversals: level.numReversals + 1,
    agents: [{ history: [latestPos] }].concat(_toConsumableArray(level.agents)),
    reverseTime: {
      shouldAnimate: true,
      count: -1,
      maxTime: level.time
    }
  });
};

var collision = function collision(level) {
  return _extends({}, level, {
    rumble: {
      shouldRumble: true,
      offset: { x: 0, y: 0 },
      count: -1
    },
    moveAttempts: _extends({}, level.moveAttempts, {
      revTime: true
    })
  });
};

module.exports = { reverseTimeReducer: reverseTimeReducer };