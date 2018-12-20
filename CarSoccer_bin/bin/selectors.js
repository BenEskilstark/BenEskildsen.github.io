'use strict';

var getCar = function getCar(state, player) {
  return state.entities.filter(function (entity) {
    return entity.type == 'car' && entity.player == player;
  })[0];
};

module.exports = {
  getCar: getCar
};