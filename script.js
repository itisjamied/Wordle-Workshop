const gameContainer = document.querySelector(".game");

const rows = 6;
const columns = 5;

function createBoard() {
    for (let i = 0;  i < rows * columns; i++) {
        const box = document.createElement("div");
        box.className = "box";
        gameContainer.appendChild(box);
    }
}
createBoard();

const boxes = document.querySelectorAll(".box");

//Game State
let currentBox = 0;
let currentRow = 1;
let currentGuess = [];

//helpers
function rowStart(row) {
  return columns * (row - 1);
}

function rowEnd(row) {
  return columns * row;
}


//Typing Presses
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Backspace") {
        if (currentBox > rowStart(currentRow)) {
            currentBox--;
            boxes[currentBox].textContent = "";
            currentGuess,pop();
        }
        return;
    }
    
    if (currentBox >= rowEnd(currentRow)) return;

    if (key.length === 1 && key.match(/[a-z]/i)) {
        boxes[currentBox].innerHTML = `<span class="letter"> ${key.toUpperCase() } </span>`;
        currentGuess = [...currentGuess, key.toUpperCase()];
        currentBox++;
    }
});
