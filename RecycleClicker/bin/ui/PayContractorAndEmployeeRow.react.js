'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var Button = require('./components/Button.react');
var Card = require('./components/Card.react');
var LabelledValue = require('./components/LabelledValue.react');

var _require = require('../selectors.js'),
    getDisplayMoney = _require.getDisplayMoney,
    maybe = _require.maybe;

/**
 * {props: {state}}
 */


var PayContractorAndEmployeeRow = function (_React$Component) {
  _inherits(PayContractorAndEmployeeRow, _React$Component);

  function PayContractorAndEmployeeRow() {
    _classCallCheck(this, PayContractorAndEmployeeRow);

    return _possibleConstructorReturn(this, (PayContractorAndEmployeeRow.__proto__ || Object.getPrototypeOf(PayContractorAndEmployeeRow)).apply(this, arguments));
  }

  _createClass(PayContractorAndEmployeeRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          state = _props.state,
          dispatch = _props.dispatch;

      var payContractorCard = React.createElement(
        Card,
        null,
        React.createElement(Button, {
          id: 'PAY_CONTRACTOR',
          label: "Pay Contractor (-" + getDisplayMoney(state.employees.contractor.wage) + ")",
          onClick: function onClick() {
            return dispatch({ type: 'PAY_CONTRACTOR', num: 1 });
          },
          disabled: state.money.cur < state.employees.contractor.wage || state.employees.contractor.needPay == 0 && state.employees.contractor.aboutToLeave == 0
        }),
        React.createElement(LabelledValue, { label: 'Foremen', value: state.employees.Foreman.cur }),
        React.createElement(LabelledValue, {
          label: 'Contrs. to pay',
          value: state.employees.contractor.needPay
        }),
        React.createElement(LabelledValue, {
          label: 'About to quit',
          value: state.employees.contractor.aboutToLeave
        })
      );
      var payEmployeeCard = React.createElement(
        Card,
        null,
        React.createElement(Button, {
          id: 'PAY_EMPLOYEE',
          label: "Pay Employee (-" + getDisplayMoney(state.employees.employee.wage) + ")",
          onClick: function onClick() {
            return dispatch({ type: 'PAY_EMPLOYEE', num: 1 });
          },
          disabled: state.money.cur < state.employees.employee.wage || state.employees.employee.needPay == 0 && state.employees.employee.aboutToLeave == 0
        }),
        React.createElement(LabelledValue, { label: 'Managers', value: state.employees.Manager.cur }),
        React.createElement(LabelledValue, {
          label: 'Empls. to pay',
          value: state.employees.employee.needPay
        }),
        React.createElement(LabelledValue, {
          label: 'About to quit',
          value: state.employees.employee.aboutToLeave
        })
      );
      return React.createElement(
        React.Fragment,
        null,
        maybe(state, payContractorCard, 'payContractorVisible'),
        maybe(state, payEmployeeCard, 'payEmployeeVisible')
      );
    }
  }]);

  return PayContractorAndEmployeeRow;
}(React.Component);

module.exports = PayContractorAndEmployeeRow;