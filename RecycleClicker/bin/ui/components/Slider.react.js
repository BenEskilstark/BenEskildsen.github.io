'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var _require = require('../../selectors/selectors'),
    getDisplayMoney = _require.getDisplayMoney;

// props:
// min, max -- lower, upper bounds
// value    -- starting value (min if null)
// onChange -- fn
// step     -- step by this amount, or 1
// name     -- label

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider() {
    _classCallCheck(this, Slider);

    return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      var props = this.props;

      return React.createElement(
        'div',
        { className: 'slider' },
        React.createElement(
          'div',
          { className: 'sliderLabel' },
          props.name
        ),
        React.createElement('input', { type: 'range',
          className: 'sliderSlider',
          min: props.min, max: props.max,
          value: props.value != null ? props.value : props.min,
          onChange: function onChange(ev) {
            return props.onChange(parseInt(ev.target.value));
          },
          step: props.step != null ? props.step : 1
        }),
        React.createElement(
          'div',
          { className: 'sliderValue' },
          getDisplayMoney(props.value)
        )
      );
    }
  }]);

  return Slider;
}(React.Component);

module.exports = Slider;