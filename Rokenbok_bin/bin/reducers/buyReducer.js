'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../settings'),
    MINER_COST = _require.MINER_COST,
    TRUCK_COST = _require.TRUCK_COST,
    BASE_COST = _require.BASE_COST,
    AUTOMATION_COST = _require.AUTOMATION_COST;

var costLookup = _defineProperty({
  miner: MINER_COST,
  truck: TRUCK_COST,
  base: BASE_COST
}, 'automate trucks', AUTOMATION_COST);

var buyReducer = function buyReducer(state, action) {
  var factory = state.entities.filter(function (e) {
    return e.type == 'factory';
  })[0];
  var cost = costLookup[action.entityType];
  if (factory.collected < cost) {
    return state;
  }
  factory.collected -= cost;
  if (action.entityType == 'automate trucks') {
    return _extends({}, state, {
      automatedTrucks: true
    });
  }
  return _extends({}, state, {
    placing: action.entityType
  });
};

module.exports = { buyReducer: buyReducer };