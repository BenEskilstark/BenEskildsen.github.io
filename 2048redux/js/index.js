// @flow

const {createStore} = require('redux');
const Game = require('./Game.react');
const React = require('react');
const ReactDOM = require('react-dom');
const GridOperations = require('./GridOperations');

import type {Grid} from './GridOperations';

/////////////////////////////////////////////////////////////////////////////
// set up redux
/////////////////////////////////////////////////////////////////////////////
export type Action = MoveAction | GameOverAction | InsertAction;
type MoveAction = {
  type: 'MOVE',
  dir: {['x' | 'y']: number},
}
type GameOverAction = {
  type: 'GAMEOVER',
  won: boolean,
}
type InsertAction = {
  type: 'INSERT',
  value: number,
}

export type Tile = {
  value: number,
  id: number,
  combined: boolean,
  x: number,
  y: number,
}

export type State = {
  tiles: Array<Tile>,
  score: number,
}

// actionHandler is the root reducer
const actionHandler = ((state: State, action: Action): State => {
  // initial state
  if (typeof state === 'undefined') {
    return {
      tiles: [GridOperations.insert([], 2)],
      score: 2,
    };
  }

  switch (action.type) {
    case 'GAMEOVER' :
      return {
        ...state,
        tiles: [GridOperations.insert([], 2)],
        score: 2,
      };
    case 'MOVE':
      return {
        ...state,
        tiles: moveReducer(state.tiles, action),
        score: state.tiles.reduce((max, tile) => tile.value > max ? tile.value : max)
      };
    case 'INSERT':
      return {
        ...state,
        tiles: insertReducer(state.tiles, action),
      };
  }

});

// shhhh this is supposed to be pure
const insertReducer = (tiles: Array<Tiles>, action: InsertAction): Tiles => {
  tiles.forEach(tile => tile.combined = false);
  return tiles.concat([GridOperations.insert(tiles, action.value)]);
};

// shhhh this is supposed to be pure
const moveReducer = (tiles: Array<Tiles>, action: MoveAction): Tiles => {
  const grid = GridOperations.toGrid(tiles, 4, 4);
  const nextTiles = [];
  for (const dir in action.dir) {
    const mult = action.dir[dir];
    tiles.sort((a, b) => (a[dir] - b[dir]) * mult);
    for (let i = 0, tile; tile = tiles[i]; i++) {
      if (
        ((tile[dir] > 0 && mult > 0) || (tile[dir] < 3 && mult < 0)) && // in bounds
        getNeighbor(nextTiles, tile, action.dir) === null // no neighbor
      ) {
        tile[dir] -= action.dir[dir];
        nextTiles.push(tile);
        continue;
      }
      const neighbor = getNeighbor(nextTiles, tile, action.dir);
      if (!tile.combined && neighbor && !neighbor.combined && neighbor.value === tile.value) {
        neighbor.value *= 2;
        neighbor.combined = true;
      } else {
        nextTiles.push(tile);
      }
    }
  }
  return nextTiles;
};

// helper for if a tile is about to hit a neighbor
const getNeighbor = (tiles: Array<Tile>, tile: Tile, dir: {['x'| 'y']: number}): ?Tile => {
  let neighborTile = null;
  tiles.forEach(t => {
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
const store = createStore(actionHandler);
window.store = store;

// helper to dispatch a move action for a key iff the key is an arrow key
// action creator helpers are prefixed with bound- and call store.dispatch
// they may also have side-effects, if convenient
const boundMove = (keyCode: number): void => {
  let toDispatch = null;
  switch (keyCode) {
    case 37: // left
      toDispatch = () => store.dispatch({type: 'MOVE', dir: {x: 1}});
      break;
    case 38: // up
      toDispatch = () => store.dispatch({type: 'MOVE', dir: {y: 1}});
      break;
    case 39: // right
      toDispatch = () => store.dispatch({type: 'MOVE', dir: {x: -1}});
      break;
    case 40: // down
      toDispatch = () => store.dispatch({type: 'MOVE', dir: {y: -1}});
      break;
  }

  if (toDispatch != null) {
    let count = 0;
    const interval = setInterval(() => {
        toDispatch();
        if ((count++) == 3) {
          store.dispatch({type: 'INSERT', value: 2});
          clearInterval(interval);
        }
      },
      100,
    );
  }
}

/////////////////////////////////////////////////////////////////////////////
// set up react
/////////////////////////////////////////////////////////////////////////////
ReactDOM.render(
  <Game
    store={store}
  />,
  document.getElementById('container'),
);

document.onkeydown = (ev) => {
  boundMove(ev.keyCode);
}

