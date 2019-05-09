const React = require('React');

const BurnAndRecycleRow = require('./BurnAndRecycleRow.react');
const PayContractorAndEmployeeRow = require('./PayContractorAndEmployeeRow.react');
const ResearchAndLobbyRow = require('./ResearchAndLobbyRow.react');
const OverviewAndHireRow = require('./OverviewAndHireRow.react');
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
        <OverviewAndHireRow state={state} dispatch={dispatch} />
        <BurnAndRecycleRow state={state} dispatch={dispatch} />
        <PayContractorAndEmployeeRow state={state} dispatch={dispatch} />
        <ResearchAndLobbyRow state={state} dispatch={dispatch} />
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
