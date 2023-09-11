// Javascript Variables
let currentGermanLevel = "";
let selectedOptions = {};

// question variables
let currentQuestionIndex = 1;
let currentQuestion = {};
let currentStatement = "";
let currentOptions = {};
let totalQuestionNumber = 0;

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
// functions

const setGeneralHTMLValues = function (infoObj) {
  currentGermanLevelHTML.textContent = infoObj.currentGermanLevel;
};

function optionClickListener(e) {
  const optionDiv = e.target.closest(".card-question-single-option");
  if (optionDiv) {
    //clean background
    let allOptions = optionDiv.parentElement.querySelectorAll(
      ".card-question-single-option-option"
    );
    [...allOptions].forEach((child) => {
      child.parentElement.classList.remove("selected");
    });
    let userSelectedOption = optionDiv.querySelector(
      ".card-question-single-option-option"
    );
    // another stuff
    let userSelectedOptionText = userSelectedOption.textContent;
    selectedOptions[currentQuestionIndex] = userSelectedOptionText;
    userSelectedOption.parentElement.classList.add("selected");
    console.log(selectedOptions);
  }
}

currentOptionsHTML.addEventListener("click", optionClickListener);

const setQuestionHTMLValues = function (infoObj) {
  //   currentOptionsHTML.removeEventListener("click", optionClickListener);

  currentQuestionIndexHTML.textContent = infoObj.currentQuestionIndex;
  totalQuestionNumberHTML.textContent = infoObj.totalQuestionNumber;
  currentStatementHTML.textContent = infoObj.currentStatement;
  let i = 1;
  let optionsStringHTML = "";

  for (const key in infoObj.currentOptions) {
    let currentLetter = String.fromCharCode(64 + i);
    let currentOption = infoObj.currentOptions[key];
    let currentOptionIsSelected =
      Object.values(selectedOptions).includes(currentOption);

    optionsStringHTML += `
    <div class="card-question-single-option ${
      currentOptionIsSelected ? "selected" : ""
    }">
              <div class="card-question-single-option-letter">${currentLetter}</div>
              <div class="card-question-single-option-option">${currentOption}</div>
    </div>
    `;
    i++;
  }
  currentOptionsHTML.innerHTML = optionsStringHTML;
};

const setQuestionVariables = function (currentLevelInfo, currentQuestionIndex) {
  currentQuestion = currentLevelInfo.questions[currentQuestionIndex];
  currentStatement = `${currentQuestionIndex}. ${currentQuestion.statement}`;
  currentOptions = currentQuestion.options;
  totalQuestionNumber = Object.keys(currentLevelInfo.questions).length;
};

const initializeGeneralVariables = function (formInfo) {
  currentGermanLevel = formInfo.levelInput;
};
//prueba
updateQuestion.addEventListener("click", function (e) {
  if (
    e.target.innerHTML === "Next" &&
    currentQuestionIndex < totalQuestionNumber
  ) {
    currentQuestionIndex++;
  }
  if (e.target.innerHTML === "Previous" && currentQuestionIndex > 1) {
    currentQuestionIndex--;
  }
  buttonNextHTML.textContent = "Next";
  if (currentQuestionIndex === totalQuestionNumber) {
    buttonNextHTML.textContent = "Finish";
  }
  if (currentQuestionIndex === 1) {
    buttonPreviousHTML.classList.add("hidden");
  }
  if (currentQuestionIndex !== 1) {
    buttonPreviousHTML.classList.remove("hidden");
  }
  setQuestionVariables(currentLevelInfo, currentQuestionIndex);
  setQuestionHTMLValues({
    currentQuestionIndex,
    totalQuestionNumber,
    currentStatement,
    currentOptions,
  });
});

let formInfo = JSON.parse(localStorage.getItem("formInfo"));
let currentLevelInfo = JSON.parse(localStorage.getItem("currentLevelInfo"));

initializeGeneralVariables(formInfo);
setQuestionVariables(currentLevelInfo, currentQuestionIndex);
setGeneralHTMLValues({ currentGermanLevel });
setQuestionHTMLValues({
  currentQuestionIndex,
  totalQuestionNumber,
  currentStatement,
  currentOptions,
});
