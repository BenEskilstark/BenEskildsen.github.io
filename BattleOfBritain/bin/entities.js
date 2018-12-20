'use strict';

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var _require = require('./settings');

_objectDestructuringEmpty(_require);

var getInitialState = function getInitialState() {
  var initialState = {
    locations: {
      london: {
        name: 'london',
        label: 'London',
        civilians: 1000000,
        casualties: 0
      },
      aircommand: {
        name: 'aircommand',
        label: 'Air Command',
        civilians: 10000,
        casualties: 0
      },
      radarstation: {
        name: 'radarstation',
        label: 'Radar Station',
        civilians: 5000,
        casualties: 0
      }
    },

    sorties: [],
    planes: 300,

    enemy: {
      planes: 1000,
      missions: []
    },

    day: 0, // July 10, 1940
    ticker: []
  };

  initialState.enemy.missions = enemyMissions(initialState);
  return initialState;
};

var enemyMissions = function enemyMissions(state) {
  var planes = state.enemy.planes;

  switch (state.day) {
    case 0:
      return [{ planes: 300, target: 'london' }];
    case 1:
      return [{ planes: 400, target: 'london' }];
    case 2:
      return [{ planes: 200, target: 'london' }, { planes: 100, target: 'aircommand' }];
    case 3:
    case 4:
    default:
      return [{ planes: planes, target: 'london' }];
  }
};

module.exports = {
  getInitialState: getInitialState,
  enemyMissions: enemyMissions
};