// @flow

const {
  TRUCK_SPEED,
  TRUCK_WIDTH,
  TRUCK_HEIGHT,
  TRUCK_CAPACITY,
  TRUCK_ACCEL,
  TRUCK_TURN_SPEED,
  MINER_SPEED,
  MINER_RADIUS,
  BOK_SIZE,
  FACTORY_SIZE,
  BASE_RADIUS,
} = require('../settings');
const {distance, vecToAngle} = require('../utils');
const {thetaToNearestBase, getBokCollected} = require('../selectors');
const {
  truckTurn, truckAccel, truckDeaccel,
} = require('./entityReducer');

const tickReducer = (state: State, action: Action): State => {
  const imgCount = state.view.imgCount;
  let image = state.view.image;
  let shouldRender = state.view.shouldRender;
  if (imgCount == 1) {
    image = null;
    shouldRender = true;
  }

  const totalBokCollected = getBokCollected(state);
  let {bokMilestones, nextBokMilestone} = state;
  if (totalBokCollected >= nextBokMilestone) {
    const timeElapsed = Date.now() - state.startTime;
    bokMilestones.push({count: nextBokMilestone, time: timeElapsed});
    nextBokMilestone *= 10;
  }

  const {entities, bokEntities} = computePhysics(state);
  return {
    ...state,
    entities,
    bokEntities,
    bokMilestones,
    nextBokMilestone,
    view: {
      ...state.view,
      image,
      shouldRender,
      imgCount: state.view.imgCount - 1,
    }
  };
}

const computePhysics = (
  state,
): {entities: Array<Entity>, bokEntities: Array<Entity>} => {
  const entities = state.entities;
  const bokEntities = state.bokEntities;
  const nonBokEntities = entities;

  // Update ongoing recordings/playbacks
  for (const entity of nonBokEntities) {
    if (entity.recording.recording) {
      entity.recording.tick++;
      if (entity.recording.returning) {
        truckReturn(entity);
      }
    }
    if (entity.recording.playing) {
      entity.recording.tick++;
      if (entity.recording.tick == entity.recording.endTick) {
        entity.recording.tick = 0;
      }
      if (entity.recording.returning == true) {
        truckReturn(entity);
      }
      const actions = entity.recording.actions[entity.recording.tick];
      if (actions) {
        for (const action of actions) {
          switch (action.type) {
            case 'ACCELERATE':
              truckAccel(entity);
              break;
            case 'DEACCELERATE':
              truckDeaccel(entity);
              break;
            case 'TURN':
              truckTurn(entity, action.dir);
              break;
            case 'RETURN':
              entity.recording.returning = true;
              truckReturn(entity);
              break;
          }
        }
      }
    }
  }

  // Update speeds and positions
  for (const entity of nonBokEntities) {
    entity.speed += entity.accel;
    entity.prevTheta = entity.theta;
    entity.theta += entity.thetaSpeed;
    if (entity.type == 'truck') {
      entity.speed = entity.speed > TRUCK_SPEED ? TRUCK_SPEED : entity.speed;
    } else if (entity.type == 'miner') {
      entity.speed = entity.speed > MINER_SPEED ? MINER_SPEED : entity.speed;
    }
    entity.speed = entity.speed < 0 ? 0 : entity.speed; // NOTE: can't reverse
    entity.prevX = entity.x;
    entity.prevY = entity.y;
    entity.x += -1 * Math.sin(entity.theta) * entity.speed;
    entity.y += Math.cos(entity.theta) * entity.speed;
  }

  // Handle bok collisions
  for (let i = 0; i < nonBokEntities.length; i++) {
    const entity = nonBokEntities[i];
    for (let j = 0; j < bokEntities.length; j++) {
      const bok = bokEntities[j];
      if (collided(entity, bok)) {
        // trucks destroy boks they hit
        if (entity.type == 'truck') {
          entity.speed /= 2;
          bok.shouldDestroy = true;
        }
        // miners pick up boks they hit and turn around
        if (entity.type == 'miner') {
          bok.shouldDestroy = true;
          entity.carrying = [bok];
          entity.theta = thetaToNearestBase(state, entity);
        }
      }
    }
  }

  // Handle trucks dropping at factory
  const truckEntities = entities.filter(entity => entity.type == 'truck');
  const factoryEntities = entities.filter(entity => entity.type == 'factory');
  for (const truckEntity of truckEntities) {
    for (const factoryEntity of factoryEntities) {
      if (collided(truckEntity, factoryEntity)) {
        factoryEntity.collected += truckEntity.carrying.length;
        factoryEntity.totalCollected += truckEntity.carrying.length;
        truckEntity.carrying = [];
      }
    }
  }


  // Handle miner collisions
  const minerEntities = entities.filter(entity => entity.type == 'miner');
  for (const minerEntity of minerEntities) {
    for (const entity of nonBokEntities) {
      // Give boks to base/factory/truck
      if (
        entity.type == 'truck' &&
        collided(minerEntity, entity) &&
        entity.carrying.length < TRUCK_CAPACITY &&
        minerEntity.carrying.length > 0
      ) {
        entity.carrying = entity.carrying.concat(minerEntity.carrying);
        minerEntity.carrying = [];
        turnMinerAround(minerEntity);
      }
      if (entity.type == 'factory' && collided(minerEntity, entity)) {
        entity.collected += minerEntity.carrying.length;
        entity.totalCollected += minerEntity.carrying.length;
        minerEntity.carrying = [];
        turnMinerAround(minerEntity);
      }
      if (entity.type == 'base' && collided(minerEntity, entity)) {
        if (minerEntity.carrying.length == 0) {
          turnMinerAround(minerEntity);
          break;
        }
        minerEntity.speed = 0; // chill at the base until a truck comes
        for (const truckEntity of truckEntities) {
          if (
            collided(entity, truckEntity) &&
            truckEntity.carrying.length < TRUCK_CAPACITY
          ) {
            truckEntity.carrying = truckEntity.carrying.concat(minerEntity.carrying);
            minerEntity.carrying = [];
            turnMinerAround(minerEntity);
          }
        }
      }
    }
  }

  return {
    entities,
    bokEntities: bokEntities.filter(entity => !entity.shouldDestroy),
  }
}

