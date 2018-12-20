"use strict";

var getScores = function getScores(state) {
  var scores = [0, 0];
  state.memory.forEach(function (bit) {
    return scores[bit]++;
  });
  return scores;
};

var getPlayerPointers = function getPlayerPointers(state) {
  var playerPointers = [[], []];
  for (var i = 0; i < state.memory.length; i++) {
    var pointer = state.pointers[i];
    if (pointer) playerPointers[pointer.player].push(pointer);
  }
  return playerPointers;
};

var isAllocated = function isAllocated(pointers, i) {
  var isAllocated = false;
  pointers.forEach(function (pointer) {
    if (i >= pointer.pointer && i < pointer.pointer + pointer.size) {
      isAllocated = true;
    }
  });
  return isAllocated;
};

module.exports = {
  isAllocated: isAllocated,
  getScores: getScores,
  getPlayerPointers: getPlayerPointers
};