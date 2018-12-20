"use strict";

var floor = Math.floor,
    random = Math.random,
    round = Math.round;

///////////////////////////////////////////////////////////////////////
// Stochastic
///////////////////////////////////////////////////////////////////////

var shamefulGaussian = function shamefulGaussian() {
  return (random() + random() + random() + random() + random() + random() - 3) / 3;
};

var randomIn = function randomIn(min, max) {
  return floor(min + random() * (max - min + 1));
};

var normalIn = function normalIn(min, max) {
  var gaussian = shamefulGaussian();
  return floor(min + gaussian * (max - min + 1));
};

var oneOf = function oneOf(options) {
  return options[floor(random() * options.length)];
};

var e = 2.718281828459;

///////////////////////////////////////////////////////////////////////
// Math around Zero
///////////////////////////////////////////////////////////////////////

var maybeMinus = function maybeMinus(a, b) {
  return a > b ? a - b : a;
};
var orZero = function orZero(a) {
  return a > 0 ? a : 0;
};
var minusToZero = function minusToZero(a, b) {
  return a - b > 0 ? a - b : 0;
};

///////////////////////////////////////////////////////////////////////
// Arrays and Matrices
///////////////////////////////////////////////////////////////////////

var initArray = function initArray(fn, len) {
  var array = [];
  for (var i = 0; i < len; i++) {
    array.push(fn(i));
  }
  return array;
};

var initMatrix = function initMatrix(fn, len, width) {
  return initArray(function () {
    return initArray(fn, width);
  }, len);
};

var getCol = function getCol(matrix, col) {
  var colToReturn = [];
  for (var x = 0; x < matrix.length; x++) {
    colToReturn.push(matrix[x][col]);
  }
  return colToReturn;
};

var forEach = function forEach(obj, keyValFunc) {
  for (var key in obj) {
    keyValFunc(key, obj[key]);
  }
};

var forEachMatrix = function forEachMatrix(matrix, fn) {
  for (var x = 0; x < matrix.length; x++) {
    for (var y = 0; y < matrix[x].length; y++) {
      fn(matrix[x][y], x, y, matrix);
    }
  }
};

module.exports = {
  e: e,
  initArray: initArray,
  initMatrix: initMatrix,
  forEach: forEach,
  forEachMatrix: forEachMatrix,
  normalIn: normalIn,
  oneOf: oneOf,
  randomIn: randomIn,
  minusToZero: minusToZero,
  maybeMinus: maybeMinus,
  orZero: orZero
};