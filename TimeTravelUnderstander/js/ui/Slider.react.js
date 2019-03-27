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

  handleChange(ev) {
    const value = parseInt(ev.target.value);
    console.log(value);
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value != null ? nextProps.value : this.state.value});
  }

  render() {
    const {props, state} = this;
    console.log('render');
    return (
      <div style={{}}>
        {props.name}
        <input type="range"
          style={{width: 100}}
          min={props.min} max={props.max}
          onChange={this.handleChange}
          step={props.step != null ? props.step : 1} />
      {this.state.value}
      </div>
    );
  }
}

module.exports = Slider;