const truckReturn = (entity: Entity): void => {
  const targetPos = entity.recording.initialPos;
  const THETA_EPSILON = 0.2;
  if (Math.abs(targetPos.x - entity.x) < 3 && Math.abs(targetPos.y - entity.y) < 3) {
    entity.x = targetPos.x;
    entity.y = targetPos.y;
    entity.speed = 0;
    entity.accel = 0;
    if (Math.abs(targetPos.theta - entity.theta) < THETA_EPSILON) {
      entity.theta = targetPos.theta;
      entity.thetaSpeed = 0;
      entity.recording.returning = false;
      return;
    }
    const dir = (targetPos.theta - entity.theta) > 0 ? 1 : -1;
    entity.thetaSpeed = dir * TRUCK_TURN_SPEED;
    return;
  }
  const vec = {x: targetPos.x - entity.x, y: targetPos.y - entity.y};
  const toTheta = vecToAngle(vec);
  if (Math.abs(toTheta - entity.theta) < THETA_EPSILON) {
    entity.thetaSpeed = 0;
    entity.accel = TRUCK_ACCEL;
    return;
  }
  entity.speed = 0;
  entity.accel = 0;
  const dir = (toTheta - entity.theta) > 0 ? 1 : -1;
  entity.thetaSpeed = dir * TRUCK_TURN_SPEED;
}

const turnMinerAround = (minerEntity: Entity): void => {
  minerEntity.theta += Math.PI;
  minerEntity.speed = MINER_SPEED;
  // can't quite turn around since we're still overlapping the base,
  // push us out a bit
  minerEntity.x += -1 * Math.sin(minerEntity.theta) * minerEntity.speed;
  minerEntity.y += Math.cos(minerEntity.theta) * minerEntity.speed;
};

const collided = (entityA: Entity, entityB: Entity): boolean => {
  if (entityA == entityB) {
    return false;
  }
  // naive -- circles only
  let radiusA = 0;
  switch (entityA.type) {
    case 'truck':
      radiusA = TRUCK_WIDTH / 2;
      break;
    case 'miner':
      radiusA = MINER_RADIUS;
      break;
    case 'bok':
      radiusA = BOK_SIZE / 2;
      break;
    case 'factory':
      radiusA = FACTORY_SIZE / 2;
      break;
    case 'base':
      radiusA = BASE_RADIUS;
      break;
  }
  let radiusB = 0;
  switch (entityB.type) {
    case 'truck':
      radiusB = TRUCK_WIDTH / 2;
      break;
    case 'miner':
      radiusB = MINER_RADIUS;
      break;
    case 'bok':
      radiusB = BOK_SIZE / 2;
      break;
    case 'factory':
      radiusB = FACTORY_SIZE / 2;
      break;
    case 'base':
      radiusB = BASE_RADIUS;
      break;
  }

  return distance(entityA, entityB) <= radiusA + radiusB;
};

module.exports = {
  tickReducer
};
