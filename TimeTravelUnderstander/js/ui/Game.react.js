const React = require('React');
const MainMenu = require('./MainMenu.react');
const Level = require('./Level.react');
const Editor = require('./Editor.react');

class Game extends React.Component {

  constructor(props) {
    super(props);
    props.store.subscribe(() => {
      this.setState({...this.props.store.getState()});
    });
    this.state = {...this.props.store.getState()};
  }

  render() {
    let content = null;
    if (this.state.mainMenu) {
      content = <MainMenu store={this.props.store} />;
    } else if (this.state.editor) {
      content = <Editor store={this.props.store} />;
    } else if (this.state.level != null) {
      content = <Level dispatch={this.props.store.dispatch} {...this.state.level} />;
    }

    const modal = this.getModal();
    return (
      <div className="background">
        <div className="header">
          Time Travel Understander
        </div>
        {content}
        {modal}
      </div>
    );
  }

  getModal() {
    if (!this.state.modal) {
      return null;
    }
    const {text, buttons} = this.state.modal;
    const buttonHTML = buttons.map(b => {
      return (
        <button key={"button_" + b.text} onClick={b.onClick}>
          {b.text}
        </button>
      );
    });
    const rect = document.getElementById('container').getBoundingClientRect();
    return (
      <div className="modal"
        style={{
          width: 300,
          top: (rect.height - 200) / 2,
          left: (rect.width - 300) / 2,
        }}>
        {text}
        <div className="modalButtons">
          {buttonHTML}
        </div>
      </div>
    );
  }
};

module.exports = Game;
