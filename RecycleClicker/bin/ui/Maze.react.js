'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('react-motion'),
    Motion = _require.Motion,
    spring = _require.spring;

var _require2 = require('../selectors/selectors.js'),
    getAgentPositions = _require2.getAgentPositions,
    getDoorColor = _require2.getDoorColor;

var WALL_SIZE = 80;

var Maze = function (_React$Component) {
  _inherits(Maze, _React$Component);

  function Maze() {
    _classCallCheck(this, Maze);

    return _possibleConstructorReturn(this, (Maze.__proto__ || Object.getPrototypeOf(Maze)).apply(this, arguments));
  }

  _createClass(Maze, [{
    key: 'renderAgents',
    value: function renderAgents() {
      var _this2 = this;

      var positions = getAgentPositions(this.props);
      var _props = this.props,
          prevTime = _props.prevTime,
          time = _props.time;

      return positions.map(function (pos, i) {
        var num = positions.length - i;
        var isUserAgent = i == 0;
        var isLast = i == positions.length - 1;
        if (!pos) return null;
        return _this2.drawTweenedAgent(pos, num, true, isUserAgent, isLast);
      });
    }
  }, {
    key: 'drawTweenedAgent',
    value: function drawTweenedAgent(pos, num, shouldTween, isUserAgent, isLast) {
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
          return _this3.drawAgent(motionVal, num, isUserAgent, isLast);
        }
      );
    }
  }, {
    key: 'drawAgent',
    value: function drawAgent(pos, num, isUserAgent, isLast) {
      return React.createElement(
        'div',
        {
          key: 'agent_' + num,
          className: 'tile',
          style: {
            top: pos.y * 80,
            left: pos.x * 80,
            background: '#edcf72',
            color: '#f9f6f2',
            opacity: isUserAgent ? 1 : 0.5,
            width: isUserAgent ? 62 : 70,
            border: isUserAgent ? '4px solid orange' : '0px',
            fontSize: 15,
            textAlign: 'right'
          }
        },
        isLast ? null : '\u231B'
      );
    }
  }, {
    key: 'renderTarget',
    value: function renderTarget(pos) {
      return React.createElement(
        'div',
        {
          key: 'target_' + pos.x + pos.y,
          className: 'tile',
          style: {
            top: pos.y * 80,
            left: pos.x * 80,
            background: '#956E01',
            color: '#f9f6f2'
          }
        },
        React.createElement(
          'b',
          null,
          '\u231B'
        )
      );
    }
  }, {
    key: 'renderWalls',
    value: function renderWalls() {
      return this.props.walls.map(function (wall, i) {
        if (wall.invisible) return null;
        return React.createElement('div', {
          key: 'wall_' + i,
          className: 'wall',
          style: {
            top: WALL_SIZE * wall.start.y - 2.5,
            left: WALL_SIZE * wall.start.x - 2.5,
            width: WALL_SIZE * (wall.end.x - wall.start.x) + 10,
            height: WALL_SIZE * (wall.end.y - wall.start.y) + 10,
            background: wall.doorID ? getDoorColor(wall.doorID) : 'lightgray',
            opacity: wall.isOpen ? 0.25 : 1
          }
        });
      });
    }
  }, {
    key: 'renderSelectedCell',
    value: function renderSelectedCell(coord) {
      if (!coord) return null;

      return React.createElement('div', {
        className: 'selectedCell',
        style: {
          top: WALL_SIZE * coord.y + 7.5,
          left: WALL_SIZE * coord.x + 7.5,
          width: WALL_SIZE - 10,
          height: WALL_SIZE - 10
        }
      });
    }
  }, {
    key: 'renderButtons',
    value: function renderButtons() {
      return this.props.buttons.map(function (button, i) {
        return React.createElement('button', {
          className: 'button',
          key: 'button_' + i,
          style: {
            top: button.position.y * 80,
            left: button.position.x * 80,
            background: getDoorColor(button.doorID),
            boxShadow: button.pressed ? 'inset 4px 4px 5px #888888' : 'none'
          }
        });
      });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(ev) {
      ev.preventDefault();
      var grid = document.getElementById('grid').getBoundingClientRect();
      var pixelX = ev.clientX - grid.left;
      var pixelY = ev.clientY - grid.top;

      var x = Math.floor(pixelX / 80);
      var y = Math.floor(pixelY / 80);

      // support mobile outside the editor
      if (!this.props.isEditor) {
        // left
        if ((x == -1 || x == 0 || x == 2) && (y == 2 || y == 3 || y == 4)) {
          store.dispatch({ type: 'MOVE', dir: { x: -1 }, key: 'left' });
        } else
          // right
          if ((x == 7 || x == 6 || x == 5) && (y == 2 || y == 3 || y == 4)) {
            store.dispatch({ type: 'MOVE', dir: { x: 1 }, key: 'right' });
          } else
            // up
            if ((y == -1 || y == 0 || y == 2) && (x == 2 || x == 3 || x == 4)) {
              store.dispatch({ type: 'MOVE', dir: { y: -1 }, key: 'up' });
            } else
              // down
              if ((y == 7 || y == 6 || y == 5) && (x == 2 || x == 3 || x == 4)) {
                store.dispatch({ type: 'MOVE', dir: { y: 1 }, key: 'down' });
              } else
                // reverse time
                if ((x == 2 || x == 3 || x == 4) && (y == 2 || y == 3 || y == 4)) {
                  store.dispatch({ type: 'REVERSE_TIME' });
                }
        return;
      }

      // in editor
      if (ev.button == 0) {
        this.props.dispatch({ type: 'SELECT_CELL', x: x, y: y });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        'div',
        { id: 'grid', className: 'grid',
          onTouchStart: function onTouchStart(ev) {
            return _this4.onMouseDown(ev);
          },
          onMouseDown: function onMouseDown(ev) {
            return _this4.onMouseDown(ev);
          }
        },
        this.renderButtons(),
        this.renderTarget(this.props.target.pos),
        this.renderAgents(),
        this.renderWalls(),
        this.renderSelectedCell(this.props.selectedCell),
        this.renderReverseTimeAnimation(this.props)
      );
    }
  }, {
    key: 'renderReverseTimeAnimation',
    value: function renderReverseTimeAnimation(state) {
      var reverseTime = state.reverseTime;

      if (!reverseTime || !reverseTime.shouldAnimate || reverseTime.count <= 0) {
        return null;
      }

      var size = reverseTime.size,
          theta = reverseTime.theta;

      return React.createElement(
        'div',
        {
          className: 'hourglass',
          style: {
            top: 3.5 * 80 - size * 0.75,
            left: 3.5 * 80 - size / 2,
            width: size,
            height: size,
            fontSize: size / 2,
            transform: 'rotate(' + theta * 180 / Math.PI + 'deg)',
            color: '#f9f6f2'
          }
        },
        '\u231B'
      );
    }
  }]);

  return Maze;
}(React.Component);

module.exports = Maze;