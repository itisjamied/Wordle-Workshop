/********************
 DOM + constants
********************/

// 1) Get the game container from HTML
const gameContainer = document.querySelector(".game");
const message = document.querySelector(".message");
console.log(message);

// 2) Define board size
const rows = 6;
const columns = 5;

const WORDS = ["CRANE", "PLANT", "MOUSE", "TRAIN", "LIGHT"];

/********************
 Build board
********************/

function createBoard() {
  // Create rows * columns tiles (6 * 5 = 30)
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

/********************
Game state (changes)
 ********************/
let currentBox = 0;   // Which tile index we’re typing into (0 to 29)
let currentRow = 1;   // Which row we’re on (1 to 6)
let currentGuess = []; // Letters typed in the current row
let secretWord = pickSecretWord();

/********************
Helpers (small math)
********************/
function rowStart(row) {
  return columns * (row - 1);
}

function rowEnd(row) {
  return columns * row;
}

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
  console.log(message);
}

function hideMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}

/********************
Game logic
 ********************/

let gameOver = false;

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

function checkGuess(){
    // loop once per letter in the secret word
    for (let i = 0; i < secretWord.length; i++) {
    // find correct index + elemtned ( based on index)
    const boxIndex = rowStart(currentRow) + i;
    const box = boxes[boxIndex];

    // get letter from "i" position in guess
    const letter = currentGuess[i];

        //style accoridngly 
        if (letter === secretWord[i]) {
            box.classList.add("correct");
        } else if (secretWord.includes(letter)) {
            box.classList.add("inword");
        } else {
            box.classList.add("wrong");
        }
    }
    checkWin();
    if (!gameOver && currentRow === rows) {
    checkLost();
    }
}

function resetGame() {
  // Reset game state
  currentRow = 1;
  currentBox = 0;
  currentGuess = [];
  gameOver = false;

  // Pick new word
  secretWord = pickSecretWord();

  // Clear tiles
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("correct", "inword", "wrong");
  });

  // Hide message
  hideMessage();
}

/********************
Input loop (event listener)
********************/

// keydown event, e = event object, 
document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  // e.key = key that was pressed
  const key = e.key;

  if (key === "Enter") {
  // Only allow Enter if row is full
  if (currentBox === rowEnd(currentRow)) {
    checkGuess();

    // Move to next row if game isn’t over
    if (!gameOver) {
      currentRow++;
      currentGuess = [];
      currentBox = rowStart(currentRow);
    }
  }

  return;
}

  if (key === "Backspace") {
    // Don’t let them delete into the previous row
    if (currentBox > rowStart(currentRow)) {
      currentBox--;
      boxes[currentBox].textContent = "";
      currentGuess.pop();
    }
    return;
  }

  // Stop typing if the row is full
  if (currentBox >= rowEnd(currentRow)) return;

  // LETTERS ONLY
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess.push(key.toUpperCase());
    currentBox++;
  }
});