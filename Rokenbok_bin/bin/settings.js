'use strict';

module.exports = {
  TICK_TIME: 50,
  ZOOM_DEBOUNCE: 4, // number of ticks before removing image and rendering entities again
  BACKGROUND_COLOR: '#deb887',
  SELECT_COLOR: 'red',

  INIT_VIEW_X: -180,
  INIT_VIEW_Y: -80,
  VIEW_WIDTH: 800,
  VIEW_HEIGHT: 600,

  MINER_SPEED: 2,
  MINER_RADIUS: 5,
  MINER_TURN_SPEED: 7 * Math.PI / 180,
  MINER_COLOR: '#dcdcdc',
  MINER_COST: 12,

  TRUCK_SPEED: 7,
  TRUCK_ACCEL: 0.5,
  TRUCK_WIDTH: 30,
  TRUCK_HEIGHT: 50,
  TRUCK_TURN_SPEED: 7 * Math.PI / 180,
  TRUCK_COLOR: 'lightgray',
  CAB_COLOR: '#2f4f4f',
  TRUCK_CAPACITY: 16,
  TRUCK_COST: 80,
  AUTOMATION_COST: 0,

  BOK_SIZE: 5,
  BOK_COLOR: 'brown',

  FACTORY_SIZE: 200,
  FACTORY_COLOR: '#696969',

  BASE_RADIUS: 50,
  BASE_COLOR: 'rgba(127, 255, 212, 0.5)',
  BASE_COST: 400
};