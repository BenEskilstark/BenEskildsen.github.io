'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('react-motion'),
    Motion = _require.Motion,
    spring = _require.spring;

var backgrounds = {
  2: '#eaded2',
  4: '#e9dabc',
  8: '#eea266',
  16: '#f08151',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e'
};

var fontColors = {
  2: '#635b52',
  4: '#635b52',
  8: '#f9f6f2',
  16: '#f9f6f2',
  32: '#f9f6f2',
  64: '#f9f6f2',
  128: '#f9f6f2',
  256: '#f9f6f2',
  512: '#f9f6f2',
  1024: '#f9f6f2',
  2048: '#f9f6f2'
};

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    // re-render when the store changes state
    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    props.store.subscribe(function () {
      _this.setState(_extends({}, props));
    });
    _this.state = _extends({}, _this.props);
    return _this;
  }

  _createClass(Game, [{
    key: 'renderTiles',
    value: function renderTiles() {
      var _state$store$getState = this.state.store.getState(),
          tiles = _state$store$getState.tiles;

      return tiles.map(function (tile) {
        return React.createElement(
          Motion,
          {
            key: 'motion_' + tile.id,
            defaultStyle: { x: tile.x * 125, y: tile.y * 125 },
            style: { x: spring(tile.x * 125), y: spring(tile.y * 125) }
          },
          function (motionVal) {
            return React.createElement(
              'div',
              {
                key: tile.id,
                className: 'tile',
                style: {
                  top: motionVal.y,
                  left: motionVal.x,
                  background: backgrounds[tile.value],
                  color: fontColors[tile.value]
                }
              },
              React.createElement(
                'b',
                null,
                tile.value
              )
            );
          }
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // onContextMenu={ev => ev.preventDefault} is needed for right clicks
      return React.createElement(
        'div',
        { className: 'background' },
        React.createElement(
          'div',
          { className: 'header' },
          'Yet Another 2048 Clone'
        ),
        React.createElement(
          'div',
          { className: 'grid', onMouseDown: function onMouseDown(ev) {
              return ev.preventDefault();
            } },
          this.renderTiles()
        )
      );
    }
  }]);

  return Game;
}(React.Component);

;

module.exports = Game;