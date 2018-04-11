
let grassIndex = 0;

function makeGrass(pos) {
  return {
    type: 'grass',
    age: 0,
    id: grassIndex++,

    pos: pos, // x, y world coordinates
    velocity: {x: 0, y: 0},
    spriteIndex: 0,
  };
}
