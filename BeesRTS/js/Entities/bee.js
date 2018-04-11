
let beeIndex = 0;

function makeBee(subtype = 'worker', pos) {
  return {
    type: 'bee',
    age: 0,
    subtype: subtype,
    id: beeIndex++,
    radius: subtype == 'queen' ? 30 : 20,
    eggReadiness: 450, // queens lay an egg every 500 steps if they can

    pos: pos, // x, y world coordinates
    velocity: {x: 0, y: 0},
    accel: {x: 0, y: 0},
    flyingSpeed: 5,
    speed: 2.5, // general speed used to set velocity toward goal
    goal: null, // goal pos in x, y world coordinates
    goalsQueue: [],
    goalIndex: 0,
    angle: Math.random() * Math.PI * 2,

    spriteIndex: 0,

    carrying: null,
  };
}
