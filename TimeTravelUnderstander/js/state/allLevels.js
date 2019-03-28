// @flow

const {level1} = require('./level1');
const {level2} = require('./level2');
const {level3} = require('./level3');
const {level4} = require('./level4');
const {level5} = require('./level5');
const {level6} = require('./level6');
const {level7} = require('./level7');
const {level8} = require('./level8');
const {level9} = require('./level9');
const {level10} = require('./level10');
const {testLevel} = require('./testLevel');
const {vanceLevel} = require('./vanceLevel');
const {initEmptyLevel} = require('./emptyLevel');

const levels = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
];

module.exports = {levels};
