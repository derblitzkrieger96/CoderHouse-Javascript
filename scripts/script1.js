"use strict"; // Activates strict mode for better error handling

// User input variables
let nameInput = "";
let levelInput = "";
let rememberMeInput = false;

// Other variables
let globaLevelObj = {}; // Global level object to store quiz data

// Get references to HTML elements
const form = document.querySelector(".card-body");
const germanLevelSpan = document.querySelector(".card-header-GL");

/**
 * Load quiz data based on the selected German language level.
 * @param {string} levelInput - The selected German language level (e.g., 'A1', 'A2', 'B1', 'B2').
 * @returns {Promise<object>} A Promise that resolves to an object containing user data and quiz data.
 */
const loadData = async (levelInput) => {
  // Fetch quiz data from a JSON file
  const res = await fetch("./data/data.json");
  const data = await res.json();

  // Store the selected quiz data in globalLevelObj
  globaLevelObj = data[levelInput];

  // Store form data in local storage
  localStorage.setItem(
    "formInfo",
    JSON.stringify({
      levelInput,
      nameInput,
      rememberMeInput,
    })
  );

  // Store the current quiz data in local storage
  localStorage.setItem("currentLevelInfo", JSON.stringify(globaLevelObj));

  // Return an object containing user data and quiz data
  return {
    levelInput,
    nameInput,
    rememberMeInput,
    ...globaLevelObj,
  };
};

// Event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get user input values from the form
  nameInput = document.querySelector("#name").value;
  levelInput = document.querySelector("#level").value;
  rememberMeInput = document.querySelector("#remember-me").checked;

  // Create form data from the user input
  const formData = new FormData(form);

  // Convert form data to a query string
  let queryParams = "";
  queryParams = new URLSearchParams(formData).toString();

  // Load data based on the selected level and redirect to the quiz page
  const dataToSend = loadData(levelInput)
    .then((data) => {
      // Encode the data as a URL component
      let encodedURL = encodeURIComponent(JSON.stringify(data));

      // Output to console the encoded data and construct the URL for redirection
      window.location.href = `../pages/quizForm.html?${encodedURL}`;
    })
    .toString();
});
