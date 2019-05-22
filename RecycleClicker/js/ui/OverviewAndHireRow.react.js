const React = require('React');

const Button = require('./components/Button.react');
const Card = require('./components/Card.react');
const LabelledValue = require('./components/LabelledValue.react');
const RadioPicker = require('./components/RadioPicker.react');

const {getDisplayMoney, maybe} = require('../selectors.js');

/**
 * {props: {state}}
 */
class OverviewAndHireRow extends React.Component {
  render() {
    const {state, dispatch} = this.props;
    const contractorOrEmployee = state.config.employees.includes(state.ui.selectedRole)
      ? 'employee'
      : 'contractor';
    let wage = 2 * state.employees[contractorOrEmployee].wage;

    // only hire more than one contractor at once
    if (contractorOrEmployee == 'contractor') {
      wage *= state.config.employeesPerHire;
    }
    const hireCard = (
      <Card>
        <Button
          id="HIRE"
          label={"Hire (-" + getDisplayMoney(wage) + ")"}
          onClick={() => dispatch({type: 'HIRE', num: 1})}
          disabled={state.money.cur < wage}
        />
        <RadioPicker
          options={state.employees.roleOptions}
          selected={state.ui.selectedRole}
          onChange={(role) => dispatch({type: 'SELECT_ROLE', role})}
        />
      </Card>
    );
    return (
      <React.Fragment>
        <Card>
          <LabelledValue label="Trash" value={state.trash.cur} />
          <LabelledValue label="Money" value={getDisplayMoney(state)} />
          <LabelledValue
            label="Contractors"
            value={state.employees.Recycler.cur + state.employees.Burner.cur}
          />
          <LabelledValue
            label="Employees"
            value={
              state.employees.Manager.cur + state.employees.Recruiter.cur +
              state.employees.Scientist.cur + state.employees.Lawyer.cur +
              state.employees.Foreman.cur
            }
          />
        </Card>
        {maybe(state, hireCard, 'hireVisible')}
      </React.Fragment>
    );
  }
}

module.exports = OverviewAndHireRow;
