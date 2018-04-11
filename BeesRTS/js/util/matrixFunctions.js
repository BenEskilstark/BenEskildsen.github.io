///////////////////////////////////////////////////////////////////////////////////
// Matrix Helpers
///////////////////////////////////////////////////////////////////////////////////

const makeMatrix = function(width, height, initialValueFn) {
  const matrix = [];
  for (let x = 0; x < width; x++) {
    const col = [];
    for (let y = 0; y < height; y++) {
      col.push(initialValueFn(x, y));
    }
   matrix.push(col);
  }
  return matrix;
}

// returns a new matrix
const getSubMatrix = function(source, x, y, width, height) {
  return makeMatrix(width, height, (dx, dy) => source[x + dx][y + dy]);
}

const mapMatrix = function(matrix, fn) {
  return makeMatrix(matrix.length, matrix[0].length, (x, y) => fn(matrix[x][y], x, y));
}

const cloneMatrix = function(source) {
  return makeMatrix(source.length, source[0].length, (x, y) => source[x][y]);
}

const inPlaceMapMatrix = function(matrix, fn) {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      matrix[x][y] = fn(matrix[x][y], x, y);
    }
  }
  return matrix;
}


// side-effect-only mapMatrix for eg. rendering into a canvas
const iterateMatrix = function(matrix, fn) {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      fn(matrix[x][y], x, y);
    }
  }
  return matrix;
}
