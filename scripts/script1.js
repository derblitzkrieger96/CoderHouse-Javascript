"use strict"; // activate strict mode
// user input variables
let nameInput = "";
let levelInput = "";
let rememberMeInput = false;

// another variables
let globaLevelObj = {};

const form = document.querySelector(".card-body");
const germanLevelSpan = document.querySelector(".card-header-GL");

const loadData = async (levelInput) => {
  const res = await fetch("./data/data.json");
  const data = await res.json();
  globaLevelObj = data[levelInput];
  localStorage.setItem(
    "formInfo",
    JSON.stringify({
      levelInput,
      nameInput,
      rememberMeInput,
    })
  );
  localStorage.setItem("currentLevelInfo", JSON.stringify(globaLevelObj));
  return {
    levelInput,
    nameInput,
    rememberMeInput,
    ...globaLevelObj,
  };
  //prueba

  //   console.log(globaLevelObj);
};

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting normally
  nameInput = document.querySelector("#name").value;
  levelInput = document.querySelector("#level").value;
  rememberMeInput = document.querySelector("#remember-me").checked;

  //   prueba
  const formData = new FormData(form);
  let queryParams = "";
  queryParams = new URLSearchParams(formData).toString();
  //   while (queryParams === "") {
  //     console.log("waiting");
  //   }
  const dataToSend = loadData(levelInput)
    .then((data) => {
      let encodedURL = encodeURIComponent(JSON.stringify(data));
      console.log("data", encodedURL);
      console.log("url", `../pages/quizForm.html?${encodedURL}`);
      window.location.href = `../pages/quizForm.html?${encodedURL}`;
    })
    .toString();

  // Redirect to the second page with query parameters
  //   window.location.href = `../pages/quizForm.html?${queryParams}`;
  //   window.location.href = `../pages/quizForm.html?${dataToSend}`;
});
