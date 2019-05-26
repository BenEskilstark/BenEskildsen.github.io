// @flow

import type {State} from './types';

const React = require('React');
const Card = require('./ui/components/Card.react');

// money is stored in cents to avoid floating point nonsense
// magic for taking in either state or a random money amount
const getDisplayMoney = (value: State | number): string => {
  let money = value;
  if (typeof value != 'number') {
    money = value.money.cur;
  }
  return '$' + (money / 100).toFixed(0);
}

function maybe(
  state: State,
  component: React.Node,
  visibilityProperty: string,
 ): ?React.Node {
  if (state.ui.gameOver) {
    return <Card />;
  }
  if (state.ui[visibilityProperty] || state.ui.godMode) {
    return component;
  }
  return <Card />;
}

module.exports = {
  getDisplayMoney,
  maybe,
};
