'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

// props:
// messages: Array of messages to try to display

var NUM_MESSAGES_TO_DISPLAY = 3;

var Ticker = function (_React$Component) {
  _inherits(Ticker, _React$Component);

  function Ticker() {
    _classCallCheck(this, Ticker);

    return _possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).apply(this, arguments));
  }

  _createClass(Ticker, [{
    key: 'render',
    value: function render() {
      var messages = this.props.messages;

      var toDisplay = [];
      var numMessagesToDisplay = Math.min(NUM_MESSAGES_TO_DISPLAY, messages.length);
      var len = Math.max(messages.length - numMessagesToDisplay, 0);
      for (var i = len; i < messages.length; i++) {

        var message = messages[i];
        if (i == messages.length - 1) {
          message = '> ' + message;
        }
        toDisplay.push(React.createElement(
          'div',
          { key: 'message_' + message + '_' + i },
          message
        ));
      }
      return React.createElement(
        'div',
        { className: 'ticker' },
        toDisplay
      );
    }
  }]);

  return Ticker;
}(React.Component);

module.exports = Ticker;