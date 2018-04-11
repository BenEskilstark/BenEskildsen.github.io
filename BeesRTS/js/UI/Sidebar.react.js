
const Sidebar = React.createClass({

  render: function() {
    const selectionCards = [];

    for (let i = 0, entity; entity = game.world.selected[i]; i++) {
      selectionCards.push(<EntityCard entity={entity} key={i} />);
    }
    for (let i = 0, entity; entity = game.world.cellSelected[i]; i++) {
      selectionCards.push(<EntityCard entity={entity} key={i} />);
    }

    return (
      <div className="sidebar">
        {selectionCards}
      </div>
    );
  }
});
