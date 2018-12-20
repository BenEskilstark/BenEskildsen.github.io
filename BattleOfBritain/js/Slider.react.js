const React = require('React');

// props:
// min, max -- lower, upper bounds
// value    -- starting value (min if null)
// onChange -- fn
// step     -- step by this amount, or 1
// name     -- label

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
    let value = state.value;
    if (state.value != props.value) {
      value = props.value;
    }
    return (
      <div style={{}}>
        {props.name}
        <input type="range"
          style={{width: 100}}
          min={props.min} max={props.max}
          value={value}
          onChange={(ev) => this.onChange(ev)}
          step={props.step != null ? props.step : 1} />
      {value}
      </div>
    );
  }
}

module.exports = Slider;
