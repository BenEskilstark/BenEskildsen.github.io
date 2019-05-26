'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var ButtonOption = require('./ButtonOption.react');

// props:
// dispatch: function
// win: boolean

var RestartButtonOption = function (_React$Component) {
  _inherits(RestartButtonOption, _React$Component);

  function RestartButtonOption() {
    _classCallCheck(this, RestartButtonOption);

    return _possibleConstructorReturn(this, (RestartButtonOption.__proto__ || Object.getPrototypeOf(RestartButtonOption)).apply(this, arguments));
  }

  _createClass(RestartButtonOption, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          win = _props.win;

      var label = 'You saved the world from trash!';
      if (!win) {
        label = 'You failed to save the world from trash';
      }
      return React.createElement(ButtonOption, {
        label: label,
        optionNames: ['Restart'],
        onClicks: [function () {
          return dispatch({ type: 'RESTART' });
        }]
      });
    }
  }]);

  return RestartButtonOption;
}(React.Component);

module.exports = RestartButtonOption;