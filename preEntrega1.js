let user_input = [];

// Define the quiz object
const quiz = {
  // Level A1 questions
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
      // Add more questions...
    },
  },
  // Level A2 questions
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
      // Add more questions...
    },
  },
  // Level B1 questions
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
      // Add more questions...
    },
  },
  // Level B2 questions
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
      // Add more questions...
    },
  },
};

// Prompt the user to enter their name
let name_input = prompt("Enter your name:");

// Regular expression pattern to validate the name
const namePattern = /^(?!\s+$)[a-zA-z]+$/;

// Validate the name input using the name pattern
while (!namePattern.test(name_input)) {
  // Alert the user about invalid input
  alert("Enter a valid name!");

  // Prompt again for the name input
  name_input = prompt("Enter your name_input:");
}

// Declare a variable to store the user's selected German level
let germanLevelUser;

// Function to get the user's German level input
function getGermanLevelFromUser() {
  // Prompt the user to choose their current German level
  germanLevelUser = prompt(
    "Enter your current level of german: \n 1) A1 \n 2) A2 \n 3) B1 \n 4) B2"
  );
}

// Call the function to get the user's German level input
getGermanLevelFromUser();

// Get the keys (German levels:[A1,A2,B1,B2]) from the 'quiz' object
const germanLevelKeys = Object.keys(quiz);

// Function to check if the provided German level is valid
function checkGermanLevel(germanLevelUser, germanLevelArray) {
  const valid_keys = [1, 2, 3, 4];

  // When the user enters a number (1,2,3,4), check if the provided German level is a valid integer
  if (
    parseInt(germanLevelUser) != isNaN &&
    valid_keys.includes(parseInt(germanLevelUser))
  ) {
    // Return the corresponding German level based on the index
    return germanLevelArray[germanLevelUser - 1];
  }
  // When the user enters the level (A1,A2,B1,B2), check if the provided German level is directly in the array
  else if (germanLevelArray.includes(germanLevelUser)) {
    return germanLevelUser;
  }
  // If the entered German level is not valid, return undefined
  else return undefined;
}

// Loop until a valid German level is selected
while (true) {
  // Call the function to check the provided German level
  germanLevel = checkGermanLevel(germanLevelUser, germanLevelKeys);

  // If a valid German level is found, exit the loop
  if (germanLevel != undefined) break;
  // If the provided German level is not valid, show an alert
  else alert("That is not a valid option!");

  // Prompt the user again to enter a valid German level
  getGermanLevelFromUser();
}

// Alert the user about the evaluation and the selected German level
alert(
  `You will be evaluated with 4 questions about the german Language for the ${germanLevel} Level!\nYou can type either the number or the option itself; for example, if the options is "1) Green", you can type "1" or "Green"`
);

// Initialize variables for question number, questions, and right answers
let question_number = 1;
let questions = quiz[germanLevel].questions;
let right_answers = Object.values(quiz[germanLevel].questions).map(
  (question) => question.right_answer
);

// Function to check user answers against right answers
function check_answers(right_answers, user_answers) {
  let right_answer_count = 0;
  let i = 0;
  console.log(right_answers.length);

  // Loop through each question's right answer and user's answer
  while (i < right_answers.length) {
    // If the user's answer is among the right answers, increase the count
    if (right_answers.includes(user_answers[i])) {
      right_answer_count++;
      console.log(right_answer_count);
    }
    i++;
  }
  console.log(right_answer_count, right_answers);

  // Calculate the score and percentage of correct answers
  return {
    score: (right_answer_count / right_answers.length) * 100,
    percentage: `% (${right_answer_count}/${right_answers.length})`,
  };
}

// Function to generate a final message based on the user's score, level, name, and percentage
function get_final_message(score, level, name, percentage) {
  let message = "";
  let emoji = "";

  // Determine the message and emoji based on the user's score
  if (score == 100) {
    message = `Congratulations! Perfect score! You have mastered the ${level} level of German!`;
    emoji = "🎉🏆👏";
  } else if (score < 100 && score >= 80) {
    message = `Good job! You're making steady progress!`;
    emoji = "👍😊";
  } else if (score < 80 && score >= 60) {
    message = `Don't give up! With more practice, you'll do even better!`;
    emoji = "💪🌟";
  } else if (score < 60 && score >= 40) {
    message = `Remember, every mistake is an opportunity to learn. Keep going!`;
    emoji = "🤔🚀";
  } else {
    message = `You're just beginning. Keep learning and your score will improve!`;
    emoji = "😢📚";
  }

  // Construct the final message
  const final_message = `${name}, ${message}\nYour score is: ${score}${percentage} ${emoji}`;
  return final_message;
}

// Calculate the quantity of questions of the selected level of german
let question_quantity = Object.keys(questions).length;

// Function to check if a number is between two numbers
function checkIfNumberIsBetween(a, b, n) {
  if (n >= a && n <= b) {
    return true;
  } else return false;
}

// Function to check if a value entered by the user is a number
function checkIfValueIsNumber(n) {
  if (parseInt(n)) {
    return true;
  }
  return false;
}

// Function to display a prompt to get the user's answer to a question
function showPromptToGetAnswerToQuestion(
  question_number,
  current_question_statement,
  current_question_options_str
) {
  // Display a prompt containing the question number, statement, and options
  let input = prompt(
    `Question #${question_number}\n${current_question_statement}\n${current_question_options_str}`
  );
  // Return the user's input as the answer
  return input;
}

// Loop through each question until all questions are answered
while (question_number <= question_quantity) {
  // Get the current question object of the selected level of german
  let current_question = questions[question_number];
  console.log(current_question);

  // Extract statement and options from the current question
  let current_question_statement = current_question.statement;
  let current_question_options = current_question.options;

  // Convert options to a formatted string for display
  let current_question_options_str = current_question_options
    .map((option, index) => `${index + 1}) ${option}`)
    .join("\n");

  // Set the minimum and maximum valid input values (1-4, there are 4 possible answers)
  let min = 1;
  let max = current_question_options.length;

  // Get the user's input using the prompt function
  let input = showPromptToGetAnswerToQuestion(
    question_number,
    current_question_statement,
    current_question_options_str
  );

  // Check if the input is a valid answer
  while (true) {
    // When entered a number, check if the input is a valid number within the specified range
    if (
      checkIfValueIsNumber(input) &&
      checkIfNumberIsBetween(min, max, parseInt(input))
    ) {
      // Push the user's chosen option to the user_input array
      user_input.push(current_question_options[input - 1]);
      // Exit the loop since a valid input was provided
      break;
    }
    // When entered a string check if the input is one of the available options
    else if (current_question_options.includes(input)) {
      // Push the user's chosen option to the user_input array
      user_input.push(input);
      // Exit the loop since a valid input was provided
      break;
    }
    // If neither condition is met, prompt the user for input again
    else {
      // Show an alert indicating that the input is not valid
      alert(
        `That is not a valid answer! Remember that You can type either the number or the option itself!\n\nFor example, if the options is "1) Green", you can type "1" or "Green"`
      );
      // Get input again from the user
      input = showPromptToGetAnswerToQuestion(
        question_number,
        current_question_statement,
        current_question_options_str
      );
    }
  }

  console.log(user_input);

  // Move to the next question
  question_number++;
}

// Calculate the score and percentage of correct answers
let { score, percentage } = check_answers(right_answers, user_input);

// Display the final message with the user's score and feedback
alert(get_final_message(score, germanLevel, name_input, percentage));
