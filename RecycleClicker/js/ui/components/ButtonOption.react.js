const React = require('React');
const Button = require('./Button.react');

// props:
// id: optional string
// label: string
// optionNames: Array<string>
// onClicks: Array<() => void>

class ButtonOption extends React.Component {

  constructor(props) {
    super(props);
    this.state = {disabled: false};
  }

  render() {
    const {props, state} = this;
    const id = props.id || props.label;
    const buttons = [];
    for (let i = 0; i < props.optionNames.length; i++) {
      buttons.push(
        <Button
          label={props.optionNames[i]}
          onClick={() => {
            this.setState({disabled: true});
            props.onClicks[i]();
          }}
          disabled={state.disabled}
        />
      );
    }
    return (
      <div
        className="buttonOption"
        key={'buttonOption_' + id}
        id={'buttonOption_' + id}
      >
        {props.label}
        {buttons}
      </div>
    );
  }
}

module.exports = ButtonOption;
