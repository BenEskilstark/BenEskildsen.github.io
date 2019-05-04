'use strict';

var getAgentPositions = function getAgentPositions(state) {
  var time = state.time,
      agents = state.agents;

  return agents.map(function (agent) {
    return agent.history[time] || null;
  });
};

module.exports = { getAgentPositions: getAgentPositions };