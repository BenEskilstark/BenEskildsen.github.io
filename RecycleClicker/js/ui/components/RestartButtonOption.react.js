const React = require('React');
const ButtonOption = require('./ButtonOption.react');

// props:
// dispatch: function
// win: boolean

class RestartButtonOption extends React.Component {

  render() {
    const {dispatch, win} = this.props;
    let label = 'You saved the world from trash!';
    if (!win) {
      label = 'You failed to save the world from trash';
    }
    return (
      <ButtonOption
        label={label}
        optionNames={['Restart']}
        onClicks={[() => dispatch({type: 'RESTART'})]}
      />
    );
  }
}

module.exports = RestartButtonOption;
