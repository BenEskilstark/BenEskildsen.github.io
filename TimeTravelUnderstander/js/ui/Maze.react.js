// @flow
const React = require('React');
const {Motion, spring} = require('react-motion');
const {
  getAgentPositions,
  getDoorColor,
} = require('../selectors/selectors.js');

const WALL_SIZE = 80;

class Maze extends React.Component {
  renderAgents() {
    const positions = getAgentPositions(this.props);
    const {prevTime, time} = this.props;
    return positions.map((pos, i) => {
      const num = positions.length - i;
      const isUserAgent = i == 0;
      if (!pos) return null;
      return this.drawTweenedAgent(pos, num, true, isUserAgent);
    });
  }

  drawTweenedAgent(pos, num, shouldTween, isUserAgent) {
    return (
      <Motion
        key={'motion_' + num}
        defaultStyle={{x: pos.x, y: pos.y}}
        style={{
          x: (shouldTween) ? spring(pos.x) : pos.x,
          y: (shouldTween) ? spring(pos.y) : pos.y,
        }}
      >
        {motionVal => this.drawAgent(motionVal, num, isUserAgent)}
      </Motion>
    );
  }

  drawAgent(pos, num, isUserAgent) {
    return (
      <div
        key={'agent_' + num}
        className="tile"
        style={{
          top: pos.y * 80,
          left: pos.x * 80,
          background: '#edcf72',
          color: '#f9f6f2',
          opacity: isUserAgent ? 1 : 0.5,
          width: isUserAgent ? 62 : 70,
          border: isUserAgent ? '4px solid orange' : '0px',
        }}
      >
      </div>
    );
  }

  renderTarget(pos) {
    return (
      <div
        key={'target_' + pos.x + pos.y}
        className="tile"
        style={{
          top: pos.y * 80,
          left: pos.x * 80,
          background: '#956E01',
          color: '#f9f6f2',
        }}
      >
        <b>{'\u231B'}</b>
      </div>
    );
  }

  renderWalls() {
    return this.props.walls.map((wall, i) => {
      if (wall.invisible) return null;
      return (
        <div
          key={'wall_' + i}
          className="wall"
          style={{
            top: WALL_SIZE * wall.start.y - 2.5,
            left: WALL_SIZE * wall.start.x - 2.5,
            width: WALL_SIZE * (wall.end.x - wall.start.x) + 10,
            height: WALL_SIZE * (wall.end.y - wall.start.y) + 10,
            background: wall.doorID ? getDoorColor(wall.doorID) : 'lightgray',
            opacity: wall.isOpen ? 0.25 : 1,
          }}
        ></div>
      );
    });
  }

  renderSelectedCell(coord) {
    if (!coord) return null;

    return (
      <div
        className="selectedCell"
        style={{
          top: WALL_SIZE * coord.y + 7.5,
          left: WALL_SIZE * coord.x + 7.5,
          width: WALL_SIZE - 10,
          height: WALL_SIZE - 10,
        }}
      ></div>
    );
  }

  renderButtons() {
    return this.props.buttons.map((button, i) => {
      return (
        <button
          className='button'
          key={'button_' + i}
          style={{
            top: button.position.y * 80,
            left: button.position.x * 80,
            background: getDoorColor(button.doorID),
            boxShadow: button.pressed ? 'inset 4px 4px 5px #888888' : 'none',
          }}
        >
        </button>
      );
    });
  }

  onMouseDown(ev) {
    ev.preventDefault();
    const grid = document.getElementById('grid').getBoundingClientRect();
    const pixelX = ev.clientX - grid.left;
    const pixelY = ev.clientY - grid.top;

    const x = Math.floor(pixelX / 80);
    const y = Math.floor(pixelY / 80);

    // support mobile outside the editor
    if (!this.props.isEditor) {
      // left
      if ((x == -1 || x == 0 || x == 2) && (y == 2 || y == 3 || y == 4)) {
        store.dispatch({type: 'MOVE', dir: {x: -1}, key: 'left'});
      } else
      // right
      if ((x == 7 || x == 6 || x == 5) && (y == 2 || y == 3 || y == 4)) {
        store.dispatch({type: 'MOVE', dir: {x: 1}, key: 'right'});
      } else
      // up
      if ((y == -1 || y == 0 || y == 2) && (x == 2 || x == 3 || x == 4)) {
        store.dispatch({type: 'MOVE', dir: {y: -1}, key: 'up'});
      } else
      // down
      if ((y == 7 || y == 6 || y == 5) && (x == 2 || x == 3 || x == 4)) {
        store.dispatch({type: 'MOVE', dir: {y: 1}, key: 'down'});
      } else
      // reverse time
      if ((x == 2 || x == 3 || x == 4) && (y == 2 || y == 3 || y == 4)) {
        store.dispatch({type: 'REVERSE_TIME'});
      }
      return;
    }

    // in editor
    if (ev.button == 0) {
      this.props.dispatch({type: 'SELECT_CELL', x, y});
    }
  }

  render() {
    return (
      <div id="grid" className="grid"
        onTouchStart={(ev) => this.onMouseDown(ev)}
        onMouseDown={(ev) => this.onMouseDown(ev)}
      >
        {this.renderButtons()}
        {this.renderTarget(this.props.target.pos)}
        {this.renderAgents()}
        {this.renderWalls()}
        {this.renderSelectedCell(this.props.selectedCell)}
        {this.renderReverseTimeAnimation(this.props)}
      </div>
    );
  }

  renderReverseTimeAnimation(state) {
    const {reverseTime} = state;
    if (!reverseTime || !reverseTime.shouldAnimate || reverseTime.count <= 0) {
      return null;
    }

    const {size, theta} = reverseTime;
    return (
      <div
        className="hourglass"
        style={{
          top: 3.5 * 80 - size * 0.75,
          left: 3.5 * 80 - size / 2,
          width: size,
          height: size,
          fontSize: size / 2,
          transform: 'rotate('+(theta * 180 / Math.PI)+'deg)',
          color: '#f9f6f2',
        }}
      >
        {'\u231B'}
      </div>
    );
  }
}

module.exports = Maze;
