// @flow

export type Grid = Array<Array<number>>;

import type {Tile} from './index';

let ID = 0;

// represent all the tiles as a grid for conveniently inserting new tiles
// or for finding neighbors
const GridOperations = {

  toGrid(tiles: Array<Tile>, width: number, height: number): Grid {
    const grid = [];
    for (let x = 0; x < width; x++) {
      const col = [];
      for (let y = 0; y < height; y++) {
        col.push(0);
      }
      grid.push(col);
    }
    tiles.forEach(tile => grid[tile.x][tile.y] = tile.value);

    return grid;
  },

  // returns grid with val inserted at a random free position
  insert: (tiles: Array<Tile>, val: number): Tile => {
    // shhhh convenience copy pasta below
    const grid = [];
    for (let x = 0; x < 4; x++) {
      const col = [];
      for (let y = 0; y < 4; y++) {
        col.push(0);
      }
      grid.push(col);
    }
    tiles.forEach(tile => grid[tile.x][tile.y] = tile.value);

    // make a tile at a free position
    const free = [];
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        if (grid[x][y] === 0) {
          free.push({x, y});
        }
      }
    }
    const pos = free[Math.round(Math.random() * (free.length - 1))];

    return {id: ID++, value: val, x: pos.x, y: pos.y, combined: false};
  }

}


module.exports = GridOperations
