'use strict';

var mkWall = function mkWall(x1, y1, x2, y2) {
  var doorID = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var invisible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  var orientation = x1 === x2 ? 'vertical' : 'horizontal';
  return {
    orientation: orientation,
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    doorID: doorID,
    invisible: invisible,
    isOpen: !!doorID
  };
};

module.exports = { mkWall: mkWall };