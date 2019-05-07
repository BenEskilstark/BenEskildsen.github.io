// @flow

import type {State} from '../types';

// money is stored in cents to avoid floating point nonsense
// magic for taking in either state or a random money amount
const getDisplayMoney = (value: State | number): string => {
  let money = value;
  if (typeof value != 'number') {
    money = value.money.cur;
  }
  return '$' + (money/ 100).toFixed(0);
}


module.exports = {
  getDisplayMoney,
};
