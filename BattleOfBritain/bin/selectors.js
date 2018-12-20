'use strict';

var getDate = function getDate(state) {
  var day = state.day;

  if (day <= 21) {
    return 'July ' + (day + 10) + ', 1940';
  }
  if (day > 21 && day <= 52) {
    return 'August ' + (day - 21) + ', 1940';
  }

  return 'September ' + (day - 52) + ', 1940';
};

var getTotalPlanes = function getTotalPlanes(state) {
  return state.planes;
};

var getAvailablePlanes = function getAvailablePlanes(state) {
  var total = state.planes;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.sorties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var sortie = _step.value;

      total -= sortie.planes;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return total;
};

var getTotalCivilians = function getTotalCivilians(state) {
  var totalCivilians = 0;
  for (var name in state.locations) {
    totalCivilians += state.locations[name].civilians;
  }
  return totalCivilians;
};

var getTotalCasualties = function getTotalCasualties(state) {
  var totalCasualties = 0;
  for (var name in state.locations) {
    totalCasualties += state.locations[name].casualties;
  }
  return totalCasualties;
};

var getLastNTickers = function getLastNTickers(state, n) {
  return state.ticker.slice(-1 * n);
};

module.exports = {
  getDate: getDate,
  getTotalPlanes: getTotalPlanes,
  getAvailablePlanes: getAvailablePlanes,
  getTotalCivilians: getTotalCivilians,
  getTotalCasualties: getTotalCasualties,
  getLastNTickers: getLastNTickers
};