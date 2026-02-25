/********************
 DOM + constants
********************/

// 1) Get the game container from HTML
const gameContainer = document.querySelector(".game");

// 2) Define board size
const rows = 6;
const columns = 5;

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

const boxes = document.querySelectorAll(".box");

let currentBox = 0;   // Which tile index we’re typing into (0 to 29)
let currentRow = 1;   // Which row we’re on (1 to 6)
let currentGuess = []; // Letters typed in the current row

function rowStart(row) {
  return columns * (row - 1);
}

function rowEnd(row) {
  return columns * row;
}

document.addEventListener("keydown", (e) => {
  const key = e.key;

  // BACKSPACE: delete the previous letter
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
    boxes[currentBox].textContent = key.toUpperCase();
    currentGuess.push(key.toUpperCase());
    currentBox++;
  }
});