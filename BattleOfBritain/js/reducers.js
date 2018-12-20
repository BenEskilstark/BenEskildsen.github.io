// @flow

const {getInitialState, enemyMissions} = require('./entities');
const {max, min, ceil, floor, random, round} = Math;
const {logit, randomIn} = require('./utils');
const {MID_RATIO, CIV_DEATH_MAX, MAX_SUCCESS, DEFENDER_SURVIVE, ATTACKER_SURVIVE} = require('./settings');

import type {State, Location, Sortie} from 'types';

export type Action = NightAction | SortieAction;
export type NightAction = {type: 'NIGHT'};
export type SortieAction = {type: 'SORTIE', planes: number, target: string};

const rootReducer = (state: State, action: Action): State => {
	if (state === undefined) return getInitialState();
  const {locations, sorties, enemy, day} = state;
	switch (action.type) {
    case 'NIGHT':
      const nextState = computeBattles(state);
      return {
        ...nextState,
        sorties: [],
        enemy: {
          ...nextState.enemy,
          missions: enemyMissions(nextState),
        },
        day: day + 1,
      };
    case 'SORTIE':
      const {planes, target} = action;
      state.sorties.push({planes, target});
      return {
        ...state,
        sorties,
      };
	}
  return state;
};

const computeBattles = (state: State): State => {
  const {locations, sorties, enemy} = state;
  let survivingDefenders = 0;
  let survivingAttackers = 0;
  let totalDefenders = 0;
  let totalAttackers = 0;
  for (const name in locations) {
    let defenders = 0;
    for (const sortie of sorties) {
      if (sortie.target == name) {
        defenders += sortie.planes;
        totalDefenders += sortie.planes;
      }
    }
    let attackers = 0;
    for (const sortie of enemy.missions) {
      if (sortie.target == name) {
        attackers += sortie.planes;
        totalAttackers += sortie.planes;
      }
    }

    ///////////////////////////////////////
    // Battle simulation

    // num successful attacks
    let successfulAttacks = 0;
    let totalCasualties = 0;
    const successProbability = 0.2 * logit(attackers / defenders, 1, MID_RATIO);
    for (let i = 0; i < attackers; i++) {
      if (random() < successProbability) {
        successfulAttacks++;
        // casualties
        const {civilians} = locations[name];
        const casualties = min(civilians, round(randomIn(1, CIV_DEATH_MAX)));
        totalCasualties += casualties;
        locations[name].civilians -= casualties;
        locations[name].casualties += casualties;
      }
    }

    // surviving planes
    let dKilled = 0;
    for (let i = 0; i < defenders; i++) {
      if (random() < DEFENDER_SURVIVE) {
        survivingDefenders++;
      } else {
        dKilled++;
      }
    }
    let aKilled = 0;
    for (let i = 0; i < attackers; i++) {
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

module.exports = {rootReducer};
