'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var Button = require('./Button.react');

// props:
// id: optional string
// label: string
// optionNames: Array<string>
// onClicks: Array<() => void>

var ButtonOption = function (_React$Component) {
  _inherits(ButtonOption, _React$Component);

  function ButtonOption(props) {
    _classCallCheck(this, ButtonOption);

    var _this = _possibleConstructorReturn(this, (ButtonOption.__proto__ || Object.getPrototypeOf(ButtonOption)).call(this, props));

    _this.state = { disabled: false };
    return _this;
  }

  _createClass(ButtonOption, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;

      var id = props.id || props.label;
      var buttons = [];

      var _loop = function _loop(i) {
        buttons.push(React.createElement(Button, {
          label: props.optionNames[i],
          onClick: function onClick() {
            _this2.setState({ disabled: true });
            props.onClicks[i]();
          },
          disabled: state.disabled
        }));
      };

      for (var i = 0; i < props.optionNames.length; i++) {
        _loop(i);
      }
      return React.createElement(
        'div',
        {
          className: 'buttonOption',
          key: 'buttonOption_' + id,
          id: 'buttonOption_' + id
        },
        props.label,
        buttons
      );
    }
  }]);

  return ButtonOption;
}(React.Component);

module.exports = ButtonOption;