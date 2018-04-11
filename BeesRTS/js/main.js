
let game = initGame(1000, 800); // game.js
const systems = getSystems(); // systems.js

const simulation = (self) => {
  setInterval(
    () => {
      self.setState({});
      stepSystems(game, systems);
    },
    game.stepMillis
  );
};

React.render(
  <Game
    game={game}
    runSimulation={simulation}
  />,
  document.getElementById('container')
);
