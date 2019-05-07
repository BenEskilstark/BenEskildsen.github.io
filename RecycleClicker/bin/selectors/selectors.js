'use strict';

// money is stored in cents to avoid floating point nonsense
// magic for taking in either state or a random money amount
var getDisplayMoney = function getDisplayMoney(value) {
  var money = value;
  if (typeof value != 'number') {
    money = value.money.cur;
  }
  return '$' + (money / 100).toFixed(0);
};

module.exports = {
  getDisplayMoney: getDisplayMoney
};