"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

// props:
// min, max -- lower, upper bounds
// value    -- starting value (min if null)
// onChange -- fn
// step     -- step by this amount, or 1
// name     -- label

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = {
      value: _this.props.value != null ? _this.props.value : _this.props.min
    };
    return _this;
  }

  _createClass(Slider, [{
    key: "onChange",
    value: function onChange(ev) {
      var value = parseInt(ev.target.value);
      if (this.props.onChange) {
        this.props.onChange(value);
      }
      this.setState({ value: value });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props,
          state = this.state;

      var value = state.value;
      if (state.value != props.value) {
        value = props.value;
      }
      return React.createElement(
        "div",
        { style: {} },
        props.name,
        React.createElement("input", { type: "range",
          style: { width: 100 },
          min: props.min, max: props.max,
          value: value,
          onChange: function onChange(ev) {
            return _this2.onChange(ev);
          },
          step: props.step != null ? props.step : 1 }),
        value
      );
    }
  }]);

  return Slider;
}(React.Component);

module.exports = Slider;