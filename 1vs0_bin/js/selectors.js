// @flow

const getScores = (state) => {
  const scores = [0, 0];
  state.memory.forEach(bit => scores[bit]++);
  return scores;
};

const getPlayerPointers = (state) => {
  const playerPointers =[[], []];
  for (let i = 0; i < state.memory.length; i++) {
    const pointer = state.pointers[i];
    if (pointer) playerPointers[pointer.player].push(pointer);
  }
  return playerPointers;
};

const isAllocated = (pointers, i) => {
  let isAllocated = false;
  pointers.forEach(pointer => {
    if (i >= pointer.pointer && i < pointer.pointer + pointer.size) {
      isAllocated = true;
    }
  });
  return isAllocated;
};

module.exports = {
  isAllocated,
  getScores,
  getPlayerPointers,
}
