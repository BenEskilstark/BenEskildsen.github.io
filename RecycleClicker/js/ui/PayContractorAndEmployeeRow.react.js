const React = require('React');

const Button = require('./components/Button.react');
const Card = require('./components/Card.react');
const LabelledValue = require('./components/LabelledValue.react');

const {getDisplayMoney, maybe} = require('../selectors.js');

/**
 * {props: {state}}
 */
class PayContractorAndEmployeeRow extends React.Component {
  render() {
    const {state, dispatch} = this.props;
    const payContractorCard = (
      <Card>
        <Button
          id="PAY_CONTRACTOR"
          label={"Pay Contractor (-" + getDisplayMoney(state.employees.contractor.wage) + ")"}
          onClick={() => dispatch({type: 'PAY_CONTRACTOR', num: 1})}
          disabled={
            (state.money.cur < state.employees.contractor.wage) ||
            (state.employees.contractor.needPay == 0 &&
              state.employees.contractor.aboutToLeave == 0)
          }
        />
        <LabelledValue label="Foremen" value={state.employees.Foreman.cur} />
        <LabelledValue
          label="Contrs. to pay"
          value={state.employees.contractor.needPay}
        />
        <LabelledValue
          label="About to quit"
          value={state.employees.contractor.aboutToLeave}
        />
      </Card>
    );
    const payEmployeeCard = (
      <Card>
        <Button
          id="PAY_EMPLOYEE"
          label={"Pay Employee (-" + getDisplayMoney(state.employees.employee.wage) + ")"}
          onClick={() => dispatch({type: 'PAY_EMPLOYEE', num: 1})}
          disabled={
            state.money.cur < state.employees.employee.wage ||
            (state.employees.employee.needPay == 0 &&
              state.employees.employee.aboutToLeave == 0)
          }
        />
        <LabelledValue label="Managers" value={state.employees.Manager.cur} />
        <LabelledValue
          label="Empls. to pay"
          value={state.employees.employee.needPay}
        />
        <LabelledValue
          label="About to quit"
          value={state.employees.employee.aboutToLeave}
        />
      </Card>
    );
    return (
      <React.Fragment>
        {maybe(state, payContractorCard, 'payContractorVisible')}
        {maybe(state, payEmployeeCard, 'payEmployeeVisible')}
      </React.Fragment>
    );
  }
}

module.exports = PayContractorAndEmployeeRow;
