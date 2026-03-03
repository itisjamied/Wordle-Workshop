const gameContainer = document.querySelector(".game");
const row = 6;
const col = 5;

function createBoard() {
    for(let i=0; i < row * columns; i++) {
        const box = document.createElement("div");
        box.className = "box";
        gameContainer.appendChild(box);
    }
}

createBoard();  
const boxes = document.querySelectorAll(".box");

let currentBox = 0;
let currentRow = 1;
let currentGuess = [];

function rowStart(row) {
    return columns * (row - 1);
}
function rowEnd(row) {
    return columns * row;
}
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (currentBox >= rowEnd(currentRow)) return;
    if (key.length === 1 && key.match(/[a-z]/i)) {
        boxes[currentBox].innerHTML = `<span class="letter">${key.toUpperCase()}</span>`;
        currentGuess = [...currentGuess, key.toUpperCase()];
        currentBox++;
    }
})
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
})

 if (currentBox >= rowEnd(currentRow)) return;

   // Only accept letters A-Z ( uppercase or lowsercase)
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess.push(key.toUpperCase());
    currentBox++;
  }
 if (currentBox >= rowEnd(currentRow)) return;

   // Only accept letters A-Z ( uppercase or lowsercase)
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess.push(key.toUpperCase());
    currentBox++;
  }
;