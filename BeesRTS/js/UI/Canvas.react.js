
const Canvas = React.createClass({

  render: function() {
    // tabIndex={0} is needed to get key presses for some reason..
    return (
      <canvas
        id={this.props.canvas.id}
        width={this.props.canvas.width}
        height={this.props.canvas.height}
        tabIndex={0}
        onContextMenu={(ev) => ev.preventDefault()}
        onMouseDown={this.props.mouse.onMouseDown}
        onMouseUp={this.props.mouse.onMouseUp}
        onMouseMove={this.props.mouse.onMouseMove}
        onKeyDown={this.props.keys.onKeyDown}
        onKeyUp={this.props.keys.onKeyUp}
      />
    );
  }
});
