const React = require('React');
const {Motion, spring} = require('react-motion');

const backgrounds = {
  2: '#eaded2',
  4: '#e9dabc',
  8: '#eea266',
  16: '#f08151',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
};

const fontColors = {
  2: '#635b52',
  4: '#635b52',
  8: '#f9f6f2',
  16: '#f9f6f2',
  32: '#f9f6f2',
  64: '#f9f6f2',
  128: '#f9f6f2',
  256: '#f9f6f2',
  512: '#f9f6f2',
  1024:'#f9f6f2',
  2048:'#f9f6f2',
};

class Game extends React.Component {

  constructor(props) {
    super(props);
    // re-render when the store changes state
    props.store.subscribe(() => {
      this.setState({...props});
    });
    this.state = {...this.props};
  }

  renderTiles() {
    const {tiles} = this.state.store.getState();
    return tiles.map(tile => {
      return (
        <Motion
          key={'motion_' + tile.id}
          defaultStyle={{x: tile.x * 125, y: tile.y * 125}}
          style={{x: spring(tile.x * 125), y: spring(tile.y * 125)}}
        >
          {motionVal => {
            return (
              <div
                key={tile.id}
                className="tile"
                style={{
                  top: motionVal.y,
                  left: motionVal.x,
                  background: backgrounds[tile.value],
                  color: fontColors[tile.value],
                }}
              >
                <b>{tile.value}</b>
              </div>
            );
          }}
        </Motion>
      );
    });
  }

  render() {
    // onContextMenu={ev => ev.preventDefault} is needed for right clicks
    return (
      <div className="background">
        <div className="header">
          Yet Another 2048 Clone
        </div>
        <div className="grid" onMouseDown={(ev) => ev.preventDefault()}>
          {this.renderTiles()}
        </div>
      </div>
    );
  }
};

module.exports = Game;
