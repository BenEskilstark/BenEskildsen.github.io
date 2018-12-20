'use strict';

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

var logit = function logit(x) {
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var mid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var k = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  return max / (1 + Math.exp(-k * (x - mid)));
};

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
// Vectors
///////////////////////////////////////////////////////////////////////

var dotProduct = function dotProduct(vecA, vecB) {
  if (vecA.z != null && vecB.z != null) {
    return vecA.x * vecB.x + vecA.y * vecB.y + vecA.z * vecB.z;
  }
  return vecA.x * vecB.x + vecA.y * vecB.y;
};

// in radians
var angleToVec = function angleToVec(theta, scalar) {
  return {
    x: -1 * Math.sin(theta) * scalar,
    y: Math.cos(theta) * scalar
  };
};

// in radians
var vecToAngle = function vecToAngle(vector) {
  var theta = Math.atan(vector.y / vector.x);
  if (vector.x < 0 && vector.y < 0) {
    return theta + Math.PI;
  }
  if (vector.x < 0 && vector.y > 0) {
    return theta + Math.PI;
  }
  return theta;
};

// for bouncing something off an inner wall
// @arg entity: {x: number, y: number, radius: number, theta: Radian}
// @return boolean whether there was a bounce
var bounce = function bounce(entity, width, height) {
  var vec = angleToVec(entity.theta, entity.speed);
  if (entity.x + entity.radius >= width || entity.x - entity.radius <= 0) {
    vec.x *= -1;
    entity.theta = vecToAngle(vec);
    return true;
  }
  if (entity.y + entity.radius >= height || entity.y - entity.radius <= 0) {
    console.log(entity.bounceCount);
    console.log('bounce', vec, entity.theta * 180 / Math.PI);
    vec.y *= -1;
    entity.theta = vecToAngle(vec);
    console.log('bounce out', vec, entity.theta * 180 / Math.PI);
    return true;
  }
  return false;
};

///////////////////////////////////////////////////////////////////////
// Arrays and Matrices
///////////////////////////////////////////////////////////////////////

var initArray = function initArray(len, fn) {
  if (!fn) {
    fn = function fn() {
      return null;
    };
  }
  var array = [];
  for (var i = 0; i < len; i++) {
    array.push(fn(i));
  }
  return array;
};

var initMatrix = function initMatrix(width, len, fn) {
  return initArray(width, function () {
    return initArray(len, fn);
  });
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
    keyValFunc(obj[key], key);
  }
};

var forEachMatrix = function forEachMatrix(matrix, fn) {
  for (var x = 0; x < matrix.length; x++) {
    for (var y = 0; y < matrix[x].length; y++) {
      fn(matrix[x][y], x, y, matrix);
    }
  }
};

// Object.prototype.map = (fn) => {
//   const array = [];
//   for (const key in this) {
//     array.push(fn(this[key], key, this));
//   }
//   return array;
// }

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
  orZero: orZero,
  dotProduct: dotProduct,
  vecToAngle: vecToAngle,
  angleToVec: angleToVec,
  bounce: bounce,
  logit: logit
};