// @flow

export type Coord = {x: number, y: number};

export type Action = MoveAction | ReverseTimeAction;

export type MoveAction = {
  type: 'MOVE',
  dir: {['x' | 'y']: number},
}

export type ReverseTimeAction = {
  type: 'REVERSE_TIME',
}

export type Agent = {
  history: Array<Coord>
}

export type Wall = {
  orientation: 'horizontal' | 'vertical',
  start: Coord, // walls must go left -> right or top -> bottom (small y -> big y)
  end: Coord, // walls should never be diagonal
  doorID?: number, // starting at 1
  isOpen?: boolean,
  isVisible?: boolean,
}

export type Button = {
  position: Coord,
  doorID: number,
  pressed: boolean,
};

export type LevelState = {
  prevTime: number, // prevTime > time when you just reversed time
  time: number,
  numReversals: number,
  agents: Array<Agent>, // 0th agent is player-controlled
  walls: Array<Wall>,
  buttons: Array<Button>,
  target: {
    pos: Coord,
    reached: number,
  },
  level: number, // which level you're on
  stepLimit: number, // how many steps the first agent has to get through the maze
  moveAttempts: {
    left: boolean,
    right: boolean,
    up: boolean,
    down: boolean,
    revTime: boolean,
  },
  rumble: {
    shouldRumble: boolean,
    offset: Coord,
    count: number,
  },
  reverseTime: {
    shouldAnimate: boolean,
    count: number,
    size: number,
    theta: number,
    max: number,
  },
}

export type State = {
  level: LevelState,
  editor: ?{
    selectedCell: Coord,
    doorSelected: ?boolean,
  },
  mainMenu: boolean,
  modal: ?{
    text: string,
    buttons: Array<{
      onClick: () => void,
      text: string,
    }>,
  },
  custom: boolean,
}
