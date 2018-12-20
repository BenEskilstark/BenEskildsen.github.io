'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('./utils'),
    forEach = _require.forEach;

var _require2 = require('./selectors'),
    isAllocated = _require2.isAllocated,
    getScores = _require2.getScores,
    getPlayerPointers = _require2.getPlayerPointers;

var floor = Math.floor,
    round = Math.round;

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    props.store.subscribe(function () {
      return _this.setState(_extends({}, _this.props.store.getState()));
    });
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          curPointer = _state.curPointer,
          memory = _state.memory,
          pointers = _state.pointers,
          turn = _state.turn,
          success = _state.success;
      var dispatch = this.props.store.dispatch;

      var scores = getScores(this.state);
      var playerPointers = getPlayerPointers(this.state);
      var memoryRows = [];
      var memoryRow = [];
      for (var i = 0; i < memory.length; i++) {
        if (i !== 0 && i % 10 === 0) {
          memoryRows.push(React.createElement(MemoryRow, {
            index: i - 10, memoryRow: memoryRow,
            turn: turn, pointers: playerPointers[turn]
          }));
          memoryRow = [];
        }
        memoryRow.push(memory[i]);
      }
      memoryRows.push(React.createElement(MemoryRow, {
        index: 90, memoryRow: memoryRow,
        turn: turn, pointers: playerPointers[turn]
      }));
      var xAxis = [React.createElement('div', { className: 'axisCell' })];
      for (var x = 0; x < 10; x++) {
        xAxis.push(React.createElement(
          'div',
          { className: 'axisCell' },
          x
        ));
      }
      var pointerList = [];
      pointerList = playerPointers[turn].map(function (allocation) {
        return React.createElement(
          'span',
          null,
          allocation.pointer,
          ' '
        );
      });
      var buttons = React.createElement(
        'span',
        null,
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return dispatch({ type: 'malloc', size: 10, pointer: curPointer });
            } },
          'malloc(10)'
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return dispatch({ type: 'realloc', increase: 10, pointer: curPointer });
            } },
          'realloc(10)'
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return dispatch({ type: 'free', pointer: curPointer });
            } },
          'free(10)'
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return dispatch({ type: 'write', bit: turn, length: 10, address: curPointer });
            } },
          'write(10)'
        ),
        turn == 0 ? React.createElement(
          'button',
          {
            onClick: function onClick() {
              return dispatch({ type: 'calloc', size: 10, pointer: curPointer });
            } },
          'calloc(10)'
        ) : ''
      );
      return React.createElement(
        'div',
        { className: 'background' },
        React.createElement(
          'div',
          { className: 'sideBar' },
          React.createElement(
            'h2',
            null,
            'Player Turn: ',
            turn
          ),
          React.createElement(
            'p',
            null,
            'Score: ',
            scores[1],
            ' ',
            React.createElement(
              'b',
              null,
              '1'
            ),
            's | ',
            scores[0],
            ' ',
            React.createElement(
              'b',
              null,
              '0'
            ),
            's'
          ),
          React.createElement(
            'p',
            null,
            'Pointers: ',
            pointerList
          ),
          React.createElement(
            'p',
            null,
            'Success: ',
            success ? 'PASS' : 'FAIL'
          ),
          'Memory Address:',
          React.createElement('input', { value: curPointer,
            onChange: function onChange(ev) {
              return dispatch({ type: 'setPointer', pointer: parseInt(ev.target.value, 10) });
            } }),
          buttons,
          React.createElement(
            'button',
            { onClick: function onClick() {
                return dispatch({ type: 'endTurn' });
              } },
            'End Turn'
          )
        ),
        React.createElement(
          'div',
          { className: 'memory' },
          React.createElement(
            'h1',
            null,
            React.createElement(
              'b',
              null,
              '1 vs 0'
            )
          ),
          xAxis,
          memoryRows
        )
      );
    }
  }]);

  return Game;
}(React.Component);

var MemoryRow = function (_React$Component2) {
  _inherits(MemoryRow, _React$Component2);

  function MemoryRow() {
    _classCallCheck(this, MemoryRow);

    return _possibleConstructorReturn(this, (MemoryRow.__proto__ || Object.getPrototypeOf(MemoryRow)).apply(this, arguments));
  }

  _createClass(MemoryRow, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var memoryCells = this.props.memoryRow.map(function (bit, i) {
        var index = _this3.props.index + i;
        var background = 'white';
        if (bit == 1) {
          background = 'rgba(200, 200, 200, 0.13)';
        }
        if (isAllocated(_this3.props.pointers, index)) {
          background = bit == 1 ? 'lightsteelblue' : 'mistyrose';
        }
        _this3.props.pointers.forEach(function (allocation) {
          if (allocation.pointer == index) background = bit == 1 ? 'steelblue' : 'lightpink';
        });
        return React.createElement(
          'div',
          {
            className: 'memoryCell',
            style: {
              backgroundColor: background
            }
          },
          bit
        );
      });
      return React.createElement(
        'div',
        { key: this.props.memoryRow.toString(), className: 'memoryRow' },
        React.createElement(
          'div',
          { className: 'axisCell' },
          this.props.index
        ),
        memoryCells
      );
    }
  }]);

  return MemoryRow;
}(React.Component);

module.exports = Game;