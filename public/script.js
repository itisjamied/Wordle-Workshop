// ***************************** DOM + constant *******************/

// 1) Get the game container from HTML

const gameContainer = document.querySelector(".game");

// 2) Define board size
const rows = 6;
const column = 5;

// ****************** Build broad **********************/

function createBoard() {
  for (let i = 0; i < rows * column; i++) {
    const box = document.createElement("div");
    box.className = "box";
    gameContainer.appendChild(box);
  }
}

createBoard();

const boxes = document.querySelectorAll(".box");
console.log(boxes);
let currentbox = 0;
let currentRow = 1;
let currentGuess = [];

function rowStart(row) {
  return column * (row - 1);
}

function rowEnd(row) {
  return column * row;
}

document.addEventListener("keydown", (e) => {
  console.log(e);
  const key = e.key;
  if (key === "Backspace") {
    if (currentbox > rowStart(currentRow)) {
      currentbox--;
      boxes[currentbox].textContent = "";
      currentGuess.pop();
    }
    return;
  }

  if (currentbox >= rowEnd(currentRow)) return;

  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentbox].innerHTML =
      `<span class="letter">${key.toUpperCase()}</span>`;
    currentGuess = [...currentGuess, key.toUpperCase()];
    currentbox++;
  }
});

console.log(currentGuess);
