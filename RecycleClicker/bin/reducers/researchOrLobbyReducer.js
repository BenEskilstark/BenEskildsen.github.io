'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var researchOrLobbyReducer = function researchOrLobbyReducer(state, action) {
  switch (action.type) {
    case 'RESEARCH':
    case 'LOBBY':
      var researchOrLobby = action.type.toLowerCase();
      var num = action.num != null ? action.num : 1;
      return _extends({}, state, _defineProperty({}, researchOrLobby, _extends({}, state[researchOrLobby], {
        cur: state[researchOrLobby].cur + num
      })));
    case 'RESEARCH_GREEDY':
      {
        // only if you can afford it and it exists
        if (state.research.greedyOptions.length == 0) {
          return state;
        }
        if (state.research.cur < state.research.greedyOptions[0].cost) {
          return state;
        }
        var option = state.research.greedyOptions.shift();
        return _extends({}, state, {
          research: _extends({}, state.research, {
            cur: state.research.cur - option.cost,
            greedyOptions: state.research.greedyOptions,
            justResearched: option
          })
        });
      }
    case 'RESEARCH_GOOD':
      {
        // only if you can afford it and it exists
        if (state.research.goodOptions.length == 0) {
          return state;
        }
        if (state.research.cur < state.research.goodOptions[0].cost) {
          return state;
        }
        var _option = state.research.goodOptions.shift();
        return _extends({}, state, {
          research: _extends({}, state.research, {
            cur: state.research.cur - _option.cost,
            goodOptions: state.research.goodOptions,
            justResearched: _option
          })
        });
      }
    case 'LOBBY_GREEDY':
      {
        // only if you can afford it and it exists
        if (state.lobby.greedyOptions.length == 0) {
          return state;
        }
        if (state.lobby.cur < state.lobby.greedyOptions[0].cost) {
          return state;
        }
        var _option2 = state.lobby.greedyOptions.shift();
        return _extends({}, state, {
          lobby: _extends({}, state.lobby, {
            cur: state.lobby.cur - _option2.cost,
            greedyOptions: state.lobby.greedyOptions,
            justResearched: _option2
          })
        });
      }
    case 'LOBBY_GOOD':
      {
        // only if you can afford it and it exists
        if (state.lobby.goodOptions.length == 0) {
          return state;
        }
        if (state.lobby.cur < state.lobby.goodOptions[0].cost) {
          return state;
        }
        var _option3 = state.lobby.goodOptions.shift();
        return _extends({}, state, {
          lobby: _extends({}, state.lobby, {
            cur: state.lobby.cur - _option3.cost,
            goodOptions: state.lobby.goodOptions,
            justResearched: _option3
          })
        });
      }
    case 'REMOVE_JUST_RESEARCHED':
      {
        var _researchOrLobby = action.researchOrLobby;
        return _extends({}, state, _defineProperty({}, _researchOrLobby, _extends({}, state[_researchOrLobby], {
          justResearched: null
        })));
      }
  }
};

module.exports = { researchOrLobbyReducer: researchOrLobbyReducer };