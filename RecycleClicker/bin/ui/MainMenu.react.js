'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var MainMenu = function (_React$Component) {
  _inherits(MainMenu, _React$Component);

  function MainMenu() {
    _classCallCheck(this, MainMenu);

    return _possibleConstructorReturn(this, (MainMenu.__proto__ || Object.getPrototypeOf(MainMenu)).apply(this, arguments));
  }

  _createClass(MainMenu, [{
    key: 'render',
    value: function render() {
      var dispatch = this.props.store.dispatch;
      var levelNum = parseInt(localStorage.getItem('level')) || 0;
      var resetButton = React.createElement(
        'button',
        { onClick: function onClick() {
            return dispatch({ type: 'CLEAR_LOCAL_STORAGE' });
          } },
        'Reset Game to Level 1'
      );
      return React.createElement(
        'span',
        null,
        React.createElement(
          'div',
          { className: 'mainMenu' },
          React.createElement(
            'button',
            { onClick: function onClick() {
                dispatch({
                  type: 'SET_MODAL',
                  text: 'Welcome to Time Travel Understander! Use the arrow keys to reach the time machine, ' + 'passing through open doors along the way. Once you reach the time machine, travel' + ' back in time and press the color-coded buttons to open the doors just in time' + ' for your original self to pass through them! Press the spacebar any time after' + ' you\'ve reached the time machine to go back in time again.',
                  buttons: [{
                    text: 'I "Understand"',
                    onClick: function onClick() {
                      dispatch({ type: 'DISMISS_MODAL' });
                      dispatch({ type: 'START', dispatch: dispatch });
                    }
                  }]
                });
              } },
            'Start ',
            levelNum == 0 ? '' : 'at Level ' + (levelNum + 1)
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return dispatch({ type: 'EDITOR' });
              } },
            'Level Editor'
          ),
          levelNum == 0 ? null : resetButton,
          React.createElement('input', { type: 'text', style: { width: '100%', marginTop: '50' }, id: 'levelPaste' }),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return dispatch({ type: 'CUSTOM', dispatch: dispatch });
              } },
            'Paste Custom Level'
          )
        )
      );
    }
  }]);

  return MainMenu;
}(React.Component);

;

module.exports = MainMenu;