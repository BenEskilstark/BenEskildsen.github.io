'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

/**
 *
 * prop types:
 * title: the title of the card
 * content: an array of body lines for the card
 * actions: optional array, will create buttons
 *    name: name on the button
 *    func: callback when the button is clicked
 *
 */

var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: 'render',
    value: function render() {
      var buttons = [];
      if (this.props.actions != null) {
        buttons = this.props.actions.map(function (action) {
          return React.createElement(
            'button',
            {
              key: 'button_' + action.name,
              onClick: action.func },
            action.name
          );
        });
      }
      return React.createElement(
        'div',
        { className: 'card' },
        React.createElement(
          'div',
          { className: 'cardTitle' },
          React.createElement(
            'b',
            null,
            this.props.title
          )
        ),
        this.props.content.map(function (line) {
          return React.createElement(
            'p',
            { key: line },
            line
          );
        }),
        buttons
      );
    }
  }]);

  return Card;
}(React.Component);

module.exports = Card;