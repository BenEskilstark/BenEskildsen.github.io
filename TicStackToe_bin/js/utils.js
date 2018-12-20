const {floor, random, round} = Math;

///////////////////////////////////////////////////////////////////////
// Stochastic
///////////////////////////////////////////////////////////////////////

const shamefulGaussian = () => (random() + random() + random() + random() + random() + random() - 3) / 3;

const randomIn = (min, max) => floor(min + random() * (max - min + 1));

const normalIn = (min, max) => {
  const gaussian = shamefulGaussian();
  return floor(min + gaussian * (max - min + 1))
}

const oneOf = (options) => options[floor(random() * options.length)];

const e = 2.718281828459;

///////////////////////////////////////////////////////////////////////
// Math around Zero
///////////////////////////////////////////////////////////////////////

const maybeMinus = (a, b) => a > b ? a - b : a;
const orZero = (a) => a > 0 ? a : 0;
const minusToZero = (a, b) => a - b > 0 ? a - b : 0;

///////////////////////////////////////////////////////////////////////
// Arrays and Matrices
///////////////////////////////////////////////////////////////////////

const initArray = (fn, len) => {
  const array = [];
  for (let i = 0; i < len; i++) {
    array.push(fn(i))
  }
  return array;
}

const initMatrix = (fn, len, width) => {
  return initArray(() => initArray(fn, width), len);
}

const getCol = (matrix, col) => {
  const colToReturn = [];
  for (let x = 0; x < matrix.length; x++) {
    colToReturn.push(matrix[x][col]);
  }
  return colToReturn;
}

const forEach = (obj, keyValFunc) => {
  for (let key in obj) {
    keyValFunc(key, obj[key]);
  }
}

const forEachMatrix = (matrix, fn) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      fn(matrix[x][y], x, y, matrix);
    }
  }
};

module.exports = {
  e,
  initArray,
  initMatrix,
  forEach,
  forEachMatrix,
  normalIn,
  oneOf,
  randomIn,
  minusToZero,
  maybeMinus,
  orZero,
};
