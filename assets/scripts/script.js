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
var userInput = 0;

function checkUserAnswer() {
  userInput = parseInt(document.getElementById("userInput").value);
  if (pickedDigit == userInput) {
    correctAns++;
    document.getElementById("ans-correct").textContent = correctAns;
    outputBorder.classList.remove("wrong-ans");
    outputBorder.classList.add("correct-ans");
    setTimeout(function () {
      outputBorder.classList.remove("correct-ans");
    }, 1000);
  } else {
    wrongAns++;
    document.getElementById("ans-wrong").textContent = wrongAns;
    outputBorder.classList.remove("correct-ans");
    outputBorder.classList.add("wrong-ans");
    setTimeout(function () {
      outputBorder.classList.remove("wrong-ans");
    }, 1000);
  }
  setTimeout(function () {
    var outputRightAnswer = document.getElementById("output");
    outputRightAnswer.innerHTML = showRightAns;
    // console.log(showRightAns);
  });
  setTimeout(startGame, 1000);
}

var btn = document.querySelector(".btn-front");
var gameWindow = document.querySelector(".game-window");
btn.addEventListener("click", () => {
  gameWindow.classList.toggle("is-active");
});

document.getElementById("userInput").addEventListener("input", function () {
  this.value = this.value.slice(0, 1);
});
