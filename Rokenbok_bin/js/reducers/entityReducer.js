// @flow

const {getSelectedEntities, getWorldCoord} = require('../selectors');
const {
  TRUCK_WIDTH, TRUCK_HEIGHT,
  TRUCK_TURN_SPEED, TRUCK_SPEED, TRUCK_ACCEL,
  MINER_SPEED, MINER_RADIUS, MINER_TURN_SPEED,
} = require('../settings');
const {distance} = require('../utils');
const {max} = Math;

const entityReducer = (state: State, action: Action): State => {
  const selEntities = getSelectedEntities(state);
  switch (action.type) {
    case 'MAYBE_SELECT':
      deselectAll(state.entities);
      const selEntity = maybeSelect(
        state.entities,
        getWorldCoord(state, action.x, action.y),
      );
      if (selEntity != null && selEntity.type == 'miner') {
        selEntity.speed = 0;
      }
      return state;
    case 'ACCELERATE': {
      if (selEntities.length == 0) {
        return state;
      }
      const entity = selEntities[0];
      let maybeRecordingActions = entity.recording.actions[entity.recording.tick];
      if (entity.type == 'truck') {
        truckAccel(entity);
        if (entity.recording.recording && !entity.recording.returning) {
          if (maybeRecordingActions == null) {
            entity.recording.actions[entity.recording.tick] = [];
            maybeRecordingActions = entity.recording.actions[entity.recording.tick];
          }
          maybeRecordingActions.push(action);
        }
      }
      return state;
    }
    case 'DEACCELERATE': {
      if (selEntities.length == 0) {
        return state;
      }
      const entity = selEntities[0];
      let maybeRecordingActions = entity.recording.actions[entity.recording.tick];
      if (entity.type == 'truck') {
        truckDeaccel(entity);
        if (entity.recording.recording && !entity.recording.returning) {
          if (maybeRecordingActions == null) {
            entity.recording.actions[entity.recording.tick] = [];
            maybeRecordingActions = entity.recording.actions[entity.recording.tick];
          }
          maybeRecordingActions.push(action);
        }
      }
      return state;
    }
    case 'TURN': {
      if (selEntities.length == 0) {
        return state;
      }
      const entity = selEntities[0];
      let maybeRecordingActions = entity.recording.actions[entity.recording.tick];
      if (entity.type == 'truck') {
        truckTurn(entity, action.dir);
        if (entity.recording.recording && !entity.recording.returning) {
          if (maybeRecordingActions == null) {
            entity.recording.actions[entity.recording.tick] = [];
            maybeRecordingActions = entity.recording.actions[entity.recording.tick];
          }
          maybeRecordingActions.push(action);
        }
      } else if (entity.type == 'miner') {
        entity.thetaSpeed = action.dir * MINER_TURN_SPEED;
      }
      return state;
    }
  }
};

const truckAccel = (entity) => {
  entity.accel = entity.speed < TRUCK_SPEED ? TRUCK_ACCEL : 0;
};

const truckDeaccel = (entity) => {
  entity.accel = entity.speed > 0 ? -1 * TRUCK_ACCEL : 0;
};

const truckTurn = (entity, dir) => {
  entity.thetaSpeed = dir * TRUCK_TURN_SPEED;
}

const deselectAll = (entities: Array<Entity>): void => {
  entities.forEach(entity => {
    if (entity.type == 'miner' && entity.selected) {
      entity.speed = MINER_SPEED;
    }
    entity.selected = false;
  });
}

const maybeSelect = (entities: Array<Entity>, worldCoord: {x: number, y: number}) => {
  let selEntity = null;
  entities.forEach(entity => {
    if (entity.type == 'truck') {
      const {x, y} = entity;
      if (distance({x, y}, worldCoord) < max(TRUCK_WIDTH, TRUCK_HEIGHT)) {
        entity.selected = true;
        selEntity = entity;
      }
    }

    if (entity.type == 'miner') {
      const {x, y} = entity;
      if (distance({x, y}, worldCoord) < MINER_RADIUS) {
        entity.selected = true;
        selEntity = entity;
      }
    }
  });
  return selEntity;
}

module.exports = {
  entityReducer,
  truckAccel,
  truckTurn,
  truckDeaccel,
};
