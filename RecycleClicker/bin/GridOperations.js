'use strict';

var ID = 0;

// represent all the tiles as a grid for conveniently inserting new tiles
// or for finding neighbors
var GridOperations = {
  toGrid: function toGrid(tiles, width, height) {
    var grid = [];
    for (var x = 0; x < width; x++) {
      var col = [];
      for (var y = 0; y < height; y++) {
        col.push(0);
      }
      grid.push(col);
    }
    tiles.forEach(function (tile) {
      return grid[tile.x][tile.y] = tile.value;
    });

    return grid;
  },


  // returns grid with val inserted at a random free position
  insert: function insert(tiles, val) {
    // shhhh convenience copy pasta below
    var grid = [];
    for (var x = 0; x < 4; x++) {
      var col = [];
      for (var y = 0; y < 4; y++) {
        col.push(0);
      }
      grid.push(col);
    }
    tiles.forEach(function (tile) {
      return grid[tile.x][tile.y] = tile.value;
    });

    // make a tile at a free position
    var free = [];
    for (var _x = 0; _x < grid.length; _x++) {
      for (var _y = 0; _y < grid[_x].length; _y++) {
        if (grid[_x][_y] === 0) {
          free.push({ x: _x, y: _y });
        }
      }
    }
    var pos = free[Math.round(Math.random() * (free.length - 1))];

    return { id: ID++, value: val, x: pos.x, y: pos.y, combined: false };
  }

};

module.exports = GridOperations;