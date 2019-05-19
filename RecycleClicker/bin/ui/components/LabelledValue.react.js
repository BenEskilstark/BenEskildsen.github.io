"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

// props:
// label: string
// value: number

var LabelledValue = function (_React$Component) {
  _inherits(LabelledValue, _React$Component);

  function LabelledValue() {
    _classCallCheck(this, LabelledValue);

    return _possibleConstructorReturn(this, (LabelledValue.__proto__ || Object.getPrototypeOf(LabelledValue)).apply(this, arguments));
  }

  _createClass(LabelledValue, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { className: "labelledValue" },
        React.createElement(
          "div",
          { className: "labelName", key: this.props.label },
          this.props.label,
          ":"
        ),
        React.createElement(
          "div",
          { className: "labelValue", key: this.props.label + "_" + this.props.value },
          this.props.value
        )
      );
    }
  }]);

  return LabelledValue;
}(React.Component);

module.exports = LabelledValue;