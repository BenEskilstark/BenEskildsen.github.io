'use strict';

var React = require('React');

var Card = require('./ui/components/Card.react');

// money is stored in cents to avoid floating point nonsense
// magic for taking in either state or a random money amount
var getDisplayMoney = function getDisplayMoney(value) {
  var money = value;
  if (typeof value != 'number') {
    money = value.money.cur;
  }
  return '$' + (money / 100).toFixed(0);
};

function maybe(state, component, visibilityProperty) {
  if (state.ui[visibilityProperty] || state.ui.godMode) {
    return component;
  }
  return React.createElement(Card, null);
}

module.exports = {
  getDisplayMoney: getDisplayMoney,
  maybe: maybe
};