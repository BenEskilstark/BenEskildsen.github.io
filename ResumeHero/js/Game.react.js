const React = require('React');
const {forEach} = require('./utils');

class Game extends React.Component {
  constructor(props) {
    super(props);
    // re-render when the store changes
    props.store.subscribe(() => {
      this.setState({...this.props.store.getState()});
    });
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {resume, scenario} = this.state;
    const {dispatch} = this.props.store;

    return (
      <div className="background">
        <OptionDialog {...scenario} dispatch={dispatch} />
        <Resume {...resume} />
      </div>
    );
  }
}

class OptionDialog extends React.Component {
  render() {
    const options = this.props.options.map(option => (
      <div
        className="option"
        key={'option_' + option}
        onClick={(ev) => {
          this.props.dispatch(this.props.action(option));
        }}>
        {option}
      </div>
    ));
    const dialog = <div className="dialog">{this.props.text}</div>;
    return (
      <div className="optionDialog">
        {dialog}
        {options}
      </div>
    );
  }
}

class Resume extends React.Component {
  render() {
    const {name, ...headings} = this.props;
    return (
      <div className="resume">
        <h2>{name}</h2>
        {this.renderItem(1, headings)}
      </div>
    );
  }

  renderItem(level, items) {
    if (items == null) return;
    if (typeof items != 'object') {
      return <div className={'heading' + level}>{items}</div>;
    }
    const itemDivs = [];
    forEach(items, (heading, item) => {
      itemDivs.push(<span key={heading}>
        <div className={'heading' + level}>{heading}</div>
        <div className={'heading' + level}>{this.renderItem(level + 1, item)}</div>
      </span>);
    });
    return itemDivs;
  }
}

module.exports = Game;
