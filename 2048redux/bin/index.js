'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('redux'),
    createStore = _require.createStore;

var Game = require('./Game.react');
var React = require('react');
var ReactDOM = require('react-dom');
var GridOperations = require('./GridOperations');

/////////////////////////////////////////////////////////////////////////////
// set up redux
/////////////////////////////////////////////////////////////////////////////


// actionHandler is the root reducer
var actionHandler = function actionHandler(state, action) {
  // initial state
  if (typeof state === 'undefined') {
    return {
      tiles: [GridOperations.insert([], 2)],
      score: 2
    };
  }

  switch (action.type) {
    case 'GAMEOVER':
      return _extends({}, state, {
        tiles: [GridOperations.insert([], 2)],
        score: 2
      });
    case 'MOVE':
      return _extends({}, state, {
        tiles: moveReducer(state.tiles, action),
        score: state.tiles.reduce(function (max, tile) {
          return tile.value > max ? tile.value : max;
        })
      });
    case 'INSERT':
      return _extends({}, state, {
        tiles: insertReducer(state.tiles, action)
      });
  }
};

// shhhh this is supposed to be pure
var insertReducer = function insertReducer(tiles, action) {
  tiles.forEach(function (tile) {
    return tile.combined = false;
  });
  return tiles.concat([GridOperations.insert(tiles, action.value)]);
};

// shhhh this is supposed to be pure
var moveReducer = function moveReducer(tiles, action) {
  var grid = GridOperations.toGrid(tiles, 4, 4);
  var nextTiles = [];

  var _loop = function _loop(_dir) {
    var mult = action.dir[_dir];
    tiles.sort(function (a, b) {
      return (a[_dir] - b[_dir]) * mult;
    });
    for (var i = 0, tile; tile = tiles[i]; i++) {
      if ((tile[_dir] > 0 && mult > 0 || tile[_dir] < 3 && mult < 0) && // in bounds
      getNeighbor(nextTiles, tile, action.dir) === null // no neighbor
      ) {
          tile[_dir] -= action.dir[_dir];
          nextTiles.push(tile);
          continue;
        }
      var neighbor = getNeighbor(nextTiles, tile, action.dir);
      if (!tile.combined && neighbor && !neighbor.combined && neighbor.value === tile.value) {
        neighbor.value *= 2;
        neighbor.combined = true;
      } else {
        nextTiles.push(tile);
      }
    }
  };

  for (var _dir in action.dir) {
    _loop(_dir);
  }
  return nextTiles;
};

// helper for if a tile is about to hit a neighbor
var getNeighbor = function getNeighbor(tiles, tile, dir) {
  var neighborTile = null;
  tiles.forEach(function (t) {
    if (dir.x) {
      if (t.x + dir.x === tile.x && t.y === tile.y) {
        neighborTile = t;
      }
    } else {
      if (t.y + dir.y === tile.y && t.x === tile.x) {
        neighborTile = t;
      }
    }
  });
  return neighborTile;
};

// all state is here
var store = createStore(actionHandler);
window.store = store;

// helper to dispatch a move action for a key iff the key is an arrow key
// action creator helpers are prefixed with bound- and call store.dispatch
// they may also have side-effects, if convenient
var boundMove = function boundMove(keyCode) {
  var toDispatch = null;
  switch (keyCode) {
    case 37:
      // left
      toDispatch = function toDispatch() {
        return store.dispatch({ type: 'MOVE', dir: { x: 1 } });
      };
      break;
    case 38:
      // up
      toDispatch = function toDispatch() {
        return store.dispatch({ type: 'MOVE', dir: { y: 1 } });
      };
      break;
    case 39:
      // right
      toDispatch = function toDispatch() {
        return store.dispatch({ type: 'MOVE', dir: { x: -1 } });
      };
      break;
    case 40:
      // down
      toDispatch = function toDispatch() {
        return store.dispatch({ type: 'MOVE', dir: { y: -1 } });
      };
      break;
  }

  if (toDispatch != null) {
    var count = 0;
    var interval = setInterval(function () {
      toDispatch();
      if (count++ == 3) {
        store.dispatch({ type: 'INSERT', value: 2 });
        clearInterval(interval);
      }
    }, 100);
  }
};

/////////////////////////////////////////////////////////////////////////////
// set up react
/////////////////////////////////////////////////////////////////////////////
ReactDOM.render(React.createElement(Game, {
  store: store
}), document.getElementById('container'));

document.onkeydown = function (ev) {
  boundMove(ev.keyCode);
};