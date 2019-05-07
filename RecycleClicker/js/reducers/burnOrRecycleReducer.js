// @flow

import type {State} from '../types';

const burnOrRecycleReducer = (state: State, action): State => {
  const {
    trashPerBurn, revenuePerBurn,
    trashPerRecycle, revenuePerRecycle,
  } = state.config;
  switch (action.type) {
    case 'BURN': {
      const {num} = action;
      if (state.trash.cur <= 0) {
        return state;
      }
      const nextTrash = Math.max(state.trash.cur - trashPerBurn * num, 0);
      return {
        ...state,
        trash: {
          ...state.trash,
          cur: nextTrash,
        },
        burn: {
          ...state.burn,
          cur: state.burn.cur + trashPerBurn * num,
        },
        money: {
          ...state.money,
          cur: state.money.cur + revenuePerBurn * num,
        },
      };
    }
    case 'FASTER_BURN': {
      return {
        ...state,
        employees: {
          ...state.employees,
          Burner: {
            ...state.employees.Burner,
            clickRate: action.clickRate,
          },
        },
      };
    }
    case 'RECYCLE': {
      const {num} = action;
      if (state.trash.cur <= 0) {
        return state;
      }
      const nextTrash = Math.max(state.trash.cur - trashPerRecycle * num, 0);
      return {
        ...state,
        trash: {
          ...state.trash,
          cur: nextTrash,
        },
        recycle: {
          ...state.recycle,
          cur: state.recycle.cur + trashPerRecycle * num,
        },
        money: {
          ...state.money,
          cur: state.money.cur + revenuePerRecycle * num,
        },
      };
    }
    case 'CHEAPER_RECYCLING':
      return {
        ...state,
        config: {
          ...state.config,
          revenuePerRecycle: revenuePerRecycle + action.additionalRevenuePerRecycle,
        },
      };
  }
}

module.exports = {burnOrRecycleReducer};
