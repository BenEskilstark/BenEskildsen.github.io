const React = require('React');

// props:
// label: string
// value: number

class LabelledValue extends React.Component {

  render() {
    return (
      <span className="labelledValue">
        <div className="labelName">
          {this.props.label}:
        </div>
        <div className="labelValue">
          {this.props.value}
        </div>
      </span>
    );
  }
}

module.exports = LabelledValue;
