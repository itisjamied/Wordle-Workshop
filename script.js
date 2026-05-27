const gameContainer = document.querySelector(".game");

const rows = 6;
const columns = 5;

function createBoard() {
  for (let i = 0; i < rows * columns; i++) {
    const box = document.createElement("div");
    box.className = "box";
    gameContainer.appendChild(box);
  }
}
createBoard();

function pickSecretWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].split("");
}

const boxes = document.querySelectorAll(".box");

//Game State
let currentBox = 0;
let currentRow = 1;
let currentGuess = [];
const WORDS = [
  "CRANE",
  "PLANT",
  "MOUSE",
  "TRAIN",
  "LIGHT",
  "BRICK",
  "SNAKE",
  "GHOST",
  "BREAD",
  "CLOUD",
  "PLANE",
  "SWORD",
  "SHIELD",
  "WATER",
  "FLAME",
  "EARTH",
  "MONEY",
  "HEART",
  "DREAM",
  "NIGHT",
];
let secretWord = pickSecretWord();

//Helpers
function rowStart(row) {
  return columns * (row - 1);
}

function rowEnd(row) {
  return columns * row;
}

let gameOver = false;
const message = document.querySelector(".message");

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}

function checkWin() {
  if (currentGuess.join("") === secretWord.join("")) {
    gameOver = true;
    showMessage("🎉 You win!");
  }
}

function checkLost() {
  if (currentRow === rows && !gameOver) {
    gameOver = true;
    showMessage("You lost! The word was " + secretWord.join(""));
  }
}

function checkGuess() {
  for (let i = 0; i < secretWord.length; i++) {
    const boxIndex = rowStart(currentRow) + i;
    const box = boxes[boxIndex];
    const letter = currentGuess[i];

    if (letter === secretWord[i]) {
      box.classList.add("Correct");
    } else if (secretWord.includes(letter)) {
      box.classList.add("Inword");
    } else {
      box.classList.add("Wrong");
    }
  }
  checkWin();
  if (!gameOver && currentRow === rows) {
    checkLost();
  }
}

function resetGame() {
  currentBox = 0;
  currentRow = 1;
  currentGuess = [];
  secretWord = pickSecretWord();

  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("Correct", "Inword", "Wrong");
  });
  hideMessage();
}

//Typing Presses
document.addEventListener("keydown", (e) => {
  console.log(gameOver);
  if (gameOver) return;
  const key = e.key;

  if (key === "Backspace") {
    console.log("Backspace");
    if (currentBox > rowStart(currentRow)) {
      currentBox--;
      boxes[currentBox].textContent = "";
      currentGuess.pop();
    }
    return;
  }

  if (key === "Enter") {
    console.log(currentBox);
    console.log(rowEnd(currentRow));

    if (currentBox === rowEnd(currentRow)) {
      console.log("checkingend");
      checkGuess();

      if (!gameOver) {
        currentRow++;
        currentGuess = [];
        currentBox = rowStart(currentRow);
      }
    }
    return;
  }

  if (currentBox >= rowEnd(currentRow)) return;

  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML =
      `<span class="letter"> ${key.toUpperCase()} </span>`;
    currentGuess = [...currentGuess, key.toUpperCase()];
    currentBox++;
  }
});
