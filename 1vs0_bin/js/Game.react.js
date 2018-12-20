const React = require('React');
const {forEach} = require('./utils');
const {isAllocated, getScores, getPlayerPointers} = require('./selectors');
const {floor, round} = Math;

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {curPointer, memory, pointers, turn, success} = this.state;
    const {dispatch} = this.props.store;
    const scores = getScores(this.state);
    const playerPointers = getPlayerPointers(this.state);
    const memoryRows = [];
    let memoryRow = [];
    for (let i = 0; i < memory.length; i++) {
      if (i !== 0 && i % 10 === 0) {
        memoryRows.push(<MemoryRow
          index={i-10} memoryRow={memoryRow}
          turn={turn} pointers={playerPointers[turn]}
        />);
        memoryRow = [];
      }
      memoryRow.push(memory[i]);
    }
    memoryRows.push(<MemoryRow
      index={90} memoryRow={memoryRow}
      turn={turn} pointers={playerPointers[turn]}
    />);
    const xAxis = [<div className="axisCell"></div>];
    for (let x = 0; x < 10; x++) {
      xAxis.push(<div className="axisCell">{x}</div>);
    }
    let pointerList = [];
    pointerList = playerPointers[turn].map(allocation => {
      return <span>{allocation.pointer} </span>;
    });
    let buttons = <span>
      <button
        onClick={() => dispatch({type: 'malloc', size: 10, pointer: curPointer})}>
        malloc(10)
      </button>
      <button
        onClick={() => dispatch({type: 'realloc', increase: 10, pointer: curPointer})}>
        realloc(10)
      </button>
      <button
        onClick={() => dispatch({type: 'free', pointer: curPointer})}>
        free(10)
      </button>
      <button
        onClick={() => dispatch({type: 'write', bit: turn, length: 10, address: curPointer})}>
        write(10)
      </button>
      {turn == 0 ?
        (<button
          onClick={() => dispatch({type: 'calloc', size: 10, pointer: curPointer})}>
          calloc(10)
        </button>) :
        ''
      }
    </span>;
    return (
      <div className="background">
        <div className="sideBar">
          <h2>Player Turn: {turn}</h2>
          <p>Score: {scores[1]} <b>1</b>s | {scores[0]} <b>0</b>s</p>
          <p>Pointers: {pointerList}</p>
          <p>Success: {success ? 'PASS' : 'FAIL'}</p>
          Memory Address:
          <input value={curPointer}
            onChange={(ev) =>
              dispatch({type: 'setPointer', pointer: parseInt(ev.target.value, 10)})} />
          {buttons}
          <button onClick={() => dispatch({type: 'endTurn'})}>End Turn</button>
        </div>
        <div className="memory">
          <h1><b>1 vs 0</b></h1>
          {xAxis}
          {memoryRows}
        </div>
      </div>
    );
  }
}

class MemoryRow extends React.Component {
  render() {
    const memoryCells = this.props.memoryRow.map((bit, i) => {
      const index = this.props.index + i;
      let background = 'white';
      if (bit == 1) {
        background = 'rgba(200, 200, 200, 0.13)';
      }
      if (isAllocated(this.props.pointers, index)) {
        background = (bit == 1 ? 'lightsteelblue' : 'mistyrose');
      }
      this.props.pointers.forEach(allocation => {
        if (allocation.pointer == index) background = (bit == 1 ? 'steelblue' : 'lightpink');
      });
      return (
        <div
          className="memoryCell"
          style={{
            backgroundColor: background,
          }}
        >
          {bit}
        </div>
      );
    });
    return (
      <div key={this.props.memoryRow.toString()} className="memoryRow">
        <div className="axisCell">{this.props.index}</div>
        {memoryCells}
      </div>
    );
  }
}

module.exports = Game;
