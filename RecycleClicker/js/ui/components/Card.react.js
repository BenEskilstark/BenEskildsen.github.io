const React = require('React');

// props:
// rows: Array<React>

class Card extends React.Component {

  render() {
    return (
      <div className="card">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Card;
