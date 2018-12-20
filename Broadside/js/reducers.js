const {makeShip} = require('./entities');
const {
  fireCannonsReducer,
  tickShipReducer,
  turnShipReducer,
} = require('./shipReducers');

const forShip1 = (action) => action.ship === 'ship1';

const rootReducer = (state, action) => {
	if (state === undefined) {
		return {
      width: 1440,
      height: 800,
			t: 0,
			ship1: makeShip(1, 1200, 550),
      ship2: makeShip(2, 250, 250),
			running: true,
      projectiles: [],
		};
	}

  const {ship1, ship2, projectiles} = state;

	switch (action.type) {
		case 'tick':
			return {
			  ...state,
				t: state.t + 1,
				ship1: tickShipReducer(ship1),
        ship2: tickShipReducer(ship2),
        projectiles: tickProjectilesReducer(projectiles, state.width, state.height),
			};
		case 'toggle':
		  return {
        ...state,
		    running: !state.running,
		  };
		case 'turn':
		  return {
		    ...state,
		    ship1: forShip1(action) ? turnShipReducer(ship1, action) : ship1,
        ship2: forShip1(action) ? ship2 : turnShipReducer(ship2, action),
		  };
		case 'fire':
		  return fireCannonsReducer(state, action);
	}
};

const tickProjectilesReducer = (projectiles, width, height) => {
  const filteredProjectiles = projectiles.filter(p => {
    return p.pos.x > 0 && p.pos.x < width && p.pos.y > 0 && p.pos.y < height;
  });
  return filteredProjectiles.map(p => {
    const speedVec = {
      x: p.speed * Math.cos(p.rz * Math.PI/180),
      y: p.speed * Math.sin(p.rz * Math.PI/180),
    };
    return {
      ...p,
      pos: {x: p.pos.x + speedVec.x, y: p.pos.y + speedVec.y},
    };
  });
};

module.exports = {rootReducer};
