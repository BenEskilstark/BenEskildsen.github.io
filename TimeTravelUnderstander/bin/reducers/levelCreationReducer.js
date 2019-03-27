'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../state/helpers.js'),
    mkWall = _require.mkWall;

var levelCreationReducer = function levelCreationReducer(state, action) {
  var agents = state.level.agents;
  switch (action.type) {
    case 'ADD_WALL':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          walls: [].concat(_toConsumableArray(state.level.walls), [mkWall(action.x1, action.y1, action.x2, action.y2)])
        })
      });
    case 'DELETE_WALL':
      {
        var x1 = action.x1,
            y1 = action.y1,
            x2 = action.x2,
            y2 = action.y2;

        var walls = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = state.level.walls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var wall = _step.value;
            var start = wall.start,
                end = wall.end;

            if (start.x == x1 && start.y == y1 && end.x == x2 && end.y == y2) {
              continue;
            }
            walls.push(wall);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return _extends({}, state, {
          level: _extends({}, state.level, {
            walls: walls
          })
        });
      }
    case 'ADD_DOOR':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          walls: [].concat(_toConsumableArray(state.level.walls), [mkWall(action.x1, action.y1, action.x2, action.y2, action.doorID)])
        })
      });
    case 'ADD_BUTTON':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          buttons: [].concat(_toConsumableArray(state.level.buttons), [{ position: { x: action.x, y: action.y }, doorID: action.doorID, pressed: false }])
        })
      });
    case 'SET_STEP_LIMIT':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          stepLimit: action.stepLimit
        })
      });
    case 'SET_START_LOCATION':
      var _agents = state.level.agents;
      var agent = _agents[0];
      var agentLocation = agent.history[agent.history.length - 1];
      _agents[_agents.length - 1].history[0] = agentLocation;
      return _extends({}, state, {
        level: _extends({}, state.level, {
          agents: _agents
        })
      });
    case 'SET_TARGET_LOCATION':
      return _extends({}, state, {
        level: _extends({}, state.level, {
          target: {
            reached: 0,
            pos: { x: action.x, y: action.y }
          }
        })
      });
  }
};

module.exports = { levelCreationReducer: levelCreationReducer };