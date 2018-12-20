'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var floor = Math.floor,
    round = Math.round;

var Slider = require('./Slider.react');

var _require = require('./selectors'),
    getDate = _require.getDate,
    getLastNTickers = _require.getLastNTickers,
    getAvailablePlanes = _require.getAvailablePlanes,
    getTotalPlanes = _require.getTotalPlanes,
    getTotalCivilians = _require.getTotalCivilians,
    getTotalCasualties = _require.getTotalCasualties;

var _require2 = require('./utils'),
    forEach = _require2.forEach;

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    props.store.subscribe(function () {
      return _this.setState(_extends({}, _this.props.store.getState()));
    });
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Game, [{
    key: 'render',
    value: function render() {
      var dispatch = this.props.store.dispatch;

      var state = this.state;
      var locations = state.locations,
          sorties = state.sorties,
          enemy = state.enemy;


      var locationCards = [];
      forEach(locations, function (loc) {
        return locationCards.push(React.createElement(LocationCard, { key: "location_" + loc.name, loc: loc }));
      });
      var sortieCards = sorties.map(function (sortie, i) {
        return React.createElement(SortieCard, {
          key: "sortie_" + sortie.target + sortie.planes + i,
          sortie: sortie,
          label: state.locations[sortie.target].label
        });
      });
      var enemyMissionCards = enemy.missions.map(function (sortie, i) {
        return React.createElement(SortieCard, {
          key: "enemy_sortie_" + sortie.target + sortie.planes + i,
          sortie: sortie,
          label: state.locations[sortie.target].label
        });
      });

      return React.createElement(
        'span',
        null,
        React.createElement(
          'div',
          { className: 'titleBar' },
          'Battle of Britain'
        ),
        React.createElement(
          'div',
          { className: 'dateBar' },
          React.createElement(
            'b',
            null,
            getDate(state)
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'button',
              { onClick: function onClick() {
                  return dispatch({ type: 'NIGHT' });
                } },
              'Begin the Night!'
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'tickerBar' },
          getLastNTickers(state, 3).map(function (t) {
            return React.createElement(
              'p',
              null,
              t
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'topBar' },
          'Fighters: ',
          getTotalPlanes(state),
          ' ',
          'Civilians: ',
          getTotalCivilians(state),
          ' ',
          'Casualties: ',
          getTotalCasualties(state)
        ),
        React.createElement(
          'div',
          { className: 'column' },
          React.createElement(
            'div',
            { className: 'columnHeader' },
            React.createElement(
              'b',
              null,
              'Locations'
            )
          ),
          locationCards
        ),
        React.createElement(
          'div',
          { className: 'column' },
          React.createElement(
            'div',
            { className: 'columnHeader' },
            React.createElement(
              'b',
              null,
              'Sorties'
            )
          ),
          sortieCards,
          React.createElement(NewSortieCard, {
            planes: getAvailablePlanes(state),
            locations: state.locations,
            onClick: function onClick(planes, target) {
              dispatch({ type: 'SORTIE', planes: planes, target: target });
            } })
        ),
        React.createElement(
          'div',
          { className: 'column' },
          React.createElement(
            'div',
            { className: 'columnHeader' },
            React.createElement(
              'b',
              null,
              'Enemy Missions'
            )
          ),
          enemyMissionCards
        )
      );
    }
  }]);

  return Game;
}(React.Component);

var LocationCard = function (_React$Component2) {
  _inherits(LocationCard, _React$Component2);

  function LocationCard() {
    _classCallCheck(this, LocationCard);

    return _possibleConstructorReturn(this, (LocationCard.__proto__ || Object.getPrototypeOf(LocationCard)).apply(this, arguments));
  }

  _createClass(LocationCard, [{
    key: 'render',
    value: function render() {
      var _props$loc = this.props.loc,
          label = _props$loc.label,
          planes = _props$loc.planes,
          civilians = _props$loc.civilians,
          casualties = _props$loc.casualties;

      return React.createElement(
        'div',
        { className: 'card' },
        React.createElement(
          'div',
          { className: 'cardTitle' },
          React.createElement(
            'b',
            null,
            label
          )
        ),
        React.createElement(
          'p',
          null,
          'Civilians: ',
          civilians
        ),
        React.createElement(
          'p',
          null,
          'Casualties: ',
          casualties
        )
      );
    }
  }]);

  return LocationCard;
}(React.Component);

var SortieCard = function (_React$Component3) {
  _inherits(SortieCard, _React$Component3);

  function SortieCard() {
    _classCallCheck(this, SortieCard);

    return _possibleConstructorReturn(this, (SortieCard.__proto__ || Object.getPrototypeOf(SortieCard)).apply(this, arguments));
  }

  _createClass(SortieCard, [{
    key: 'render',
    value: function render() {
      var label = this.props.label;
      var planes = this.props.sortie.planes;

      var i = this.props.index;
      return React.createElement(
        'div',
        { className: 'card' },
        React.createElement(
          'p',
          null,
          'Target: ',
          React.createElement(
            'b',
            null,
            label
          )
        ),
        React.createElement(
          'p',
          null,
          'Planes: ',
          planes
        )
      );
    }
  }]);

  return SortieCard;
}(React.Component);

var NewSortieCard = function (_React$Component4) {
  _inherits(NewSortieCard, _React$Component4);

  function NewSortieCard(props) {
    _classCallCheck(this, NewSortieCard);

    var _this4 = _possibleConstructorReturn(this, (NewSortieCard.__proto__ || Object.getPrototypeOf(NewSortieCard)).call(this, props));

    _this4.state = {
      planes: 0,
      target: 'london'
    };
    return _this4;
  }

  _createClass(NewSortieCard, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          planes = _props.planes,
          locations = _props.locations;

      var targets = [];
      forEach(locations, function (loc) {
        targets.push(React.createElement(
          'option',
          { key: loc.name, value: loc.name },
          loc.label
        ));
      });

      return React.createElement(
        'div',
        { className: 'card' },
        React.createElement(
          'div',
          { className: 'cardTitle' },
          React.createElement(
            'b',
            null,
            'Plan Sortie'
          )
        ),
        React.createElement(
          'select',
          { onChange: function onChange(ev) {
              return _this5.setState({ target: ev.target.value });
            } },
          targets
        ),
        React.createElement(Slider, {
          min: 0, max: planes,
          name: "Planes",
          value: this.state.planes,
          onChange: function onChange(val) {
            return _this5.setState({ planes: val });
          }
        }),
        React.createElement(
          'button',
          {
            onClick: function onClick() {
              _this5.props.onClick(_this5.state.planes, _this5.state.target);
              _this5.setState({ planes: 0 });
            } },
          'Add Sortie'
        )
      );
    }
  }]);

  return NewSortieCard;
}(React.Component);

module.exports = Game;