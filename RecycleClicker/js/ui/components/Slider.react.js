const React = require('React');
const {getDisplayMoney} = require('../../selectors/selectors');

// props:
// min, max -- lower, upper bounds
// value    -- starting value (min if null)
// onChange -- fn
// step     -- step by this amount, or 1
// name     -- label

class Slider extends React.Component {
  render() {
    const {props} = this;
    return (
      <div className="slider">
        <div className="sliderLabel">
          {props.name}
        </div>
        <input type="range"
          className="sliderSlider"
          min={props.min} max={props.max}
          value={props.value != null ? props.value : props.min}
          onChange={(ev) => props.onChange(parseInt(ev.target.value))}
          step={props.step != null ? props.step : 1}
        />
        <div className="sliderValue">
          {getDisplayMoney(props.value)}
        </div>
      </div>
    );
  }
}

module.exports = Slider;
