'use strict';

var _require = require('./level1'),
    level1 = _require.level1;

var _require2 = require('./level2'),
    level2 = _require2.level2;

var _require3 = require('./level3'),
    level3 = _require3.level3;

var _require4 = require('./level4'),
    level4 = _require4.level4;

var _require5 = require('./level5'),
    level5 = _require5.level5;

var _require6 = require('./level6'),
    level6 = _require6.level6;

var _require7 = require('./level7'),
    level7 = _require7.level7;

var _require8 = require('./testLevel'),
    testLevel = _require8.testLevel;

var _require9 = require('./emptyLevel'),
    initEmptyLevel = _require9.initEmptyLevel;

var initLevel = function initLevel(level) {
  switch (level) {
    case 0:
      return initEmptyLevel();
    case 1:
      return level1();
    case 2:
      return level2();
    case 3:
      return level3();
    case 4:
      return level4();
    case 5:
      return level5();
    case 6:
      return level6();
    case 7:
      return level7();
    case 8:
    case 9:
    case 10:
      break;
  }
};

module.exports = { initLevel: initLevel };