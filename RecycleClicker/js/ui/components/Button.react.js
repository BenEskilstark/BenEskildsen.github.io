const React = require('React');

// props:
// id: string
// label: string
// onClick: () => void

class Button extends React.Component {

  render() {
    const id = this.props.id || this.props.label;
    return (
      <button type="button"
        id={id.toUpperCase() + '_button'}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}

module.exports = Button;
