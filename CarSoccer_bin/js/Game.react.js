const React = require('React');
const {forEachMatrix} = require('../utils');
const {floor, round} = Math;
const Slider = require('./Slider.react');

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {dispatch} = this.props.store;
    const {entities, score, fieldWidth, fieldHeight} = this.state;

    return (
      <canvas width={fieldWidth} height={fieldHeight} id={'canvas'} />
    );
  }
}

module.exports = Game;
