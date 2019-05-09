const React = require('React');

const Button = require('./components/Button.react');
const Card = require('./components/Card.react');
const LabelledValue = require('./components/LabelledValue.react');

const {getDisplayMoney, maybe} = require('../selectors/selectors.js');

/**
 * {props: {state}}
 */
class ResearchAndLobbyRow extends React.Component {
  render() {
    const {state, dispatch} = this.props;
    const {godMode} = state.ui;
    const researchCard = (
      <Card>
        <Button
          id="RESEARCH"
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
            disabled={state.research.cur < state.research.greedyOptions[0].cost && !godMode}
          /> : null}
        {state.research.goodOptions.length > 0 ?
          <Button
            label={
              state.research.goodOptions[0].name + " (cost " +
              state.research.goodOptions[0].cost + ")"
            }
            onClick={() => dispatch({type: 'RESEARCH_GOOD'})}
            disabled={state.research.cur < state.research.goodOptions[0].cost && !godMode}
          /> : null}
      </Card>
    );
    const lobbyCard = (
      <Card>
        <Button
          id="LOBBY"
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
            disabled={state.lobby.cur < state.lobby.greedyOptions[0].cost && !godMode}
          /> : null}
        {state.lobby.goodOptions.length > 0 ?
          <Button
            label={
              state.lobby.goodOptions[0].name + " (cost " +
              state.lobby.goodOptions[0].cost + ")"
            }
            onClick={() => dispatch({type: 'LOBBY_GOOD'})}
            disabled={state.lobby.cur < state.lobby.goodOptions[0].cost && !godMode}
          /> : null}
      </Card>
    );
    return (
      <React.Fragment>
        {maybe(state, dispatch, researchCard, 'researchVisible')}
        {maybe(state, dispatch, lobbyCard, 'lobbyVisible')}
      </React.Fragment>
    );
  }
}

module.exports = ResearchAndLobbyRow;
