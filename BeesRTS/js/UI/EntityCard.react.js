
const EntityCard = React.createClass({

  render: function() {
    const {entity} = this.props;
    if (entity.type == 'bee') {
      return (
        <div className="card">
          <p>{entity.subtype}_{entity.id}</p>
          <p>{entity.carrying}</p>
        </div>
      );
    } else if (entity.type == 'honeycomb') {
      return (
        <div className="card">
          <p>honeycomb_{entity.id}</p>
          <p>{entity.contains}</p>
        </div>
      );
    }
    return null;
  }
});
