// @flow

import type {State, Location, Sortie} from 'types';

const getDate = (state: State): string => {
  const {day} = state;
  if (day <= 21) {
    return 'July ' + (day + 10) + ', 1940';
  }
  if (day > 21 && day <= 52) {
    return 'August ' + (day - 21) + ', 1940';
  }

  return 'September ' + (day - 52) + ', 1940';
};

const getTotalPlanes = (state: State): number => {
  return state.planes;
};

const getAvailablePlanes = (state: State): number => {
  let total = state.planes;
  for (const sortie of state.sorties) {
    total -= sortie.planes;
  }
  return total;
};

const getTotalCivilians = (state: State): number => {
  let totalCivilians = 0;
  for (const name in state.locations) {
    totalCivilians += state.locations[name].civilians;
  }
  return totalCivilians;
};

const getTotalCasualties = (state: State): number => {
  let totalCasualties = 0;
  for (const name in state.locations) {
    totalCasualties += state.locations[name].casualties;
  }
  return totalCasualties;
};

const getLastNTickers = (state: State, n: number): Array<string> => {
  return state.ticker.slice(-1 * n);
}

module.exports = {
  getDate,
  getTotalPlanes,
  getAvailablePlanes,
  getTotalCivilians,
  getTotalCasualties,
  getLastNTickers,
}
