const React = require('React');

const Button = require('./components/Button.react');
const Card = require('./components/Card.react');
const LabelledValue = require('./components/LabelledValue.react');
const RadioPicker = require('./components/RadioPicker.react');
const Slider = require('./components/Slider.react');
const Table = require('./components/Table.react');
const Ticker = require('./components/Ticker.react');

const {
  getDisplayMoney
} = require('../selectors/selectors.js');

/**
 * {state: {...store.getState()}}
 * {props: {store}}
 */
class Game extends React.Component {

  constructor(props) {
    super(props);
    props.store.subscribe(() => {
      this.setState({...this.props.store.getState()});
    });
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {dispatch} = this.props.store;
    const {state} = this;
    let content = (
      <React.Fragment>
        <Ticker messages={state.ticker.messages} />
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
        <Card>
          <Button
            label="Hire"
            onClick={() => dispatch({type: 'HIRE', num: 1})}
          />
          <RadioPicker
            options={state.employees.roleOptions}
            selected={state.ui.selectedRole}
            onChange={(role) => dispatch({type: 'SELECT_ROLE', role})}
          />
        </Card>

        <Card>
          <Button label="Burn" onClick={() => dispatch({type: 'BURN', num: 1})} />
          <LabelledValue label="Burners" value={state.employees.Burner.cur} />
          <LabelledValue label="Trash burned" value={state.burn.cur} />
          <LabelledValue
            label="$/burn"
            value={getDisplayMoney(state.config.revenuePerBurn)}
          />
        </Card>
        <Card>
          <Button label="Recycle" onClick={() => dispatch({type: 'RECYCLE', num: 1})} />
          <LabelledValue label="Recyclers" value={state.employees.Recycler.cur} />
          <LabelledValue label="Trash recycled" value={state.recycle.cur} />
          <LabelledValue
            label="$/recycle"
            value={getDisplayMoney(state.config.revenuePerRecycle)}
          />
        </Card>

        <Card>
          <Button
            label="Pay Contractors"
            onClick={() => dispatch({type: 'PAY_CONTRACTOR', num: 1})}
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
          <LabelledValue
            label="Wage"
            value={getDisplayMoney(state.employees.contractor.wage)}
          />
        </Card>
        <Card>
          <Button
            label="Pay Employees"
            onClick={() => dispatch({type: 'PAY_EMPLOYEE', num: 1})}
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
          <LabelledValue
            label="Salary"
            value={getDisplayMoney(state.employees.employee.wage)}
          />
        </Card>

        <Card>
          <Button
            label="Research"
            onClick={() => dispatch({type: 'RESEARCH', num: 1})}
          />
          <LabelledValue label="Scientists" value={state.employees.Scientist.cur} />
          <LabelledValue label="Research" value={state.research.cur} />
          {state.research.greedyOptions.length > 0 ?
            <Button
              label={
                state.research.greedyOptions[0].name + " (cost " +
                state.research.greedyOptions[0].cost + ")"
              }
              onClick={() => dispatch({type: 'RESEARCH_GREEDY'})}
            /> : null}
          {state.research.goodOptions.length > 0 ?
            <Button
              label={
                state.research.goodOptions[0].name + " (cost " +
                state.research.goodOptions[0].cost + ")"
              }
              onClick={() => dispatch({type: 'RESEARCH_GOOD'})}
            /> : null}
        </Card>
        <Card>
          <Button
            label="Lobby"
            onClick={() => dispatch({type: 'LOBBY', num: 1})}
          />
          <LabelledValue label="Lawyers" value={state.employees.Lawyer.cur} />
          <LabelledValue label="Lobbying" value={state.lobby.cur} />
          {state.lobby.greedyOptions.length > 0 ?
            <Button
              label={
                state.lobby.greedyOptions[0].name + " (cost " +
                state.lobby.greedyOptions[0].cost + ")"
              }
              onClick={() => dispatch({type: 'LOBBY_GREEDY'})}
            /> : null}
          {state.lobby.goodOptions.length > 0 ?
            <Button
              label={
                state.lobby.goodOptions[0].name + " (cost " +
                state.lobby.goodOptions[0].cost + ")"
              }
              onClick={() => dispatch({type: 'LOBBY_GOOD'})}
            /> : null}
        </Card>
      </React.Fragment>
    );



    return (
      <div className="background">
        {content}
      </div>
    );
  }
};

module.exports = Game;
