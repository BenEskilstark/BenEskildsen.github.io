// @flow

const React = require('React');
const Level = require('./Level.react');
const Slider = require('./Slider.react');
const {getDoors, getNextDoorID, getDoorColors} = require('../selectors/selectors');

document.addEventListener('click', ev => ev.preventDefault);
document.addEventListener('keyDown', ev => ev.preventDefault);

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      doorID: 1,
    }
  }

  render () {
    const state = this.props.store.getState();
    const {dispatch} = this.props.store;
    const wallButtons = this.wallOrDoorButtons(state);
    const buttonSelection = this.buttonSelection(state);
    const {x, y} = state.editor.selectedCell ? state.editor.selectedCell : {x: 0, y: 0};
    const levelEditorButtons = (
      <span>
        <button
          onClick={() => dispatch({type: 'SET_TARGET_LOCATION', x, y})}>
          Set Maze End
        </button>
        {wallButtons}
        {buttonSelection}
      </span>
    );
    const numSteps = state.level.time

    return (
      <div className="editor">
        <Level
          {...state.level}
          selectedCell={state.editor.selectedCell}
          dispatch={this.props.store.dispatch}
          isEditor={true}
        />
        <div className="sidebar" id="sidebar">
          <button
            onClick={() => dispatch({type: 'SET_START_LOCATION'})}>
            Set Maze Start Position
          </button>
          <button
            onClick={() => dispatch({type: 'SET_STEP_LIMIT', stepLimit: numSteps})}>
            Set Step Limit to Current Steps Taken
          </button>
          <div>
            Doors
            <input
              onChange={() => dispatch({type: 'DOOR_SELECT'})}
              type="checkbox" />
            Delete
            <input
              onChange={() => dispatch({type: 'DELETE_SELECT'})}
              type="checkbox" />
          </div>
          {state.editor.selectedCell
            ? levelEditorButtons
            : 'Select anywhere to add walls, doors, and buttons'}
          <button
            onClick={() => dispatch({type: 'OUTPUT_LEVEL'})}>
            Output Level Data to Console
          </button>
        </div>
      </div>
    );
  }

  wallOrDoorButtons(state) {
    const {doorSelected, deleteSelected} = state.editor;
    let wallOrDoorOrDelete = 'Add Wall';
    if (doorSelected) {
      wallOrDoorOrDelete = 'Add Door';
    }
    if (deleteSelected) {
      wallOrDoorOrDelete = 'Delete';
    }
    const doorID = doorSelected ? getNextDoorID(state) : null;
    return (
      <span>
        <button
          onClick={() => this.addWall('top', doorID, deleteSelected)}>
          {wallOrDoorOrDelete} Top
        </button>
        <button
          onClick={() => this.addWall('bottom', doorID, deleteSelected)}>
          {wallOrDoorOrDelete} Bottom
        </button>
        <button
          onClick={() => this.addWall('left', doorID, deleteSelected)}>
          {wallOrDoorOrDelete} Left
        </button>
        <button
          onClick={() => this.addWall('right', doorID, deleteSelected)}>
          {wallOrDoorOrDelete} Right
        </button>
      </span>
    );
  }

  buttonSelection(state) {
    const doorColorOptions = getDoorColors().map((color, i) => {
      return (
        <option key={"doorID_" + color}
          value={i + 1} style={{backgroundColor: color}}>
          {color}
        </option>
      )
    });
    return (
      <span>
        <select
          id="buttonDropdown"
          onChange={(ev) => this.setState({doorID: parseInt(ev.target.value)})}
        >
          {doorColorOptions}
        </select>
        <button onClick={() => this.addButton()}>Add Button</button>
      </span>
    );
  }

  addWall(side, doorID, shouldDelete) {
    const {x, y} = this.props.store.getState().editor.selectedCell;
    const {dispatch} = this.props.store;
    let type = doorID == null ? 'ADD_WALL' : 'ADD_DOOR';
    if (shouldDelete) {
      type = 'DELETE_WALL';
    }
    switch (side) {
      case 'top':
        dispatch({type, x1: x, x2: x + 1, y1: y, y2: y, doorID});
        break;
      case 'bottom':
        dispatch({type, x1: x, x2: x + 1, y1: y + 1, y2: y + 1, doorID});
        break;
      case 'left':
        dispatch({type, x1: x, x2: x, y1: y, y2: y + 1, doorID});
        break;
      case 'right':
        dispatch({type, x1: x + 1, x2: x + 1, y1: y, y2: y + 1, doorID});
        break;
    }
  }

  addButton() {
    const {x, y} = this.props.store.getState().editor.selectedCell;
    const {dispatch} = this.props.store;
    const {doorID} = this.state;
    dispatch({type: 'ADD_BUTTON', x, y, doorID});
  }
}

module.exports = Editor;
