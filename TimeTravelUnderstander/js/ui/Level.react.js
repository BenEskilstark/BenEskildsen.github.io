// @flow

const React = require('React');
const Maze = require('./Maze.react');
const {getRumbleOffset} = require('../selectors/selectors');

class Level extends React.Component {
  render() {
    const {numReversals, time, stepLimit, level} = this.props;
    const offset = getRumbleOffset(this.props);
    const stepsLeft = stepLimit - time;
    return (
      <div className={this.props.isEditor ? 'editorLevel' : "level"}>
        <div className="multiheader">
          <div className="multiheaderLeft">
            Level <b>{level + 1}</b>
          </div>
          <div className="multiheaderRight">
            <b>{stepsLeft}</b> {stepsLeft == 1 ? 'step' : 'steps'} remaining
          </div>
        </div>
        <div className="subheader">
          <button
            style={{width: '50%', display: 'inline'}}
            onClick={() => {
              this.props.dispatch({type: 'BACK_TO_MAIN_MENU'});
            }}
          >
            Back to Main Menu
          </button>
          <button
            style={{width: '50%', display: 'inline'}}
            onClick={() => this.props.dispatch({type: 'RESET'})}
          >
            Restart Level
          </button>
        </div>
        <div
          style={{
            paddingLeft: offset.x,
            paddingTop: offset.y,
            display: this.props.isEditor ? 'inline' : 'block',
          }}
        >
          <Maze {...this.props} />
        </div>
      </div>
    );
  }
}

module.exports = Level;
