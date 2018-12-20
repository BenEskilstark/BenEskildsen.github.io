'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var Card = require('./Card.react');

var _require = require('../settings'),
    TRUCK_COST = _require.TRUCK_COST,
    MINER_COST = _require.MINER_COST,
    BASE_COST = _require.BASE_COST,
    AUTOMATION_COST = _require.AUTOMATION_COST;

var floor = Math.floor;

var Sidebar = function (_React$Component) {
  _inherits(Sidebar, _React$Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    props.store.subscribe(function () {
      return _this.setState(_extends({}, _this.props.store.getState()));
    });
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      var dispatch = this.props.store.dispatch;

      var cards = [];
      var factory = this.state.entities.filter(function (e) {
        return e.type == 'factory';
      })[0];
      var milestones = this.state.bokMilestones.map(formatMilestone);
      cards.push(React.createElement(Card, {
        key: 'titleCard',
        title: 'Rokenbok Factory',
        content: ['Total Bok Collected: ' + factory.totalCollected, 'Current Bok: ' + factory.collected, 'Milestone \xA0 Time'].concat(_toConsumableArray(milestones)) }));

      // selection card
      var title = 'Right click to select';
      var content = ['Once you have selected something, right click anywhere else to deselect'];
      var actions = [];
      var selEntity = this.state.entities.filter(function (e) {
        return e.selected;
      })[0];
      if (selEntity) {
        if (selEntity.type == 'miner') {
          title = 'Selected miner';
          content = ['Use the arrows to point this miner towards boks. Deselect and it will mine back and forth automatically.'];
        }
        if (selEntity.type == 'truck') {
          title = 'Selected truck';
          content = ['Use the arrows to drive the truck. Pick up boks from miners in the field or waiting at a base. Then drive them to the factory to deliver their cargo.', 'Buy "automate trucks" to record and play back their paths.'];
          if (this.state.automatedTrucks) {
            content = ['Recorded actions will be played back indefinitely until you resume control. Record again to overwrite the previous recording.'];
            var recordingName = selEntity.recording.recording ? 'recording' : 'record';
            var playingName = selEntity.recording.playing ? 'playing' : 'play';
            actions = [{ name: recordingName, func: function func() {
                return dispatch({ type: 'RECORD' });
              } }, { name: 'stop', func: function func() {
                return dispatch({ type: 'STOP' });
              } }, { name: playingName, func: function func() {
                return dispatch({ type: 'PLAY' });
              } }];
            if (selEntity.recording.recording) {
              actions.push({ name: 'Return', func: function func() {
                  return dispatch({ type: 'RETURN' });
                } });
            }
          }
        }
      }
      cards.push(React.createElement(Card, {
        key: 'selectionCard',
        title: title,
        content: content,
        actions: actions
      }));

      // buy cards
      cards.push(makeBuyCard('miner', MINER_COST, dispatch));
      cards.push(makeBuyCard('truck', TRUCK_COST, dispatch));
      cards.push(makeBuyCard('base', BASE_COST, dispatch));

      if (!this.state.automatedTrucks) {
        cards.push(makeBuyCard('automate trucks', AUTOMATION_COST, dispatch));
      }

      return React.createElement(
        'div',
        { className: 'sidebar' },
        cards
      );
    }
  }]);

  return Sidebar;
}(React.Component);

var makeBuyCard = function makeBuyCard(entityType, entityCost, dispatch) {
  var content = ['Cost: ' + entityCost + ' bok'];
  if (entityType == 'miner') {
    content.push('Once you click "Buy", right click in the range of the factory or a base to place');
  }
  return React.createElement(Card, {
    key: "buy" + entityType + "Card",
    title: 'Buy ' + entityType,
    content: content,
    actions: [{
      name: 'Buy',
      func: function func() {
        console.log(entityType);
        dispatch({ type: 'BUY', entityType: entityType });
      }
    }] });
};

var formatMilestone = function formatMilestone(milestone) {
  var count = milestone.count,
      time = milestone.time;


  var totalSecs = floor(time / 1000);

  var countStr = String(count).padEnd(9, '\xA0');

  var secsStr = String(totalSecs % 60).padStart(2, '0');
  var minsStr = String(floor(totalSecs / 60) % 60).padStart(2, '0');
  var hoursStr = String(floor(totalSecs / 3600)).padStart(2, '0');

  return countStr + ' | ' + hoursStr + ':' + minsStr + ':' + secsStr;
};

module.exports = Sidebar;