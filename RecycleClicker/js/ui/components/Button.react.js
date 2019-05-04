const React = require('React');

// props:
// label: string
// onClick: () => void

class Button extends React.Component {

  render() {
    return (
      <button type="button"
        id={this.props.label.toUpperCase() + '_button'}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}

module.exports = Button;
