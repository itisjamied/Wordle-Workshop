const gameContainer = document.querySelector(".game");
const rows = 6;
const columns = 5;

const WORDS = ["CRANE", "PLANT", "MOUSE", "TRAIN", "LIGHT"];

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

let currentBox = 0;
let currentRow = 1;
let currentGuess = [];
let secretWord = pickSecretWord(["P","L","A","N","T"]);

function rowStart(row) {
    return columns * (row - 1);
}
function rowEnd(row) {
    return columns * row;
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

  if (key === "Backspace") {
    if (currentBox > rowStart(currentRow)) {
        currentBox--;
        boxes[currentBox].textContent = "";
        currentGuess.pop();
    }
    return;
    }
    // ENTER: check  your guess
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
  if (currentBox >= rowEnd(currentRow)) return;

  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess.push(key.toUpperCase());
    currentBox++;
  }
});
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
    // find correct index + element ( based on index)
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
//"if the letter matches the secret words letter `i` it's correct, add the `correct` css class"
 if (letter === secretWord[i]) {
      box.classList.add("correct");
// " if the `secretWord` `.includes` the `letter`, add in the `inword` class"
 } else if (secretWord.includes(letter)) {
      box.classList.add("inword");
// "if all else fails, add the css class `wrong` to the letter"
 } else {
      box.classList.add("wrong");
    }

    const message = document.querySelector(".message");
    function showMessage(text) {
        message.textContent = text;
        message.classList.remove("hidden");
    }
    function hideMessage() {
        message.textContent = "";
        message.classList.add("hidden");
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