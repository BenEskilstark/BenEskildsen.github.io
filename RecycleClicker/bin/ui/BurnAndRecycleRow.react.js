'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var Button = require('./components/Button.react');
var Card = require('./components/Card.react');
var LabelledValue = require('./components/LabelledValue.react');

var _require = require('../selectors/selectors.js'),
    getDisplayMoney = _require.getDisplayMoney;

/**
 * {props: {state}}
 */


var BurnAndRecycleRow = function (_React$Component) {
  _inherits(BurnAndRecycleRow, _React$Component);

  function BurnAndRecycleRow() {
    _classCallCheck(this, BurnAndRecycleRow);

    return _possibleConstructorReturn(this, (BurnAndRecycleRow.__proto__ || Object.getPrototypeOf(BurnAndRecycleRow)).apply(this, arguments));
  }

  _createClass(BurnAndRecycleRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          state = _props.state,
          dispatch = _props.dispatch;

      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          Card,
          null,
          React.createElement(Button, {
            id: 'BURN',
            label: "Burn (+" + getDisplayMoney(state.config.revenuePerBurn) + ")",
            onClick: function onClick() {
              return dispatch({ type: 'BURN', num: 1 });
            },
            disabled: state.trash.cur <= 0
          }),
          React.createElement(LabelledValue, { label: 'Burners', value: state.employees.Burner.cur }),
          React.createElement(LabelledValue, { label: 'Trash burned', value: state.burn.cur })
        ),
        React.createElement(
          Card,
          null,
          React.createElement(Button, {
            id: 'RECYCLE',
            label: "Recycle (+" + getDisplayMoney(state.config.revenuePerRecycle) + ")",
            onClick: function onClick() {
              return dispatch({ type: 'RECYCLE', num: 1 });
            },
            disabled: state.trash.cur <= 0
          }),
          React.createElement(LabelledValue, { label: 'Recyclers', value: state.employees.Recycler.cur }),
          React.createElement(LabelledValue, { label: 'Trash recycled', value: state.recycle.cur })
        )
      );
    }
  }]);

  return BurnAndRecycleRow;
}(React.Component);

module.exports = BurnAndRecycleRow;