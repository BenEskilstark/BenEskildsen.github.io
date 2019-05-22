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


var ResearchAndLobbyRow = function (_React$Component) {
  _inherits(ResearchAndLobbyRow, _React$Component);

  function ResearchAndLobbyRow() {
    _classCallCheck(this, ResearchAndLobbyRow);

    return _possibleConstructorReturn(this, (ResearchAndLobbyRow.__proto__ || Object.getPrototypeOf(ResearchAndLobbyRow)).apply(this, arguments));
  }

  _createClass(ResearchAndLobbyRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          state = _props.state,
          dispatch = _props.dispatch;
      var godMode = state.ui.godMode;

      var researchCard = React.createElement(
        Card,
        null,
        React.createElement(Button, {
          id: 'RESEARCH',
          label: 'Research',
          onClick: function onClick() {
            return dispatch({ type: 'RESEARCH', num: 1 });
          }
        }),
        React.createElement(LabelledValue, { label: 'Scientists', value: state.employees.Scientist.cur }),
        React.createElement(LabelledValue, { label: 'Research', value: state.research.cur }),
        state.research.greedyOptions.length > 0 ? React.createElement(Button, {
          label: state.research.greedyOptions[0].name + " (cost " + state.research.greedyOptions[0].cost + ")",
          onClick: function onClick() {
            return dispatch({ type: 'RESEARCH_GREEDY' });
          },
          disabled: state.research.cur < state.research.greedyOptions[0].cost && !godMode
        }) : null,
        state.research.goodOptions.length > 0 ? React.createElement(Button, {
          label: state.research.goodOptions[0].name + " (cost " + state.research.goodOptions[0].cost + ")",
          onClick: function onClick() {
            return dispatch({ type: 'RESEARCH_GOOD' });
          },
          disabled: state.research.cur < state.research.goodOptions[0].cost && !godMode
        }) : null
      );
      var lobbyCard = React.createElement(
        Card,
        null,
        React.createElement(Button, {
          id: 'LOBBY',
          label: 'Lobby',
          onClick: function onClick() {
            return dispatch({ type: 'LOBBY', num: 1 });
          }
        }),
        React.createElement(LabelledValue, { label: 'Lawyers', value: state.employees.Lawyer.cur }),
        React.createElement(LabelledValue, { label: 'Lobbying', value: state.lobby.cur }),
        state.lobby.greedyOptions.length > 0 ? React.createElement(Button, {
          label: state.lobby.greedyOptions[0].name + " (cost " + state.lobby.greedyOptions[0].cost + ")",
          onClick: function onClick() {
            return dispatch({ type: 'LOBBY_GREEDY' });
          },
          disabled: state.lobby.cur < state.lobby.greedyOptions[0].cost && !godMode
        }) : null,
        state.lobby.goodOptions.length > 0 ? React.createElement(Button, {
          label: state.lobby.goodOptions[0].name + " (cost " + state.lobby.goodOptions[0].cost + ")",
          onClick: function onClick() {
            return dispatch({ type: 'LOBBY_GOOD' });
          },
          disabled: state.lobby.cur < state.lobby.goodOptions[0].cost && !godMode
        }) : null
      );
      return React.createElement(
        React.Fragment,
        null,
        maybe(state, researchCard, 'researchVisible'),
        maybe(state, lobbyCard, 'lobbyVisible')
      );
    }
  }]);

  return ResearchAndLobbyRow;
}(React.Component);

module.exports = ResearchAndLobbyRow;