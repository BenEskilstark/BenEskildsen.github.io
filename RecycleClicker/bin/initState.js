'use strict';

var initMaze = function initMaze() {
  return [
  // outer walls
  { orientation: 'horizontal', start: { x: 0, y: 0 }, end: { x: 3, y: 0 } }, { orientation: 'horizontal', start: { x: 4, y: 0 }, end: { x: 7, y: 0 } }, { orientation: 'horizontal', start: { x: 0, y: 7 }, end: { x: 3, y: 7 } }, { orientation: 'horizontal', start: { x: 4, y: 7 }, end: { x: 7, y: 7 } }, { orientation: 'vertical', start: { x: 0, y: 0 }, end: { x: 0, y: 7 } }, { orientation: 'vertical', start: { x: 7, y: 0 }, end: { x: 7, y: 7 } },
  //outer invisible walls
  // inner walls
  mkWall(3, 0, 3, 3), mkWall(4, 0, 4, 2), mkWall(4, 2, 6, 2), mkWall(2, 3, 5, 3), mkWall(3, 4, 3, 6), mkWall(6, 2, 6, 4), mkWall(2, 1, 2, 5), mkWall(3, 4, 3, 6), mkWall(3, 4, 6, 4), mkWall(2, 6, 4, 6), mkWall(5, 1, 6, 1), mkWall(0, 1, 1, 1), mkWall(0, 3, 1, 3), mkWall(0, 5, 1, 5), mkWall(1, 2, 1, 3), mkWall(1, 4, 1, 5), mkWall(1, 6, 1, 7), mkWall(4, 4, 4, 5), mkWall(5, 5, 5, 6), mkWall(4, 5, 5, 5), mkWall(6, 6, 7, 6),

  // doors
  mkWall(3, 2, 4, 2, 1), mkWall(2, 4, 3, 4, 2), mkWall(2, 5, 2, 6, 3), mkWall(3, 7, 4, 7, 4), mkWall(5, 6, 6, 6, 5), mkWall(1, 1, 1, 2, 6), mkWall(2, 1, 3, 1, 7), mkWall(1, 5, 1, 6, 8), mkWall(2, 2, 3, 2, 9)];
};

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

var initState = function initState() {
  return {
    prevTime: -1,
    time: 0,
    numReversals: 0,
    agents: [{ history: [{ x: 3, y: -1 }] }],
    walls: initMaze(),
    buttons: [{ position: { x: 4, y: 6 }, doorID: 1, pressed: false }, { position: { x: 4, y: 4 }, doorID: 2, pressed: false }, { position: { x: 0, y: 2 }, doorID: 3, pressed: false }, { position: { x: 2, y: 2 }, doorID: 4, pressed: false }, { position: { x: 3, y: 4 }, doorID: 5, pressed: false }, { position: { x: 5, y: 1 }, doorID: 6, pressed: false }, { position: { x: 0, y: 6 }, doorID: 7, pressed: false }, { position: { x: 0, y: 4 }, doorID: 8, pressed: false }, { position: { x: 0, y: 0 }, doorID: 9, pressed: false }]
  };
};

module.exports = { initState: initState };