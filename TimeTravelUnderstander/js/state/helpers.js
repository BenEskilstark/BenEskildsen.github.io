// @flow

const mkWall = (x1, y1, x2, y2, doorID = null, invisible = false) => {
  const orientation = x1 === x2 ? 'vertical' : 'horizontal';
  return {
    orientation,
    start: {x: x1, y: y1},
    end: {x: x2, y: y2},
    doorID,
    invisible,
    isOpen: !!doorID,
  }
};

module.exports = {mkWall};
