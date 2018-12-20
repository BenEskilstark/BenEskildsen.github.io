'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../entities/initState'),
    getInitialState = _require.getInitialState;

var _require2 = require('./recordReducer'),
    recordReducer = _require2.recordReducer;

var _require3 = require('./entityReducer'),
    entityReducer = _require3.entityReducer;

var _require4 = require('./tickReducer'),
    tickReducer = _require4.tickReducer;

var _require5 = require('./viewReducer'),
    viewReducer = _require5.viewReducer;

var _require6 = require('./placeReducer'),
    placeReducer = _require6.placeReducer;

var _require7 = require('./buyReducer'),
    buyReducer = _require7.buyReducer;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState();

  switch (action.type) {
    case 'TOGGLE':
      return _extends({}, state, {
        running: !state.running
      });
    case 'TICK':
      return tickReducer(state, action);
    case 'ZOOM':
    case 'MOUSE_MOVE':
    case 'MOUSE_DOWN':
    case 'MOUSE_UP':
      return viewReducer(state, action);
    case 'RECORD':
    case 'STOP':
    case 'PLAY':
    case 'RETURN':
      return recordReducer(state, action);
    case 'MAYBE_SELECT':
    case 'ACCELERATE':
    case 'DEACCELERATE':
    case 'TURN':
      return entityReducer(state, action);
    case 'BUY':
      return buyReducer(state, action);
    case 'PLACE':
      return placeReducer(state, action);
  }
  return state;
};

module.exports = { rootReducer: rootReducer };