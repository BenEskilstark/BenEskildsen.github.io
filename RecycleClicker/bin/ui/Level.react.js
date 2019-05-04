'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var Maze = require('./Maze.react');

var _require = require('../selectors/selectors'),
    getRumbleOffset = _require.getRumbleOffset;

var Level = function (_React$Component) {
  _inherits(Level, _React$Component);

  function Level() {
    _classCallCheck(this, Level);

    return _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).apply(this, arguments));
  }

  _createClass(Level, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          numReversals = _props.numReversals,
          time = _props.time,
          stepLimit = _props.stepLimit,
          level = _props.level;

      var offset = getRumbleOffset(this.props);
      var stepsLeft = stepLimit - time;
      return React.createElement(
        'div',
        { className: this.props.isEditor ? 'editorLevel' : "level" },
        React.createElement(
          'div',
          { className: 'multiheader' },
          React.createElement(
            'div',
            { className: 'multiheaderLeft' },
            'Level ',
            React.createElement(
              'b',
              null,
              level + 1
            )
          ),
          React.createElement(
            'div',
            { className: 'multiheaderRight' },
            React.createElement(
              'b',
              null,
              stepsLeft
            ),
            ' ',
            stepsLeft == 1 ? 'step' : 'steps',
            ' remaining'
          )
        ),
        React.createElement(
          'div',
          { className: 'subheader' },
          React.createElement(
            'button',
            {
              style: { width: '50%', display: 'inline' },
              onClick: function onClick() {
                _this2.props.dispatch({ type: 'BACK_TO_MAIN_MENU' });
              }
            },
            'Back to Main Menu'
          ),
          React.createElement(
            'button',
            {
              style: { width: '50%', display: 'inline' },
              onClick: function onClick() {
                return _this2.props.dispatch({ type: 'RESET' });
              }
            },
            'Restart Level'
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              paddingLeft: offset.x,
              paddingTop: offset.y,
              display: this.props.isEditor ? 'inline' : 'block'
            }
          },
          React.createElement(Maze, this.props)
        )
      );
    }
  }]);

  return Level;
}(React.Component);

module.exports = Level;