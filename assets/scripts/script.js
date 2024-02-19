var pickedDigit;
var outputBorder = document.getElementById("output");
var showRightAns;

function startGame() {
  function getRandomNum() {
    let min = 1001;
    let max = 99999;
    let result = Math.floor(Math.random() * (max - min + 1) + min);
    // console.log(`Step 1 - Generate random number: ${result} `);
    return result;
  }
  var randomNum = getRandomNum();

  function numToArr(num) {
    // console.log(`Step 2 - Shuffle this number `);
    let result = Array.from(String(num), Number);
    // console.log(`2.1 - transforming num to arr: ${result}`);
    return result;
  }
  var arrOfNum = numToArr(randomNum);

  // According to the rules of the game, reverse method could be enough
  function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let index = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[index];
      arr[index] = temp;
    }
    // console.log(`2.2 - getting shuffled arr: ${arr}`);
    return arr;
  }
  var shuffledArr = shuffleArr(arrOfNum);

  function arrToInt(arr) {
    let result = parseInt(arr.join(""));
    // console.log(`2.3 finally getting shuffled int: ${result}`);
    return result;
  }
  var shuffledNum = arrToInt(shuffledArr);

  if (shuffledNum == randomNum) {
    var shuffledArr = shuffleArr(arrOfNum);
    var shuffledNum = arrToInt(shuffledArr);
  }

  function substract(randomNum, shuffledNum) {
    let result = Math.abs(randomNum - shuffledNum);
    showRightAns = result; // making copy to show further in game-window
    // console.log(`Step 3 - Subtracting shuffledNum ${shuffledNum} from first randomNum ${randomNum}, resulting in: ${result});
    return result;
  }
  var finalNum = substract(randomNum, shuffledNum);

  var guessTheDigit;
  function rmDigit(num) {
    var arrNum = numToArr(num);
    var index = Math.floor(Math.random() * arrNum.length);
    pickedDigit = arrNum[index];
    arrNum[index] = "?";
    arrNum = arrNum.join("");
    // console.log(`Step 4 - Find the missing num ?: ${arrNum}`);
    return arrNum;
  }
  guessTheDigit = rmDigit(finalNum);

  var outputArr = document.getElementById("output");
  outputArr.innerHTML = guessTheDigit;
  return pickedDigit;
}

// ============================== CHECK USER ANSWER ==============================
var correctAns = 0;
var wrongAns = 0;
var userInput;

function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobile()) {
  document
    .getElementById("btn-check")
    .addEventListener("touchstart", function (event) {
      event.preventDefault();
      checkUserAnswer();
    });
} else {
  document
    .getElementById("btn-check")
    .addEventListener("click", checkUserAnswer);
}

function checkUserAnswer() {
  userInput = parseInt(document.getElementById("userInput").value);
  if (isNaN(userInput)) {
    alert("Введите цифру / Enter the number!");
    return;
  } else {
    if (pickedDigit == userInput) {
      correctAns++;
      setTimeout(function () {
        var outputRightAnswer = document.getElementById("output");
        outputRightAnswer.innerHTML = showRightAns;
      });
      document.getElementById("ans-correct").textContent = correctAns;
      outputBorder.classList.remove("wrong-ans");
      outputBorder.classList.add("correct-ans");
      setTimeout(function () {
        outputBorder.classList.remove("correct-ans");
      }, 1500);
      blockBtnCheck();
      setTimeout(startGame, 1500);
      setTimeout(clearInput, 1500);
    } else if (userInput >= 0) {
      wrongAns++;
      setTimeout(function () {
        var outputRightAnswer = document.getElementById("output");
        outputRightAnswer.innerHTML = showRightAns;
        // console.log(showRightAns);
      });
      document.getElementById("ans-wrong").textContent = wrongAns;
      outputBorder.classList.remove("correct-ans");
      outputBorder.classList.add("wrong-ans");
      setTimeout(function () {
        outputBorder.classList.remove("wrong-ans");
      }, 1500);
      blockBtnCheck();
      setTimeout(startGame, 1500);
      setTimeout(clearInput, 1500);
    }
  }
}
// ============================== TOGGLE GAME WINDOW ==============================
var btn = document.querySelector(".btn-front");
var gameWindow = document.querySelector(".game-window");
btn.addEventListener("click", () => {
  gameWindow.classList.toggle("is-active");
});

document.getElementById("userInput").addEventListener("input", function () {
  this.value = this.value.slice(0, 1);
});

