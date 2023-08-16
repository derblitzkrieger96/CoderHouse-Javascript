let user_input = [];

const quiz = {
  A1: {
    questions: {
      1: {
        statement: "How do you say 'The dog' in German?",
        options: ["Der Hund", "Die Katze", "Den Hund", "Die Hund"],
        right_answer: "Der Hund",
      },
      2: {
        statement: "What is 'hello' in German?",
        options: ["Auf Wiedersehen", "Guten Tag", "Danke", "Bitte"],
        right_answer: "Guten Tag",
      },
      3: {
        statement: "How do you say 'I am hungry' in German?",
        options: [
          "Ich bin müde",
          "Ich habe Durst",
          "Ich habe Angst",
          "Ich habe Hunger",
        ],
        right_answer: "Ich habe Hunger",
      },
      4: {
        statement: "What does 'Schule' mean in English?",
        options: ["School", "House", "Car", "Tree"],
        right_answer: "School",
      },
    },
  },
  A2: {
    questions: {
      1: {
        statement: "Translate 'The cat' to German.",
        options: ["Der Hund", "Die Katze", "Die Maus", "Der Vogel"],
        right_answer: "Die Katze",
      },
      2: {
        statement: "What does 'Apfel' mean in English?",
        options: ["Banana", "Apple", "Orange", "Pear"],
        right_answer: "Apple",
      },
      3: {
        statement: "Formal way to say 'you' in German?",
        options: ["Du", "Er", "Sie", "Es"],
        right_answer: "Sie",
      },
      4: {
        statement: "Translate 'Goodbye' to German.",
        options: ["Guten Tag", "Auf Wiedersehen", "Danke", "Bitte"],
        right_answer: "Auf Wiedersehen",
      },
    },
  },
  B1: {
    questions: {
      1: {
        statement: "Translate 'environment' to German.",
        options: ["Umwelt", "Wetter", "Landschaft", "Natur"],
        right_answer: "Umwelt",
      },
      2: {
        statement: "What is the past tense of 'essen'?",
        options: ["Isst", "Esst", "Aß", "Essen"],
        right_answer: "Aß",
      },
      3: {
        statement: "What is 'computer' in German?",
        options: ["Rechner", "Fernseher", "Telefon", "Tisch"],
        right_answer: "Rechner",
      },
      4: {
        statement: "Which German city is known for its carnival?",
        options: ["Berlin", "Munich", "Cologne", "Hamburg"],
        right_answer: "Cologne",
      },
    },
  },
  B2: {
    questions: {
      1: {
        statement: "What does 'Gesundheit' mean when someone sneezes?",
        options: ["Good luck", "Bless you", "Health", "Excuse me"],
        right_answer: "Health",
      },
      2: {
        statement: "What is the subjunctive II form of 'gehen'?",
        options: ["Ich gehe", "Ich ginge", "Ich ging", "Ich werde gehen"],
        right_answer: "Ich ginge",
      },
      3: {
        statement: "What is the German word for 'ambitious'?",
        options: ["Ehrgeizig", "Abenteuerlich", "Vorsichtig", "Entspannt"],
        right_answer: "Ehrgeizig",
      },
      4: {
        statement: "Who wrote 'Faust'?",
        options: [
          "Johann Wolfgang von Goethe",
          "Friedrich Schiller",
          "Heinrich Heine",
          "Thomas Mann",
        ],
        right_answer: "Johann Wolfgang von Goethe",
      },
    },
  },
};

let name = prompt("Enter your name:");
let germanLevel = prompt(
  "Enter your current level of german: \n A1 \n A2 \n B1 \n B2"
);
alert(
  `You will be evaluated with 4 questions about the german Language for the ${germanLevel}! Level`
);

let question_number = 1;
let questions = quiz[germanLevel].questions;
let right_answers = Object.values(quiz[germanLevel].questions).map(
  (question) => question.right_answer
);

function check_answers(right_answers, user_answers) {
  let right_answer_count = 0;
  let i = 0;
  console.log(right_answers.length);
  while (i < right_answers.length) {
    if (right_answers.includes(user_answers[i])) {
      right_answer_count++;
      console.log(right_answer_count);
    }
    i++;
  }
  console.log(right_answer_count, right_answers);
  return (
    (right_answer_count / right_answers.length) * 100 +
    `% (${right_answer_count}/${right_answers.length})`
  );
}

let question_quantity = Object.keys(questions).length;
console.log(question_quantity);
while (question_number <= question_quantity) {
  let current_question = questions[question_number];
  console.log(current_question);
  let current_question_statement = current_question.statement;
  let current_question_options = current_question.options;
  let current_question_options_str = current_question_options.join("\n");
  let input = prompt(
    `Question #${question_number}\n${current_question_statement}\n${current_question_options_str}`
  );

  user_input.push(input);
  console.log(user_input);
  question_number++;
}

alert(`${name} your score is: ${check_answers(right_answers, user_input)}`);
