const {oneOf} = require('./utils');
const {gender, firstName, lastName, sport, art, subjects, getSubject, getField} = require('./subjects');

const askForClass = (year, semester, progression) => {
  return {
    text: 'Which subject will you focus on in your ' + year + 'th grade ' + semester + '?',
    options: [
      subjects.math[progression.math],
      subjects.english[progression.english],
      subjects.sports[progression.sports],
      subjects.art[progression.art],
    ],
    action: (choice) => ({
      type: 'setClass',
      heading: 'Education',
      item: choice,
    }),
  };
}

const askForSummerActivity = (year, progression) => {
  return {
    text: 'Which will you focus on in the summer after ' + year + '?',
    options: [
      subjects.business[progression.business],
      subjects.life[progression.life],
    ],
    action: (choice) => ({
      type: 'setCareer',
      heading: 'Experience',
      item: choice,
    }),
  }
}

const getNextScenario = (state) => {
  switch (state.t) {
    case 0:
      return askForClass(9, 'fall', state.progression);
    case 1:
      return askForClass(9, 'spring', state.progression);
    case 2:
      return askForSummerActivity('9th grade', state.progression);
    case 3:
      return askForClass(10, 'fall', state.progression);
    case 4:
      return askForClass(10, 'spring', state.progression);
    case 5:
      return askForSummerActivity('10th grade', state.progression);
    case 6:
      return askForClass(11, 'fall', state.progression);
    case 7:
      return askForClass(11, 'spring', state.progression);
    case 8:
      return askForSummerActivity('11th grade', state.progression);
    case 9:
      return askForClass(12, 'fall', state.progression);
    case 10:
      return askForClass(12, 'spring', state.progression);
  }
};


const rootReducer = (state, action) => {
	if (state === undefined) {
		return {
      scenario: {
        text: 'Welcome to high school, ' + firstName,
        options: ['Begin'],
        action: (choice) => ({type: 'nextScenario'}),
      },
      t: 0,
      progression: {
        math: 0,
        english: 0,
        sports: 0,
        art: 0,
        business: 0,
        life: 0,
      },
      resume: {
        name: firstName + ' ' + lastName,
        Education: {},
        Skills: {},
        Experience: {},
      }
    };
	}

  const {t, progression, resume} = state;
	switch (action.type) {
		case 'setClass':
      const subject = getSubject(action.item);
      let nextState = {
        ...state,
        t: t + 1,
        progression: {...progression, [subject]: progression[subject] + 1},
        resume: {...resume, [action.heading]: action.item},
      };
      nextState.scenario = getNextScenario(nextState);
      return nextState;
    case 'setCareer':
      nextState = {
        ...state,
        t: t + 1,
        progression: {...progression},
      };
      nextState.scenario = getNextScenario(nextState);
      return nextState;
    case 'nextScenario':
      return {
        ...state,
        scenario: getNextScenario(state),
      };
	}
};

module.exports = {rootReducer};