// ============================== BLOCK CHECK FOR 1 S =======================
function blockBtnCheck() {
  var btnCheck = document.querySelector(".btn-check");
  btnCheck.disabled = true;
  setTimeout(function () {
    btnCheck.disabled = false;
  }, 1500);
}

// ============================== CLEAR INPUT =======================
function clearInput() {
  var clearInput = document.getElementById("userInput");
  if (clearInput.value !== "") {
    clearInput.value = "";
    clearInput.focus();
    clearInput.click();
  }
}

// ============================== FINISH GAME RUSSIAN ==============================
function toggleGameRus() {
  correctAns = 0;
  wrongAns = 0;
  document.getElementById("ans-wrong").textContent = wrongAns;
  document.getElementById("ans-correct").textContent = correctAns;
  var toggler = document.getElementById("finishButton");
  if (toggler.innerHTML === "Завершить игру") {
    toggler.innerHTML = "Начать игру";
  } else {
    toggler.innerHTML = "Завершить игру";
  }
}

// ============================== FINISH GAME ENGLISH ==============================
function toggleGame() {
  correctAns = 0;
  wrongAns = 0;
  document.getElementById("ans-wrong").textContent = wrongAns;
  document.getElementById("ans-correct").textContent = correctAns;
  var toggler = document.getElementById("finishButton");
  if (toggler.innerHTML === "Stop") {
    toggler.innerHTML = "Start";
  } else {
    toggler.innerHTML = "Stop";
  }
}

// ============================== THEME SWITCHER ==============================
var switchBtn = document.querySelector(".switch");
var theme = document.querySelector(".body");
var darkTheme = localStorage.getItem("dark-theme");
var sunIcon = document.querySelector(".sun");
var moon = document.querySelector(".moon");

const enableDark = () => {
  theme.classList.add("dark-theme");
  localStorage.setItem("dark-theme", "enabled");
};

const disableDark = () => {
  theme.classList.remove("dark-theme");
  localStorage.setItem("dark-theme", "disabled");
};

if (darkTheme === "enabled") {
  enableDark();
}

switchBtn.addEventListener("click", () => {
  darkTheme = localStorage.getItem("dark-theme");
  if (darkTheme === "disabled") {
    enableDark();
  } else {
    disableDark();
  }
});

// ============================== SLIDER IN RUSSIAN ==============================

const sliderContentRus = [
  "Алгоритм задумывает число, но не сообщает его Вам напрямую ",
  "Например: 8765. Затем переставляет его цифры: 5687",
  "Из числа 8765 вычитает 5687, получает: 3078",
  "Зачеркивает любую цифру и выводит результат: ?078",
  "Чтобы отгадать, сложите все оставшиеся цифры. 0+7+8=15",
  "Вычтите 15 из ближайшего числа, кратного 9. 18-15=3. Это и есть ответ!",
];

var currentPage = 0;

function showSlideRus(page) {
  var sliderCard = document.getElementById("sliderCard");
  sliderCard.innerHTML = `${sliderContentRus[page]}`;
}

function nextSlideRus() {
  currentPage = (currentPage + 1) % sliderContentRus.length;
  showSlideRus(currentPage);
}

function prevSlideRus() {
  currentPage =
    (currentPage - 1 + sliderContentRus.length) % sliderContentRus.length;
  showSlideRus(currentPage);
}

function showCard() {
  var cardContent = document.querySelector(".card-content");
  var sliderCard = document.querySelector(".slider-card");
  sliderCard.classList.toggle("slider-card-active");
  cardContent.classList.toggle("card-content-active");
}

// ============================== SLIDER IN ENGLISH ==============================
const slideContent = [
  "The algorithm thinks of a number, but does not directly tell you it",
  "For example: 8765. Then it rearranges its digits: 5687",
  "It subtracts 5687 from the number 8765, resulting in: 3078",
  "It removes any digit and outputs the result: ?078",
  "To guess it, add up all the remaining digits. 0+7+8=15",
  "Subtract 15 from the nearest multiple of 9. 18-15=3. That is the answer!",
];

var currentPage = 0;

function showSlide(page) {
  var sliderCard = document.getElementById("sliderCard");
  sliderCard.innerHTML = `${slideContent[page]}`;
}

function nextSlide() {
  currentPage = (currentPage + 1) % slideContent.length;
  showSlide(currentPage);
}

function prevSlide() {
  currentPage = (currentPage - 1 + slideContent.length) % slideContent.length;
  showSlide(currentPage);
}

function showCard() {
  var cardContent = document.querySelector(".card-content");
  var sliderCard = document.querySelector(".slider-card");
  sliderCard.classList.toggle("slider-card-active");
  cardContent.classList.toggle("card-content-active");
}
