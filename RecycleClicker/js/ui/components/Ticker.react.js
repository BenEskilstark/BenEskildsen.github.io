const React = require('React');

// props:
// messages: Array of messages to try to display

const NUM_MESSAGES_TO_DISPLAY = 5;

class Ticker extends React.Component {

  render() {
    const {messages} = this.props;
    const toDisplay = [];
    const numMessagesToDisplay = Math.min(NUM_MESSAGES_TO_DISPLAY, messages.length);
    for (let i = 0; i < numMessagesToDisplay; i++) {

      let message = messages[i];
      if (i == numMessagesToDisplay - 1) {
        message = '> ' + message;
      }
      toDisplay.push(<div key={'message_' + message + '_' + i}>{message}</div>);

    }
    return (
      <div className="ticker">
        {toDisplay}
      </div>
    );
  }
}

module.exports = Ticker;
