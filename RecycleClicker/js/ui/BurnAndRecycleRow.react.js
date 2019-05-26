const React = require('React');

const Button = require('./components/Button.react');
const Card = require('./components/Card.react');
const LabelledValue = require('./components/LabelledValue.react');

const {getDisplayMoney} = require('../selectors/selectors.js');

/**
 * {props: {state}}
 */
class BurnAndRecycleRow extends React.Component {
  render() {
    const {state, dispatch} = this.props;
    return (
      <React.Fragment>
        <Card>
          <Button
            id="BURN"
            label={"Burn (+" + getDisplayMoney(state.config.revenuePerBurn) + ")"}
            onClick={() => dispatch({type: 'BURN', num: 1})}
            disabled={state.trash.cur <= 0 || state.ui.gameOver}
          />
          <LabelledValue label="Burners" value={state.employees.Burner.cur} />
          <LabelledValue label="Trash burned" value={state.burn.cur} />
        </Card>
        <Card>
          <Button
            id="RECYCLE"
            label={"Recycle (+" + getDisplayMoney(state.config.revenuePerRecycle) + ")"}
            onClick={() => dispatch({type: 'RECYCLE', num: 1})}
            disabled={state.trash.cur <= 0 || state.ui.gameOver}
          />
          <LabelledValue label="Recyclers" value={state.employees.Recycler.cur} />
          <LabelledValue label="Trash recycled" value={state.recycle.cur} />
        </Card>
      </React.Fragment>
    );
  }
}

module.exports = BurnAndRecycleRow;
