// @flow
const React = require('React');

class MainMenu extends React.Component {
  render() {
    const dispatch = this.props.store.dispatch;
    const levelNum = parseInt(localStorage.getItem('level')) || 0;
    const resetButton = (
      <button onClick={() => dispatch({type: 'CLEAR_LOCAL_STORAGE'})}>
        Reset Game to Level 1
      </button>
    );
    return (<span>
      <div className="mainMenu">
        <button onClick={() => {
          dispatch({
            type: 'SET_MODAL',
            text: 'Welcome to Time Travel Understander! Use the arrow keys to reach the time machine, '
            + 'passing through open doors along the way. Once you reach the time machine, travel'
            + ' back in time and press the color-coded buttons to open the doors just in time'
            + ' for your original self to pass through them! Press the spacebar any time after'
            + ' you\'ve reached the time machine to go back in time again.',
            buttons: [{
              text: 'I "Understand"',
              onClick: () => {
                dispatch({type: 'DISMISS_MODAL'});
                dispatch({type: 'START', dispatch});
              },
            }],
          });
        }}>
          Start {levelNum == 0 ? '' : 'at Level ' + (levelNum + 1)}
        </button>
        <button onClick={() => dispatch({type: 'EDITOR'})}>
          Level Editor
        </button>
        {levelNum == 0 ? null : resetButton}
        <input type="text" style={{width: '100%', marginTop: '50'}} id="levelPaste"></input>
        <button onClick={() => dispatch({type: 'CUSTOM', dispatch,})}>
          Paste Custom Level
        </button>
      </div>
    </span>);
  }
};

module.exports = MainMenu;
