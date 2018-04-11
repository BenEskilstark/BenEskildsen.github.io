
let flowerIndex = 0;

function makeFlower(pos) {
  return {
    type: 'flower',
    age: 0,
    id: flowerIndex++,

    pos: pos, // x, y grid coordinates
    velocity: {x: 0, y: 0},
    spriteIndex: 0,
    nectarRate: 100, // per trip
    contains: 100,
  };
}
