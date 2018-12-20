const {floor, random} = Math;
const {makeProjectile} = require('./entities');

const fireCannonsReducer = (state, action) => {
  const {ship1, ship2} = state;

  const ship  = forShip1(action) ? ship1 : ship2;
  const canFire = ship.cannons.filter(cannon => {
    return cannon.side == action.side && cannon.step === 0;
  });
  const projectiles = [...state.projectiles];
  if (canFire.length > 0) {
    const cannon = canFire[floor(random() * canFire.length)];
    cannon.step = 50;
    ship.rVel = 0;
    projectiles.push(makeProjectile(ship, cannon, ship.rz))
  }

  return {
    ...state,
    ship1: forShip1(action) ? ship : ship1,
    ship2: forShip1(action) ? ship2 : ship,
    projectiles,
  }
};

const tickShipReducer = (ship) => {
  const xVel = ship.vel * Math.cos(Math.PI / 180 * ship.rz);
  const yVel = ship.vel * Math.sin(Math.PI / 180 * ship.rz);
  return {
    ...ship,
    cannons: ship.cannons.map(cannon => {
      cannon.step = cannon.step > 0 ? cannon.step - 1 : 0;
      return cannon;
    }),
    pos: {x: ship.pos.x + xVel, y: ship.pos.y + yVel},
    rz: ship.rz + ship.rVel
  };
};

const turnShipReducer = (ship, action) => {
  return {
    ...ship,
    rVel: action.dir
  };
};

const forShip1 = (action) => action.ship === 'ship1';

module.exports = {
  fireCannonsReducer,
  tickShipReducer,
  turnShipReducer,
};
