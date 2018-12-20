'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./entities'),
    getInitialState = _require.getInitialState,
    enemyMissions = _require.enemyMissions;

var max = Math.max,
    min = Math.min,
    ceil = Math.ceil,
    floor = Math.floor,
    random = Math.random,
    round = Math.round;

var _require2 = require('./utils'),
    logit = _require2.logit,
    randomIn = _require2.randomIn;

var _require3 = require('./settings'),
    MID_RATIO = _require3.MID_RATIO,
    CIV_DEATH_MAX = _require3.CIV_DEATH_MAX,
    MAX_SUCCESS = _require3.MAX_SUCCESS,
    DEFENDER_SURVIVE = _require3.DEFENDER_SURVIVE,
    ATTACKER_SURVIVE = _require3.ATTACKER_SURVIVE;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState();
  var locations = state.locations,
      sorties = state.sorties,
      enemy = state.enemy,
      day = state.day;

  switch (action.type) {
    case 'NIGHT':
      var nextState = computeBattles(state);
      return _extends({}, nextState, {
        sorties: [],
        enemy: _extends({}, nextState.enemy, {
          missions: enemyMissions(nextState)
        }),
        day: day + 1
      });
    case 'SORTIE':
      var _planes = action.planes,
          _target = action.target;

      state.sorties.push({ planes: _planes, target: _target });
      return _extends({}, state, {
        sorties: sorties
      });
  }
  return state;
};

var computeBattles = function computeBattles(state) {
  var locations = state.locations,
      sorties = state.sorties,
      enemy = state.enemy;

  var survivingDefenders = 0;
  var survivingAttackers = 0;
  var totalDefenders = 0;
  var totalAttackers = 0;
  for (var name in locations) {
    var defenders = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = sorties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var sortie = _step.value;

        if (sortie.target == name) {
          defenders += sortie.planes;
          totalDefenders += sortie.planes;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var attackers = 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = enemy.missions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _sortie = _step2.value;

        if (_sortie.target == name) {
          attackers += _sortie.planes;
          totalAttackers += _sortie.planes;
        }
      }

      ///////////////////////////////////////
      // Battle simulation

      // num successful attacks
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var successfulAttacks = 0;
    var totalCasualties = 0;
    var successProbability = 0.2 * logit(attackers / defenders, 1, MID_RATIO);
    for (var i = 0; i < attackers; i++) {
      if (random() < successProbability) {
        successfulAttacks++;
        // casualties
        var civilians = locations[name].civilians;

        var casualties = min(civilians, round(randomIn(1, CIV_DEATH_MAX)));
        totalCasualties += casualties;
        locations[name].civilians -= casualties;
        locations[name].casualties += casualties;
      }
    }

    // surviving planes
    var dKilled = 0;
    for (var _i = 0; _i < defenders; _i++) {
      if (random() < DEFENDER_SURVIVE) {
        survivingDefenders++;
      } else {
        dKilled++;
      }
    }
    var aKilled = 0;
    for (var _i2 = 0; _i2 < attackers; _i2++) {
      if (random() < ATTACKER_SURVIVE) {
        survivingAttackers++;
      } else {
        aKilled++;
      }
    }

    state.ticker.push(locations[name].label + ": " + dKilled + " defenders shot down out of " + defenders + ". " + aKilled + " enemies shot down out of " + attackers + ". " + totalCasualties + " civilians killed");
    ///////////////////////////////////////
  }
  state.planes = survivingDefenders + (state.planes - totalDefenders);
  state.enemy.planes = survivingAttackers + (state.enemy.planes - totalAttackers);
  return state;
};

module.exports = { rootReducer: rootReducer };