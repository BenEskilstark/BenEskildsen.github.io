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

var _require2 = require('./selectors.js'),
    getAgentPositions = _require2.getAgentPositions;

var doorColors = ['orange', 'green', 'blue', 'brown', 'pink', 'cyan', 'yellow', 'purple', 'steelblue'];

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
    key: 'renderAgents',
    value: function renderAgents() {
      var _this2 = this;

      var positions = getAgentPositions(this.state.store.getState());

      var _state$store$getState = this.state.store.getState(),
          prevTime = _state$store$getState.prevTime,
          time = _state$store$getState.time;

      return positions.map(function (pos, i) {
        var num = positions.length - i;
        if (!pos) return null;
        return _this2.drawTweenedAgent(pos, num, prevTime < time);
      });
    }
  }, {
    key: 'drawTweenedAgent',
    value: function drawTweenedAgent(pos, num, shouldTween) {
      var _this3 = this;

      return React.createElement(
        Motion,
        {
          key: 'motion_' + num,
          defaultStyle: { x: pos.x, y: pos.y },
          style: {
            x: shouldTween ? spring(pos.x) : pos.x,
            y: shouldTween ? spring(pos.y) : pos.y
          }
        },
        function (motionVal) {
          return _this3.drawAgent(motionVal, num);
        }
      );
    }
  }, {
    key: 'drawAgent',
    value: function drawAgent(pos, num) {
      return React.createElement(
        'div',
        {
          key: 'agent_' + num,
          className: 'tile',
          style: {
            top: pos.y * 80,
            left: pos.x * 80,
            background: '#edcf72',
            color: '#f9f6f2'
          }
        },
        React.createElement(
          'b',
          null,
          num
        )
      );
    }
  }, {
    key: 'renderWalls',
    value: function renderWalls() {
      var _state$store$getState2 = this.state.store.getState(),
          walls = _state$store$getState2.walls;

      return walls.map(function (wall, i) {
        if (wall.invisible) return null;
        return React.createElement('div', {
          key: 'wall_' + i,
          className: 'wall',
          style: {
            top: 80 * wall.start.y - 2.5,
            left: 80 * wall.start.x - 2.5,
            width: 80 * (wall.end.x - wall.start.x) + 10,
            height: 80 * (wall.end.y - wall.start.y) + 10,
            background: wall.doorID ? doorColors[wall.doorID - 1] : 'lightgray',
            opacity: wall.isOpen ? 0.25 : 1
          }
        });
      });
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      var _state$store$getState3 = this.state.store.getState(),
          buttons = _state$store$getState3.buttons;

      return buttons.map(function (button, i) {
        return React.createElement('button', {
          key: 'button_' + i,
          style: {
            top: button.position.y * 80,
            left: button.position.x * 80,
            background: doorColors[button.doorID - 1],
            boxShadow: button.pressed ? 'inset 4px 4px 5px #888888' : 'none'
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$store$getState4 = this.state.store.getState(),
          time = _state$store$getState4.time,
          numReversals = _state$store$getState4.numReversals;
      // onContextMenu={ev => ev.preventDefault} is needed for right clicks


      return React.createElement(
        'div',
        { className: 'background' },
        React.createElement(
          'div',
          { className: 'header' },
          'Time Traveller'
        ),
        React.createElement(
          'div',
          { className: 'subheader' },
          React.createElement(
            'b',
            null,
            time
          ),
          ' ',
          time == 1 ? 'step' : 'steps',
          ' taken'
        ),
        React.createElement(
          'div',
          { className: 'subheader' },
          'Time reversed ',
          React.createElement(
            'b',
            null,
            numReversals
          ),
          ' ',
          numReversals == 1 ? 'time' : 'times'
        ),
        React.createElement(
          'div',
          { className: 'grid', onMouseDown: function onMouseDown(ev) {
              return ev.preventDefault();
            } },
          this.renderButtons(),
          this.renderAgents(),
          this.renderWalls()
        )
      );
    }
  }]);

  return Game;
}(React.Component);

;

module.exports = Game;