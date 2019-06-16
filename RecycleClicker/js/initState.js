// @flow

const {round, random} = Math;

import type {State} from './types';

const initState = (): State => {
  return {
    time: 0,
    systems: {
      buttonsShown: {
        contractors2: false,
        contractors5: false,
        contractors10: false,
      },
      warningsShown: {
        burning25: false,
        burning50: false,
        burning75: false,
        burning90: false,

        trash25: false,
        trash50: false,
        trash75: false,
        trash90: false,
      },
    },
    ui: {
      godMode: false,

      hireVisible: false,
      hireVisibleFlicker: 0,
      payContractorVisible: false,
      payContractorVisibleFlicker: 0,
      payEmployeeVisible: false,
      payEmployeeVisibleFlicker: 0,
      researchVisible: false,
      researchVisibleFlicker: 0,
      lobbyVisible: false,
      lobbyVisibleFlicker: 0,

      selectedRole: 'Burner',
      gameOver: null, // or 'lose', 'win'
    },
    burn: {
      cur: 0,
      max: 100000 + round(random() * 400000),
    },
    recycle: {
      cur: 0,
      max: Infinity,
    },
    trash: {
      cur: 1000,
      max: 5000000 + round(random() * 5000000),
    },
    money: {
      cur: 10000,
    },
    research: {
      cur: 0,
      greedyOptions: [
        {name: 'Faster burning', cost: 150},
        {name: 'Even faster burning', cost: 1500},
        {name: 'Upgraded incinerators', cost: 5000},
      ],
      goodOptions: [
        {name: 'Cheaper recycling', cost: 1000},
        {name: 'Efficient recycling', cost: 2000},
        {name: 'Dredge the oceans', cost: 5000},
        {name: 'Convert all burners to recyclers', cost: 10000},
      ],
      justResearched: null,
    },
    lobby: {
      cur: 0,
      greedyOptions: [
        {name: 'Contractor over-time', cost: 1000},
        {name: 'Lower minimum wage', cost: 3000},
        {name: 'Late-stage capitalism', cost: 5000},
        {name: 'Ultra-consumerist society', cost: 10000},
      ],
      goodOptions: [
        {name: 'Recycling subsidies', cost: 500},
        {name: 'Raise contractor wages', cost: 1000},
        {name: 'Universal healthcare', cost: 4000},
        {name: 'Communism', cost: 10000},
        {name: 'Fully-sustainable society', cost: 50000},
      ],
      justResearched: null,
    },
    ticker: {
      messages: [],
    },
    employees: {
      cur: 0,
      roleOptions: [
        'Burner', 'Recycler', 'Foreman', 'Manager', 'Scientist', 'Lawyer',
      ],
      contractor: {
        cur: 0,
        wage: 500,
        dontNeedPay: 0,
        needPay: 0,
        aboutToLeave: 0,
        quit: 0,
      },
      employee: {
        cur: 0,
        wage: 50000,
        dontNeedPay: 0,
        needPay: 0,
        aboutToLeave: 0,
        quit: 0,
      },
      Burner: {
        cur: 0,
        clickRate: 100,
        action: 'BURN',
      },
      Recycler: {
        cur: 0,
        clickRate: 100,
        action: 'RECYCLE',
      },
      Foreman: {
        cur: 0,
        clickRate: 20,
        action: 'PAY_CONTRACTOR',
      },
      Manager: {
        cur: 0,
        clickRate: 100,
        action: 'PAY_EMPLOYEE',
      },
      Recruiter: {
        cur: 0,
        clickRate: 500,
        action: 'HIRE',
      },
      Scientist: {
        cur: 0,
        clickRate: 100,
        action: 'RESEARCH',
      },
      Lawyer: {
        cur: 0,
        clickRate: 100,
        action: 'LOBBY',
      },
    },
    config: {
      msPerTick: 20,

      trashPerBurn: 1,
      revenuePerBurn: 200,
      trashPerRecycle: 1,
      revenuePerRecycle: 100,

      employeesPerHire: 1,

      contractorNeedPayInterval: 500,
      employeeNeedPayInterval: 2000,

      contractors: ['Recycler', 'Burner'],
      employees: ['Foreman', 'Manager', 'Scientist', 'Lawyer'],
      allRoles: [
        'Burner', 'Recycler', 'Foreman', 'Manager', 'Scientist', 'Lawyer',
      ],

      trashInterval: 500,
      trashMultiplier: 1,
    },
  };
}

module.exports = {initState};
