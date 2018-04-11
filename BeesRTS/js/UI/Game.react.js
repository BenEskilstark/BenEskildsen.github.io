
const Game = React.createClass({

  componentDidMount: function() {
    this.props.runSimulation(this);
  },

  render: function() {
    return (
      <div className="background">
        <Canvas
          canvas={this.props.game.canvas}
          mouse={this.props.game.mouse}
          keys={this.props.game.keys}
          runSimulation={this.props.runSimulation}
        />
        <Sidebar
          game={this.props.game}
        />
      </div>
    );
  }
});
