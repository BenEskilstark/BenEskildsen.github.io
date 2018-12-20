const React = require('React');
const Card = require('./Card.react');
const {
  TRUCK_COST, MINER_COST, BASE_COST, AUTOMATION_COST,
} = require('../settings');
const {floor} = Math;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => this.setState({...this.props.store.getState()}));
    this.state = {...this.props.store.getState()};
  }

  render() {
    const {dispatch} = this.props.store;
    const cards = [];
    const factory = this.state.entities.filter(e => e.type == 'factory')[0];
    const milestones = this.state.bokMilestones.map(formatMilestone);
    cards.push(<Card
      key="titleCard"
      title={'Rokenbok Factory'}
      content={[
        'Total Bok Collected: ' + factory.totalCollected,
        'Current Bok: ' + factory.collected,
        'Milestone \u00a0 Time',
        ...milestones,
      ]} />
    );

    // selection card
    let title = 'Right click to select';
    let content = ['Once you have selected something, right click anywhere else to deselect'];
    let actions = [];
    const selEntity = this.state.entities.filter(e => e.selected)[0];
    if (selEntity) {
      if (selEntity.type == 'miner') {
        title = 'Selected miner';
        content = ['Use the arrows to point this miner towards boks. Deselect and it will mine back and forth automatically.'];
      }
      if (selEntity.type == 'truck') {
        title = 'Selected truck';
        content = [
          'Use the arrows to drive the truck. Pick up boks from miners in the field or waiting at a base. Then drive them to the factory to deliver their cargo.',
          'Buy "automate trucks" to record and play back their paths.',
        ];
        if (this.state.automatedTrucks) {
          content = ['Recorded actions will be played back indefinitely until you resume control. Record again to overwrite the previous recording.'];
          const recordingName = selEntity.recording.recording ? 'recording' : 'record';
          const playingName = selEntity.recording.playing ? 'playing' : 'play';
          actions = [
            {name: recordingName, func: () => dispatch({type: 'RECORD'})},
            {name: 'stop', func: () => dispatch({type: 'STOP'})},
            {name: playingName, func: () => dispatch({type: 'PLAY'})},
          ];
          if (selEntity.recording.recording) {
            actions.push({name: 'Return', func: () => dispatch({type: 'RETURN'})});
          }
        }
      }
    }
    cards.push(<Card
      key="selectionCard"
      title={title}
      content={content}
      actions={actions}
    />);

    // buy cards
    cards.push(makeBuyCard('miner', MINER_COST, dispatch));
    cards.push(makeBuyCard('truck', TRUCK_COST, dispatch));
    cards.push(makeBuyCard('base', BASE_COST, dispatch));

    if (!this.state.automatedTrucks) {
      cards.push(makeBuyCard('automate trucks', AUTOMATION_COST, dispatch));
    }

    return (
      <div className="sidebar">
        {cards}
      </div>
    );
  }
}

const makeBuyCard = (entityType, entityCost, dispatch) => {
  const content = ['Cost: ' + entityCost + ' bok'];
  if (entityType == 'miner') {
    content.push(
        'Once you click "Buy", right click in the range of the factory or a base to place'
    );
  }
  return (
    <Card
      key={"buy" + entityType + "Card"}
      title={'Buy ' + entityType}
      content={content}
      actions={[{
        name: 'Buy',
        func: () => {
          console.log(entityType);
          dispatch({type: 'BUY', entityType});
        }
      }]} />
  );
};

const formatMilestone = (milestone) => {
  const {count, time} = milestone

  let totalSecs = floor(time / 1000);

  const countStr = String(count).padEnd(9, '\u00a0');

  const secsStr = String(totalSecs % 60).padStart(2, '0');
  const minsStr = String(floor(totalSecs / 60) % 60).padStart(2, '0');
  const hoursStr = String(floor(totalSecs / 3600)).padStart(2, '0');

  return `${countStr} | ${hoursStr}:${minsStr}:${secsStr}`
}

module.exports = Sidebar;
