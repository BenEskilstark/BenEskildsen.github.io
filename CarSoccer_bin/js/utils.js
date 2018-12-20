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
// Vectors
///////////////////////////////////////////////////////////////////////

const dotProduct = (vecA, vecB) => {
  if (vecA.z != null && vecB.z != null) {
    return vecA.x * vecB.x + vecA.y * vecB.y + vecA.z * vecB.z;
  }
  return vecA.x * vecB.x + vecA.y * vecB.y;
};

// in radians
const angleToVec = (theta, scalar) => {
  return {
    x: -1 * Math.sin(theta) * scalar,
    y: Math.cos(theta) * scalar,
  };
};

// in radians
const vecToAngle = (vector) => {
  const theta = Math.atan(vector.y / -1 * vector.x);
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
const bounce = (entity, width, height) => {
  const vec = angleToVec(entity.theta, entity.speed);
  if (entity.x + entity.radius >= width || entity.x - entity.radius <= 0) {
    vec.x *= -1;
    entity.theta = vecToAngle(vec);
    return true;
  }
  if (entity.y + entity.radius >= height || entity.y - entity.radius <= 0) {
    console.log(entity.bounceCount);
    console.log('bounce', vec, entity.theta * 180/Math.PI);
    vec.y *= -1;
    entity.theta = vecToAngle(vec);
    console.log('bounce out', vec, entity.theta * 180/Math.PI);
    return true;
  }
  return false;
};

///////////////////////////////////////////////////////////////////////
// Arrays and Matrices
///////////////////////////////////////////////////////////////////////

const initArray = (len, fn) => {
  if (!fn) {
    fn = () => null;
  }
  const array = [];
  for (let i = 0; i < len; i++) {
    array.push(fn(i))
  }
  return array;
}

const initMatrix = (width, len, fn) => {
  return initArray(width, () => initArray(len, fn));
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
  dotProduct,
  vecToAngle,
  angleToVec,
  bounce,
};
