const React = require('React');

// props:
// label: string
// value: number

class LabelledValue extends React.Component {

  render() {
    return (
      <span className="labelledValue">
        <div className="labelName" key={this.props.label}>
          {this.props.label}:
        </div>
        <div className="labelValue" key={this.props.label + "_" + this.props.value}>
          {this.props.value}
        </div>
      </span>
    );
  }
}

module.exports = LabelledValue;
