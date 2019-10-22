const readline = require('readline');

//questions: array of {id: string, question: string}
//answers: object with keys equal to question id and values {question: string, answer: string}
const questions = [
  {
    id: 'name',
    question: 'What\'s your name?'
  },
  {
    id: 'music',
    question: 'What\'s your favourite band/artist?'
  },
  {
    id: 'hobby',
    question: 'What do you like to do for fun?'
  },
  {
    id: 'food',
    question: 'What\'s your favourite dish?'
  },
  {
    id: 'meal',
    question: 'What\'s your favourite meal of the day?'
  },
  {
    id: 'sport',
    question: 'What\'s your favourite sport?'
  },
  {
    id: 'excelAt',
    question: 'What are you exceptionally good at?'
  }
];

//returns answers object and calls callback if provided
const next = function(questions, callback = null, answers = {}, rl = null) {

  rl = rl || readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  if (!questions.length) {
    rl.close();
    if (callback) callback(answers);
    return answers;
  } else {
    rl.question(questions[0].question + '\n>  ', (answer) => {
      return next(questions.slice(1), callback, Object.assign(answers, {[questions[0].id]: {id: [questions[0].id], question: questions[0].question, answer}}), rl);
    });
  }

};

const print = function(answers) {
  process.stdout.write(`${answers.name.answer} loves listening to ${answers.music.answer} while ${answers.hobby.answer}, devouring ${answers.food.answer} for ${answers.meal.answer}, prefers ${answers.sport.answer} over any other sport, and is amazing at ${answers.excelAt.answer}.`);
};

next(questions, print);
