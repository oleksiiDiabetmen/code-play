const resultNumbers = document.getElementById("results-numbers");
const button = document.querySelector(".send");
const input = document.querySelector(".input-input");
const form = document.querySelector("#form");
const warningMessage = document.querySelector(".warning");

const inputs = document.querySelectorAll(".inputs-number");

const menu = document.querySelector(".menu");
const score = document.querySelector(".score");
const steps = document.querySelector(".steps");
const restart = document.querySelector(".restart");
const closeMenu = document.querySelector(".close-menu");

let numbers = [];
let stepsNum = 0;

function generateNumbers() {
  for (let i = 0; i < 4; i++) {
    let newNumber = Math.floor(Math.random() * 10);
    numbers[i] = newNumber;
  }

  console.log(numbers);
}

generateNumbers();

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

button.addEventListener("click", startGame);
button.addEventListener("submit", startGame);

function startGame() {
  stepsNum++;
  const number = input.value;

  if (number.length != 4) {
    warningMessage.classList.add("active");
    return;
  }

  if (warningMessage.classList.contains("active")) {
    warningMessage.classList.remove("active");
  }

  let current = 0;
  const userNumbers = number.split("");

  for (let i = 0; i < 4; i++) {
    if (userNumbers[i] == numbers[i]) {
      current++;
    }
  }

  resultNumbers.prepend(createElement(number, current));

  if (current == 4) {
    endGame();
  }

  input.value = "";
}

function createElement(number, current) {
  const li = document.createElement("li");
  li.classList.add("previous");
  if (current == 4) {
    li.classList.add("green");
  }
  li.innerText = `${number} - ${current}`;

  return li;
}

function endGame() {
  const scoreNum = numbers.join("");
  menu.classList.add("active");
  score.innerText = scoreNum;
  steps.innerText = stepsNum;
}

restart.addEventListener("click", () => {
  generateNumbers();
  inputs.forEach((e) => {
    e.value = "";
  });
  resultNumbers.innerHTML = "";
  stepsNum = 0;
  menu.classList.remove("active");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});
