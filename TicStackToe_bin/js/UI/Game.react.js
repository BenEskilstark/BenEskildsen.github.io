const React = require('React');
const {forEachMatrix} = require('../utils');
const {floor, round} = Math;
const {hasWon} = require('../selectors');
const {placePiece, movePiece} = require('../actions');
const Slider = require('./Slider.react');

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    const grid = new Image();
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {dispatch} = this.props.store;
    const {board, turn, offset} = this.state;
    const pieces = [];
    forEachMatrix(board, (stack) => {
      stack.forEach(piece => {
        const {size, x, y, player} = piece;
        const color = player == 1 ? 'lightgray' : 'steelblue';
        // unshift to render bigger pieces before smaller ones
        pieces.unshift(<Piece
          size={size} x={x} y={y} color={color}
          key={'' + String(size) + String(x) + String(y)}
        />);
      });
    });


    return (
      <span>
        <div
          style={{backgroundColor: turn == 0 ? 'steelblue' : 'lightgray'}}
          className="grid"
        >
          <img
            className="image"
            src="../grid.png" />
          {pieces}
        </div>
        <ActionPane store={this.props.store} />
      </span>
    );
  }
}

class ActionPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: 'placePiece',
      fromX: 0,
      fromY: 0,
      x: 1,
      y: 1,
      size: 2,
    };
  }

  render() {
    const {state} = this;
    let fromCoords = null;
    if (state.action == 'movePiece') {
      fromCoords = [
        <Slider key={1} min={0} max={2} name={"SRow:"} value={state.fromY}
          onChange={(value) => this.setState({fromY: value})} />,
        <Slider key={2} min={0} max={2} name={"SCol:"} value={state.fromX}
          onChange={(value) => this.setState({fromX: value})} />
      ];
    }
    return (
      <div className="actionPane">
        <select onChange={(ev) => this.setState({action: ev.target.value})}>
          <option value="placePiece">Place Piece</option>
          <option value="movePiece">Move Piece</option>
        </select>
        <Slider min={1} max={3} name={"Size:"} value={state.size}
          onChange={(value) => this.setState({size: value})} />
        {fromCoords}
        <Slider min={0} max={2} name={"Row :"} value={state.y}
          onChange={(value) => this.setState({y: value})} />
        <Slider min={0} max={2} name={"Col :"} value={state.x}
          onChange={(value) => this.setState({x: value})} />
        <button
          onClick={() => {
            const {fromX, fromY, x, y, action, size} = this.state;
            const store = this.props.store;
            if (action == 'placePiece') {
              placePiece(store, x, y, size);
            } else {
              movePiece(store, fromX, fromY, x, y, size);
            }
          }}
        >Go</button>

      </div>
    );
  }
}

class Piece extends React.Component {
  render() {
    const {size, color, x, y} = this.props;
    const pxSize = size * BOARD_TO_PX;
    return (
      <div
        className="piece"
        style={{
          top: boardToCellPx(x, y).y - pxSize / 2,
          left: boardToCellPx(x, y).x - pxSize / 2,
          width: pxSize,
          height: pxSize,
          borderRadius: pxSize / 2,
          boxShadow: `${color} 2px 2px`,
          backgroundColor: color,
        }}></div>
    );
  }
}

const BOARD_TO_PX = 50;

const boardToCellPx = (x, y) => {
  let px = [
    [{x: 125, y: 130}, {x: 338, y: 130}, {x: 555, y: 130}],
    [{x: 125, y: 338}, {x: 338, y: 338}, {x: 555, y: 338}],
    [{x: 125, y: 540}, {x: 338, y: 540}, {x: 555, y: 540}],
  ];
  return px[y][x];
}

const boardToPx = (x, y) => {
  return {
    x: (x + 0.5) * (3 * BOARD_TO_PX + 5) + 35,
    y: (y + 0.5) * (3 * BOARD_TO_PX + 5) + 35,
  };
};

module.exports = Game;
