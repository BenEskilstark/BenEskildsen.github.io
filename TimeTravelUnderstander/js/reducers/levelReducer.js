// @flow

const {levels} = require('../state/allLevels.js');

const levelReducer = (state, action) => {
  switch (action.type) {
    case 'RESET': {
      const {walls, buttons, agents} = state.level;
      walls.forEach(wall => wall.doorID ? wall.isOpen = true : null);
      buttons.forEach(button => button.pressed = false);
      return {
        ...state,
        modal: null,
        level: {
          ...state.level,
          prevTime: -1,
          numReversals: 0,
          time: 0,
          walls: state.level.walls,
          buttons: state.level.buttons,
          agents: [{history: [agents[agents.length - 1].history[0]]}],
          target: {
            ...state.level.target,
            reached: 0,
          },
          moveAttempts: {
            left: false,
            right: false,
            up: false,
            down: false,
            revTime: false,
          },
        }
      };
    }
    case 'NEXT_LEVEL': {
      const levelNum = state.level.level + 1;
      localStorage.setItem('level', '' + levelNum);
      const dispatch = state.dispatch;
      if (levelNum >= levels.length) {
        return {
          mainMenu: true,
          editor: false,
          level: null,
          modal: {
            text: 'You beat all the levels! You truly understand time travel.',
            buttons: [{text: 'Dismiss', onClick: () => dispatch({type: 'DISMISS_MODAL'})}],
          }
        }
      }
      return {
        ...state,
        level: {
          ...levels[levelNum](),
          level: levelNum,
        }
      };
    }
    case 'SET_REACHED':
      return {
        ...state,
        level: {
          ...state.level,
          target: {
            ...state.level.target,
            reached: action.reached,
          },
        },
      };
  }
};

module.exports = {levelReducer};
