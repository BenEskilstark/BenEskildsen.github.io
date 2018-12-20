const React = require('React');
const {floor, round} = Math;
const Slider = require('./Slider.react');
const {getDate, getLastNTickers, getAvailablePlanes, getTotalPlanes, getTotalCivilians, getTotalCasualties} = require('./selectors');
const {forEach} = require('./utils');

class Game extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {dispatch} = this.props.store;
    const state = this.state;
    const {locations, sorties, enemy} = state;

    const locationCards = [];
    forEach(
      locations,
      loc => locationCards.push(<LocationCard key={"location_"+loc.name} loc={loc} />)
    );
    const sortieCards = sorties
      .map((sortie, i) => <SortieCard
        key={"sortie_"+sortie.target+sortie.planes+i}
        sortie={sortie}
        label={state.locations[sortie.target].label}
      />);
    const enemyMissionCards = enemy.missions
      .map((sortie, i) => <SortieCard
        key={"enemy_sortie_"+sortie.target+sortie.planes+i}
        sortie={sortie}
        label={state.locations[sortie.target].label}
      />);

    return (
      <span>
        <div className="titleBar">
          Battle of Britain
        </div>
        <div className="dateBar">
          <b>{getDate(state)}</b>
          <p><button onClick={() => dispatch({type: 'NIGHT'})}>
            Begin the Night!
          </button></p>
        </div>
        <div className="tickerBar">
          {getLastNTickers(state, 3).map(t => <p>{t}</p>)}
        </div>
        <div className="topBar">
          Fighters: {getTotalPlanes(state)}{' '}
          Civilians: {getTotalCivilians(state)}{' '}
          Casualties: {getTotalCasualties(state)}
        </div>
        <div className="column">
          <div className="columnHeader">
            <b>Locations</b>
          </div>
          {locationCards}
        </div>
        <div className="column">
          <div className="columnHeader">
            <b>Sorties</b>
          </div>
          {sortieCards}
          <NewSortieCard
            planes={getAvailablePlanes(state)}
            locations={state.locations}
            onClick={(planes, target) => {
              dispatch({type: 'SORTIE', planes, target});
            }} />
        </div>
        <div className="column">
          <div className="columnHeader">
            <b>Enemy Missions</b>
          </div>
          {enemyMissionCards}
        </div>
      </span>
    );
  }
}

class LocationCard extends React.Component {
  render() {
    const {label, planes, civilians, casualties} = this.props.loc;
    return (
      <div className="card">
        <div className="cardTitle">
          <b>{label}</b>
        </div>
        <p>Civilians: {civilians}</p>
        <p>Casualties: {casualties}</p>
      </div>
    );
  }
}

class SortieCard extends React.Component {
  render() {
    const {label} = this.props;
    const {planes} = this.props.sortie;
    const i = this.props.index;
    return (
      <div className="card">
        <p>Target: <b>{label}</b></p>
        <p>Planes: {planes}</p>
      </div>
    );
  }
}

class NewSortieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planes: 0,
      target: 'london',
    };
  }

  render () {
    const {planes, locations} = this.props;
    const targets = [];
    forEach(
      locations, (loc) => {
        targets.push(
          <option key={loc.name} value={loc.name}>
            {loc.label}
          </option>
        );
      }
    );

    return (
      <div className="card">
        <div className="cardTitle"><b>Plan Sortie</b></div>
        <select onChange={(ev) => this.setState({target: ev.target.value})}>
          {targets}
        </select>
        <Slider
          min={0} max={planes}
          name={"Planes"}
          value={this.state.planes}
          onChange={(val) => this.setState({planes: val})}
        />
        <button
          onClick={() => {
            this.props.onClick(this.state.planes, this.state.target);
            this.setState({planes: 0});
          }}>
          Add Sortie
        </button>
      </div>
    );
  }
}

module.exports = Game;
