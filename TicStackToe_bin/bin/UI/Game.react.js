'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('../utils'),
    forEachMatrix = _require.forEachMatrix;

var floor = Math.floor,
    round = Math.round;

var _require2 = require('../selectors'),
    hasWon = _require2.hasWon;

var _require3 = require('../actions'),
    placePiece = _require3.placePiece,
    movePiece = _require3.movePiece;

var Slider = require('./Slider.react');

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    props.store.subscribe(function () {
      return _this.setState(_extends({}, _this.props.store.getState()));
    });
    var grid = new Image();
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      var dispatch = this.props.store.dispatch;
      var _state = this.state,
          board = _state.board,
          turn = _state.turn,
          offset = _state.offset;

      var pieces = [];
      forEachMatrix(board, function (stack) {
        stack.forEach(function (piece) {
          var size = piece.size,
              x = piece.x,
              y = piece.y,
              player = piece.player;

          var color = player == 1 ? 'lightgray' : 'steelblue';
          // unshift to render bigger pieces before smaller ones
          pieces.unshift(React.createElement(Piece, {
            size: size, x: x, y: y, color: color,
            key: '' + String(size) + String(x) + String(y)
          }));
        });
      });

      return React.createElement(
        'span',
        null,
        React.createElement(
          'div',
          {
            style: { backgroundColor: turn == 0 ? 'steelblue' : 'lightgray' },
            className: 'grid'
          },
          React.createElement('img', {
            className: 'image',
            src: '../grid.png' }),
          pieces
        ),
        React.createElement(ActionPane, { store: this.props.store })
      );
    }
  }]);

  return Game;
}(React.Component);

var ActionPane = function (_React$Component2) {
  _inherits(ActionPane, _React$Component2);

  function ActionPane(props) {
    _classCallCheck(this, ActionPane);

    var _this2 = _possibleConstructorReturn(this, (ActionPane.__proto__ || Object.getPrototypeOf(ActionPane)).call(this, props));

    _this2.state = {
      action: 'placePiece',
      fromX: 0,
      fromY: 0,
      x: 1,
      y: 1,
      size: 2
    };
    return _this2;
  }

  _createClass(ActionPane, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var state = this.state;

      var fromCoords = null;
      if (state.action == 'movePiece') {
        fromCoords = [React.createElement(Slider, { key: 1, min: 0, max: 2, name: "SRow:", value: state.fromY,
          onChange: function onChange(value) {
            return _this3.setState({ fromY: value });
          } }), React.createElement(Slider, { key: 2, min: 0, max: 2, name: "SCol:", value: state.fromX,
          onChange: function onChange(value) {
            return _this3.setState({ fromX: value });
          } })];
      }
      return React.createElement(
        'div',
        { className: 'actionPane' },
        React.createElement(
          'select',
          { onChange: function onChange(ev) {
              return _this3.setState({ action: ev.target.value });
            } },
          React.createElement(
            'option',
            { value: 'placePiece' },
            'Place Piece'
          ),
          React.createElement(
            'option',
            { value: 'movePiece' },
            'Move Piece'
          )
        ),
        React.createElement(Slider, { min: 1, max: 3, name: "Size:", value: state.size,
          onChange: function onChange(value) {
            return _this3.setState({ size: value });
          } }),
        fromCoords,
        React.createElement(Slider, { min: 0, max: 2, name: "Row :", value: state.y,
          onChange: function onChange(value) {
            return _this3.setState({ y: value });
          } }),
        React.createElement(Slider, { min: 0, max: 2, name: "Col :", value: state.x,
          onChange: function onChange(value) {
            return _this3.setState({ x: value });
          } }),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              var _state2 = _this3.state,
                  fromX = _state2.fromX,
                  fromY = _state2.fromY,
                  x = _state2.x,
                  y = _state2.y,
                  action = _state2.action,
                  size = _state2.size;

              var store = _this3.props.store;
              if (action == 'placePiece') {
                placePiece(store, x, y, size);
              } else {
                movePiece(store, fromX, fromY, x, y, size);
              }
            }
          },
          'Go'
        )
      );
    }
  }]);

  return ActionPane;
}(React.Component);

var Piece = function (_React$Component3) {
  _inherits(Piece, _React$Component3);

  function Piece() {
    _classCallCheck(this, Piece);

    return _possibleConstructorReturn(this, (Piece.__proto__ || Object.getPrototypeOf(Piece)).apply(this, arguments));
  }

  _createClass(Piece, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          size = _props.size,
          color = _props.color,
          x = _props.x,
          y = _props.y;

      var pxSize = size * BOARD_TO_PX;
      return React.createElement('div', {
        className: 'piece',
        style: {
          top: boardToCellPx(x, y).y - pxSize / 2,
          left: boardToCellPx(x, y).x - pxSize / 2,
          width: pxSize,
          height: pxSize,
          borderRadius: pxSize / 2,
          boxShadow: color + ' 2px 2px',
          backgroundColor: color
        } });
    }
  }]);

  return Piece;
}(React.Component);

var BOARD_TO_PX = 50;

var boardToCellPx = function boardToCellPx(x, y) {
  var px = [[{ x: 125, y: 130 }, { x: 338, y: 130 }, { x: 555, y: 130 }], [{ x: 125, y: 338 }, { x: 338, y: 338 }, { x: 555, y: 338 }], [{ x: 125, y: 540 }, { x: 338, y: 540 }, { x: 555, y: 540 }]];
  return px[y][x];
};

var boardToPx = function boardToPx(x, y) {
  return {
    x: (x + 0.5) * (3 * BOARD_TO_PX + 5) + 35,
    y: (y + 0.5) * (3 * BOARD_TO_PX + 5) + 35
  };
};

module.exports = Game;