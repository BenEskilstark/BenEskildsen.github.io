// @flow

export type State = {
  time: number,
  ui: {
    selectedRole: Role, // selected role for next hire
  },
  trash: {
    cur: number,
    max: number,
  },
  money: {
    cur: number,
  },
  burn: {
    cur: number,
    max: number,
  },
  recycle: {
    cur: number,
    max: number,
  },
  research: {
    cur: number,
    greedyOptions: Array<{name: string, cost: number}>,
    goodOptions: Array<{name: string, cost: number}>,
    justResearched: ?{name: string, cost: number},
  },
  lobby: {
    cur: number,
    greedyOptions: Array<{name: string, cost: number}>,
    goodOptions: Array<{name: string, cost: number}>,
    justResearched: ?{name: string, cost: number},
  },
  ticker: {
    messages: Array<string>,
  },
  employees: {
    cur: number,
    roleOptions: Array<Role>,
    contractor: {
      cur: number,
      wage: number,
      dontNeedPay: number,
      needPay: number,
      aboutToLeave: number,
      quit: number,
    },
    employee: {
      cur: number,
      wage: number,
      dontNeedPay: number,
      needPay: number,
      aboutToLeave: number,
      quit: number,
    },
    [role: Role]: {
      cur: number,
      clickRate: number,
      action: string,
    }
  },
  config: {
    msPerTick: number,

    trashPerBurn: number,
    revenuePerBurn: number,
    trashPerRecycle: number,
    revenuePerRecycle: number,
    contractors: Array<Role>,
    employees: Array<Role>,

    trashMultiplier: number,
  },
};

export type Role =
  'Burner' |
  'Recycler' |
  'Foreman' |
  'Manager' |
  'Recruiter' |
  'Scientist' |
  'Lawyer';

export type Action =
  {type: 'START'} |
  {type: 'CLEAR_LOCAL_STORAGE'} |
  {type: 'TICK'} |
  {type: 'ADD_TRASH', amount: number} |
  {type: 'BURN', num: number} |
  {type: 'RECYCLE', num: number} |
  {type: 'PAY_CONTRACTOR', num: number} |
  {type: 'PAY_EMPLOYEE', num: number} |
  {type: 'HIRE',  num: number};

