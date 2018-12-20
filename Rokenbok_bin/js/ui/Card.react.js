const React = require('React');

/**
 *
 * prop types:
 * title: the title of the card
 * content: an array of body lines for the card
 * actions: optional array, will create buttons
 *    name: name on the button
 *    func: callback when the button is clicked
 *
 */

class Card extends React.Component {
  render() {
    let buttons = [];
    if (this.props.actions != null) {
      buttons = this.props.actions.map(action => {
        return (
          <button
            key={'button_' + action.name}
            onClick={action.func}>
            {action.name}
          </button>
        );
      });
    }
    return (
      <div className="card">
        <div className="cardTitle">
          <b>{this.props.title}</b>
        </div>
          {this.props.content.map(line => <p key={line}>{line}</p>)}
          {buttons}
      </div>
    );
  }
}

module.exports = Card
