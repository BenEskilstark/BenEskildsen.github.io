'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');

var Button = require('./components/Button.react');
var Card = require('./components/Card.react');
var LabelledValue = require('./components/LabelledValue.react');
var RadioPicker = require('./components/RadioPicker.react');

var _require = require('../selectors.js'),
    getDisplayMoney = _require.getDisplayMoney,
    maybe = _require.maybe;

/**
 * {props: {state}}
 */


var OverviewAndHireRow = function (_React$Component) {
  _inherits(OverviewAndHireRow, _React$Component);

  function OverviewAndHireRow() {
    _classCallCheck(this, OverviewAndHireRow);

    return _possibleConstructorReturn(this, (OverviewAndHireRow.__proto__ || Object.getPrototypeOf(OverviewAndHireRow)).apply(this, arguments));
  }

  _createClass(OverviewAndHireRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          state = _props.state,
          dispatch = _props.dispatch;

      var contractorOrEmployee = state.config.employees.includes(state.ui.selectedRole) ? 'employee' : 'contractor';
      var wage = 2 * state.employees[contractorOrEmployee].wage;

      // only hire more than one contractor at once
      if (contractorOrEmployee == 'contractor') {
        wage *= state.config.employeesPerHire;
      }
      var hireCard = React.createElement(
        Card,
        null,
        React.createElement(Button, {
          id: 'HIRE',
          label: "Hire (-" + getDisplayMoney(wage) + ")",
          onClick: function onClick() {
            return dispatch({ type: 'HIRE', num: 1 });
          },
          disabled: state.money.cur < wage
        }),
        React.createElement(RadioPicker, {
          options: state.employees.roleOptions,
          selected: state.ui.selectedRole,
          onChange: function onChange(role) {
            return dispatch({ type: 'SELECT_ROLE', role: role });
          }
        })
      );
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          Card,
          null,
          React.createElement(LabelledValue, { label: 'Trash', value: state.trash.cur }),
          React.createElement(LabelledValue, { label: 'Money', value: getDisplayMoney(state) }),
          React.createElement(LabelledValue, {
            label: 'Contractors',
            value: state.employees.Recycler.cur + state.employees.Burner.cur
          }),
          React.createElement(LabelledValue, {
            label: 'Employees',
            value: state.employees.Manager.cur + state.employees.Recruiter.cur + state.employees.Scientist.cur + state.employees.Lawyer.cur + state.employees.Foreman.cur
          })
        ),
        maybe(state, hireCard, 'hireVisible')
      );
    }
  }]);

  return OverviewAndHireRow;
}(React.Component);

module.exports = OverviewAndHireRow;