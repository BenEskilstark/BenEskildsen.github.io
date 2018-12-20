const React = require('React');

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value != null ? this.props.value : this.props.min,
    };
  }

  onChange(ev) {
    const value = parseInt(ev.target.value);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.setState({value});
  }

  render() {
    const {props, state} = this;
    return (
      <div style={{}}>
        {props.name}
        <input type="range"
          style={{width: 100}}
          min={props.min} max={props.max}
          value={state.value}
          onChange={(ev) => this.onChange(ev)}
          step={props.step != null ? props.step : 1} />
      </div>
    );
  }
}

module.exports = Slider;
