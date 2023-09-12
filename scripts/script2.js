/**
 * Parses query parameters from the URL and returns them as an object.
 * @returns {object} An object containing the parsed query parameters.
 */
function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of queryParams.entries()) {
    params[key] = value;
  }
  return params;
}

// Get the query parameters from the URL and display the form data
const queryParams = getQueryParams();
const { questions, ...newObj } = JSON.parse(Object.keys(queryParams)[0]);
let formInfo = newObj;
let currentLevelInfo = { questions };
console.log("data", typeof queryParams, { questions });

// Javascript Variables
let currentGermanLevel = ""; // Stores the current German language level
let selectedOptions = {}; // Stores the selected options for questions

// question variables
let currentQuestionIndex = 1; // Stores the index of the current question
let currentQuestion = {}; // Stores the current question object
let currentStatement = ""; // Stores the statement of the current question
let currentOptions = {}; // Stores the options for the current question
let totalQuestionNumber = 0; // Stores the total number of questions

// HTML elements
const currentGermanLevelHTML = document.querySelector(".card-header-GL");
let currentStatementHTML = document.querySelector(".card-question-statement");
let currentOptionsHTML = document.querySelector(".card-question-options-box");
let currentQuestionIndexHTML = document.querySelector(
  ".card-info-question-curr-q"
);
let totalQuestionNumberHTML = document.querySelector(
  ".card-info-question-tot-q"
);
let buttonNextHTML = document.querySelector(".next");
let buttonPreviousHTML = document.querySelector(".previous");
let updateQuestion = document.querySelector(".card-options");

buttonPreviousHTML.classList.add("hidden");

//----------------------------------------------------------------------------------
// functions

// Function to set general HTML values
/**
 * Sets the values of general HTML elements.
 * @param {*} infoObj - An object containing the values to be set in HTML elements.
 */
const setGeneralHTMLValues = function (infoObj) {
  currentGermanLevelHTML.textContent = infoObj.currentGermanLevel + " ";
};

/**
 * Handles click events on question options.
 * This function is responsible for processing click events when a user selects an option for a question.
 * @param {*} e - The click event object.
 */
function optionClickListener(e) {
  // Find the closest parent element with the class "card-question-single-option"
  const optionDiv = e.target.closest(".card-question-single-option");

  // Check if a valid optionDiv is found
  if (optionDiv) {
    // Clear the background selection color for all options within the same question
    let allOptions = optionDiv.parentElement.querySelectorAll(
      ".card-question-single-option-option"
    );
    [...allOptions].forEach((child) => {
      child.parentElement.classList.remove("selected");
    });

    // Get the selected option's text
    let userSelectedOption = optionDiv.querySelector(
      ".card-question-single-option-option"
    );
    let userSelectedOptionText = userSelectedOption.textContent;

    // Store the selected option in the selectedOptions object
    selectedOptions[currentQuestionIndex] = userSelectedOptionText;

    // Add the "selected" class to the parent element to highlight the selected option
    userSelectedOption.parentElement.classList.add("selected");

    // Log the updated selectedOptions object to the console
    console.log(selectedOptions);
  }
}

currentOptionsHTML.addEventListener("click", optionClickListener);

/**
 * Sets the HTML values for the current question.
 *
 * This function updates the HTML elements on the page to display information about the current question,
 * including the question index, total number of questions, and question statement. It also dynamically generates
 * HTML for question options and highlights the selected option if applicable.
 *
 * @param {Object} infoObj - An object containing the values for the current question.
 * @property {number} infoObj.currentQuestionIndex - The index of the current question.
 * @property {number} infoObj.totalQuestionNumber - The total number of questions in the quiz.
 * @property {string} infoObj.currentStatement - The statement or text of the current question.
 * @property {Object} infoObj.currentOptions - An object containing the options for the current question.
 */
