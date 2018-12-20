const {oneOf} = require('./utils');

const gender = oneOf(['male', 'female']);
const firstName = gender === 'male' ?
  oneOf(['Ben', 'Vance', 'Ryan', 'Matt', 'Chase']) :
  oneOf(['Ann', 'Sarah', 'Beth', 'Rebecca']);
const lastName = oneOf(['Smith', 'Jones', 'Roosevelt', 'Jackson', 'Diaz']);
const sport = oneOf(['football', 'soccer', 'lacrosse', 'hockey']);
const art = oneOf(['drawing', 'music']);

const subjects = {
  // high school + college
  math: ['Algebra I', 'Algebra II', 'Trigonometry', 'Calculus I', 'Calculus II', 'Group Theory'],
  english: ['Reading', 'Writing', 'Language', 'Literature', 'Composition', 'Poetry'],
  sports: [
    'Little League', 'JV', 'Varsity', 'Captain of the', 'Red shirt', 'Starter on the',
    'Minor League', 'Major League', 'Impact Player', 'All American', 'MVP', 'Olympian',
    'Hall of Fame',
  ],
  art: [
    'orchestra', 'private lessons', 'first chair', 'soloist',
    'starving artist', 'solo gigs', 'first chair', 'underground', 'top 40', 'rock star',
    gender == 'male' ? 'Kanye West' : 'Lady Gaga',
  ],
  business: [
    'paper ' + (gender == 'male' ? 'boy' : 'girl'), (gender == 'male' ? 'waiter' : 'waitress'),
    'intern I', 'intern II',
    'analyst', 'consultant', 'manager', 'director', 'VP', 'CEO',
    'Titan of Industry',
  ],
  life: [
    'play time', 'friends', 'partying', 'dating',
    'serious relationship', 'marriage', 'having kids',
    'retiree',
  ],
}

const getField = (field) => {
  if (subjects.career.business.includes(field)) return 'business';
  if (subjects.career.life.includes(field)) return 'life';
}

const getSubject = (subject) => {
  if (subjects.math.includes(subject)) return 'math';
  if (subjects.english.includes(subject)) return 'english';
  if (subjects.sports.includes(subject)) return 'sports';
  if (subjects.art.includes(subject)) return 'art';
}

module.exports = {
  gender,
  firstName,
  lastName,
  sport,
  art,
  subjects,
  getField,
  getSubject,
}
