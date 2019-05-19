const React = require('React');

// props:
// rows: Array<React>

class Table extends React.Component {

  render() {
    return (
      <div className="table">
        {...this.props.children}
      </div>
    );
  }
}

module.exports = Table;
