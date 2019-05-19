'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var Level = require('./Level.react');
var Slider = require('./Slider.react');

var _require = require('../selectors/selectors'),
    getDoors = _require.getDoors,
    getNextDoorID = _require.getNextDoorID,
    getDoorColors = _require.getDoorColors;

document.addEventListener('click', function (ev) {
  return ev.preventDefault;
});
document.addEventListener('keyDown', function (ev) {
  return ev.preventDefault;
});

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this.state = {
      doorID: 1
    };
    return _this;
  }

  _createClass(Editor, [{
    key: 'render',
    value: function render() {
      var state = this.props.store.getState();
      var dispatch = this.props.store.dispatch;

      var wallButtons = this.wallOrDoorButtons(state);
      var buttonSelection = this.buttonSelection(state);

      var _ref = state.editor.selectedCell ? state.editor.selectedCell : { x: 0, y: 0 },
          x = _ref.x,
          y = _ref.y;

      var levelEditorButtons = React.createElement(
        'span',
        null,
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return dispatch({ type: 'SET_TARGET_LOCATION', x: x, y: y });
            } },
          'Set Maze End'
        ),
        wallButtons,
        buttonSelection
      );
      var numSteps = state.level.time;

      return React.createElement(
        'div',
        { className: 'editor' },
        React.createElement(Level, _extends({}, state.level, {
          selectedCell: state.editor.selectedCell,
          dispatch: this.props.store.dispatch,
          isEditor: true
        })),
        React.createElement(
          'div',
          { className: 'sidebar', id: 'sidebar' },
          React.createElement(
            'button',
            {
              onClick: function onClick() {
                return dispatch({ type: 'SET_START_LOCATION' });
              } },
            'Set Maze Start Position'
          ),
          React.createElement(
            'button',
            {
              onClick: function onClick() {
                return dispatch({ type: 'SET_STEP_LIMIT', stepLimit: numSteps });
              } },
            'Set Step Limit to Current Steps Taken'
          ),
          React.createElement(
            'div',
            null,
            'Doors',
            React.createElement('input', {
              onChange: function onChange() {
                return dispatch({ type: 'DOOR_SELECT' });
              },
              type: 'checkbox' }),
            'Delete',
            React.createElement('input', {
              onChange: function onChange() {
                return dispatch({ type: 'DELETE_SELECT' });
              },
              type: 'checkbox' })
          ),
          state.editor.selectedCell ? levelEditorButtons : 'Select anywhere to add walls, doors, and buttons',
          React.createElement(
            'button',
            {
              onClick: function onClick() {
                return dispatch({ type: 'OUTPUT_LEVEL' });
              } },
            'Output Level Data to Console'
          )
        )
      );
    }
  }, {
    key: 'wallOrDoorButtons',
    value: function wallOrDoorButtons(state) {
      var _this2 = this;

      var _state$editor = state.editor,
          doorSelected = _state$editor.doorSelected,
          deleteSelected = _state$editor.deleteSelected;

      var wallOrDoorOrDelete = 'Add Wall';
      if (doorSelected) {
        wallOrDoorOrDelete = 'Add Door';
      }
      if (deleteSelected) {
        wallOrDoorOrDelete = 'Delete';
      }
      var doorID = doorSelected ? getNextDoorID(state) : null;
      return React.createElement(
        'span',
        null,
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return _this2.addWall('top', doorID, deleteSelected);
            } },
          wallOrDoorOrDelete,
          ' Top'
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return _this2.addWall('bottom', doorID, deleteSelected);
            } },
          wallOrDoorOrDelete,
          ' Bottom'
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return _this2.addWall('left', doorID, deleteSelected);
            } },
          wallOrDoorOrDelete,
          ' Left'
        ),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              return _this2.addWall('right', doorID, deleteSelected);
            } },
          wallOrDoorOrDelete,
          ' Right'
        )
      );
    }
  }, {
    key: 'buttonSelection',
    value: function buttonSelection(state) {
      var _this3 = this;

      var doorColorOptions = getDoorColors().map(function (color, i) {
        return React.createElement(
          'option',
          { key: "doorID_" + color,
            value: i + 1, style: { backgroundColor: color } },
          color
        );
      });
      return React.createElement(
        'span',
        null,
        React.createElement(
          'select',
          {
            id: 'buttonDropdown',
            onChange: function onChange(ev) {
              return _this3.setState({ doorID: parseInt(ev.target.value) });
            }
          },
          doorColorOptions
        ),
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this3.addButton();
            } },
          'Add Button'
        )
      );
    }
  }, {
    key: 'addWall',
    value: function addWall(side, doorID, shouldDelete) {
      var _props$store$getState = this.props.store.getState().editor.selectedCell,
          x = _props$store$getState.x,
          y = _props$store$getState.y;
      var dispatch = this.props.store.dispatch;

      var type = doorID == null ? 'ADD_WALL' : 'ADD_DOOR';
      if (shouldDelete) {
        type = 'DELETE_WALL';
      }
      switch (side) {
        case 'top':
          dispatch({ type: type, x1: x, x2: x + 1, y1: y, y2: y, doorID: doorID });
          break;
        case 'bottom':
          dispatch({ type: type, x1: x, x2: x + 1, y1: y + 1, y2: y + 1, doorID: doorID });
          break;
        case 'left':
          dispatch({ type: type, x1: x, x2: x, y1: y, y2: y + 1, doorID: doorID });
          break;
        case 'right':
          dispatch({ type: type, x1: x + 1, x2: x + 1, y1: y, y2: y + 1, doorID: doorID });
          break;
      }
    }
  }, {
    key: 'addButton',
    value: function addButton() {
      var _props$store$getState2 = this.props.store.getState().editor.selectedCell,
          x = _props$store$getState2.x,
          y = _props$store$getState2.y;
      var dispatch = this.props.store.dispatch;
      var doorID = this.state.doorID;

      dispatch({ type: 'ADD_BUTTON', x: x, y: y, doorID: doorID });
    }
  }]);

  return Editor;
}(React.Component);

module.exports = Editor;