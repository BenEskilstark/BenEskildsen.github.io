'use strict';

var _require = require('./utils'),
    initMatrix = _require.initMatrix;

var getInitialState = function getInitialState() {
  return {
    turn: 0,
    board: initMatrix(function () {
      return [];
    }, 3, 3),
    offset: 0
  };
};

module.exports = {
  getInitialState: getInitialState
};