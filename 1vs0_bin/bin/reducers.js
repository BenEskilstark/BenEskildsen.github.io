'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./entities'),
    getInitialState = _require.getInitialState;

var _require2 = require('./utils'),
    oneOf = _require2.oneOf,
    maybeMinus = _require2.maybeMinus,
    minusToZero = _require2.minusToZero;

var ceil = Math.ceil,
    floor = Math.floor,
    random = Math.random,
    round = Math.round;


var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState();
  var memory = state.memory,
      pointers = state.pointers,
      success = state.success,
      turn = state.turn;

  switch (action.type) {
    case 'endTurn':
      return _extends({}, state, {
        curPointer: 0,
        turn: (state.turn + 1) % 2
      });
    case 'setPointer':
      return _extends({}, state, {
        curPointer: action.pointer >= 0 ? action.pointer : ''
      });
    case 'malloc':
      return malloc(state, action);
    case 'free':
      return free(state, action);
    case 'write':
      return write(state, action);
    case 'realloc':
      return realloc(state, action);
    case 'calloc':
      return calloc(state, action);
  }
  return state;
};

var malloc = function malloc(state, action) {
  var pointers = state.pointers,
      turn = state.turn;
  var pointer = action.pointer,
      size = action.size;

  var success = true;
  if (overlaps(pointers, pointer, size)) {
    success = false;
  }
  return _extends({}, state, {
    pointers: success ? _extends({}, pointers, _defineProperty({}, pointer, { pointer: pointer, player: turn, size: size })) : pointers,
    success: success
  });
};

// TODO: this is broken
var free = function free(state, action) {
  var pointers = state.pointers,
      turn = state.turn;
  var pointer = free.pointer;

  var nextPointers = _extends({}, pointers);
  var success = false;
  if (pointers[pointer]) {
    success = true;
    delete nextPointers[pointer];
  }
  return _extends({}, state, { pointers: nextPointers, success: success });
};

var write = function write(state, action) {
  var pointers = state.pointers,
      memory = state.memory,
      turn = state.turn;
  var address = action.address,
      length = action.length,
      bit = action.bit;

  var success = false;
  for (var i = 0; i < memory.length; i++) {
    var allocation = pointers[i];
    if (allocation && allocation.player == bit && address >= allocation.pointer && address + length <= allocation.pointer + allocation.size) {
      success = true;
      break;
    }
  }
  if (!success) {
    return _extends({}, state, { success: success });
  }
  var nextMemory = [].concat(_toConsumableArray(memory));
  for (var _i = 0; _i < length; _i++) {
    nextMemory[address + _i] = bit;
  }
  return _extends({}, state, { memory: nextMemory, success: success });
};

// TODO: implement realloc taking up to as much as it can when it overlaps a friendly pointer
var realloc = function realloc(state, action) {
  var pointers = state.pointers,
      turn = state.turn;
  var pointer = action.pointer,
      increase = action.increase;

  var allocation = pointers[pointer];
  var success = true;
  if (!allocation || overlaps(pointers, pointer + 1, allocation.size + increase - 1)) {
    success = false;
    return _extends({}, state, { success: success });
  }
  var nextPointers = [].concat(_toConsumableArray(pointers));
  nextPointers[pointer] = _extends({}, allocation, { size: allocation.size + increase });
  return _extends({}, state, { pointers: nextPointers, success: success });
};

var calloc = function calloc(state, action) {
  var pointer = action.pointer,
      size = action.size;

  var mallocState = malloc(state, { type: 'malloc', pointer: pointer, size: size });
  if (!mallocState.success) {
    return mallocState;
  }
  return write(mallocState, { type: 'write', address: pointer, bit: 0, length: size });
};
// TODO: check if you're already in allocated memory
var overlaps = function overlaps(pointers, pointer, size) {
  for (var i = 0; i < size; i++) {
    if (pointers[pointer + i]) {
      return true;
    }
  }
  return false;
};

module.exports = { rootReducer: rootReducer };