const setQuestionHTMLValues = function (infoObj) {
  // Update the HTML elements with question information
  currentQuestionIndexHTML.textContent = infoObj.currentQuestionIndex;
  totalQuestionNumberHTML.textContent = infoObj.totalQuestionNumber;
  currentStatementHTML.textContent = infoObj.currentStatement;

  // Initialize a counter for option letters
  let i = 1;

  // Initialize an HTML string to store question options
  let optionsStringHTML = "";

  // Iterate through each option in the currentOptions object
  for (const key in infoObj.currentOptions) {
    // Generate a letter label for the option (e.g., A, B, C)
    let currentLetter = String.fromCharCode(64 + i);

    // Get the text of the current option
    let currentOption = infoObj.currentOptions[key];

    // Check if the current option is selected
    let currentOptionIsSelected =
      Object.values(selectedOptions).includes(currentOption);

    // Construct the HTML for the option, including the option letter and text,
    // and apply the "selected" class if the option is selected
    optionsStringHTML += `
    <div class="card-question-single-option ${
      currentOptionIsSelected ? "selected" : ""
    }">
              <div class="card-question-single-option-letter">${currentLetter}</div>
              <div class="card-question-single-option-option">${currentOption}</div>
    </div>
    `;

    // Increment the option letter counter
    i++;
  }

  // Update the currentOptionsHTML element with the generated HTML
  currentOptionsHTML.innerHTML = optionsStringHTML;
};

// Function to set question variables
/**
 * Sets the variables for the current question.
 * @param {*} currentLevelInfo - An object containing the questions for the current level.
 * @param {*} currentQuestionIndex - The index of the current question.
 */
const setQuestionVariables = function (currentLevelInfo, currentQuestionIndex) {
  currentQuestion = currentLevelInfo.questions[currentQuestionIndex];
  currentStatement = `${currentQuestionIndex}. ${currentQuestion.statement}`;
  currentOptions = currentQuestion.options;
  totalQuestionNumber = Object.keys(currentLevelInfo.questions).length;
};

// Function to initialize general variables
/**
 * Initializes general variables based on form input.
 * @param {*} formInfo - An object containing form input values.
 */
const initializeGeneralVariables = function (formInfo) {
  currentGermanLevel = formInfo.levelInput;
};

/**
 * Event listener for updating questions and controlling quiz navigation.
 *
 * This event listener handles button clicks (Next and Previous) to navigate through quiz questions.
 * It updates the current question index, button labels, and visibility based on the current question's position.
 * Additionally, it sets the HTML values for the updated question.
 *
 * @param {Event} e - The click event object.
 */
updateQuestion.addEventListener("click", function (e) {
  if (e.target.innerHTML === "Finish") {
    const modal = document.querySelector(".modal-parent");
    modal.style.visibility = "visible";

    modal.addEventListener("click", function (e) {
      if (
        e.target.innerHTML === "Close" ||
        e.target.classList.contains("modal-parent")
      ) {
        modal.style.visibility = "hidden";
      }
    });
  }
  // Check if the "Next" button was clicked and there are more questions
  if (
    e.target.innerHTML === "Next" &&
    currentQuestionIndex < totalQuestionNumber
  ) {
    currentQuestionIndex++;
  }

  // Check if the "Previous" button was clicked and not at the first question
  if (e.target.innerHTML === "Previous" && currentQuestionIndex > 1) {
    currentQuestionIndex--;
  }
  buttonNextHTML.textContent = "Next";

  // Update the "Next" button label and make it "Finish" if at the last question
  if (currentQuestionIndex === totalQuestionNumber) {
    buttonNextHTML.textContent = "Finish";
  }

  // Hide the "Previous" button at the first question
  if (currentQuestionIndex === 1) {
    buttonPreviousHTML.classList.add("hidden");
  }
  if (currentQuestionIndex !== 1) {
    // Show the "Previous" button for questions other than the first one
    buttonPreviousHTML.classList.remove("hidden");
  }

  // Set question-related variables and update the HTML for the current question
  setQuestionVariables(currentLevelInfo, currentQuestionIndex);
  setQuestionHTMLValues({
    currentQuestionIndex,
    totalQuestionNumber,
    currentStatement,
    currentOptions,
  });
});

// Uncomment the following lines to retrieve formInfo from localStorage
// let formInfo = JSON.parse(localStorage.getItem("formInfo"));
// let currentLevelInfo = JSON.parse(localStorage.getItem("currentLevelInfo"));

// Output formInfo to the console
console.log("formInfo", formInfo);

// Initialize variables and set HTML values
initializeGeneralVariables(formInfo);
setQuestionVariables(currentLevelInfo, currentQuestionIndex);
setGeneralHTMLValues({ currentGermanLevel });
setQuestionHTMLValues({
  currentQuestionIndex,
  totalQuestionNumber,
  currentStatement,
  currentOptions,
});
