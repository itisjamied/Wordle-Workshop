const gameContainer =
document.querySelector("game");


// Board Size:
const rows = 6;
const columns = 5;



//Build Board
function createBoard() {
    //Create Rows * Column Tiles
    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement("div");
        box.className = "box";
        gameContainer.appendChild(box);
    }
}
createBoard();

let currentBox = 0;
let currentRow = 1;
let currentGuess = []


const boxes =
document.querySelectorAll(".box");

for (intiliazer; condition; update)

or
for (let i = 0; i < rows * columns; i++) {
    
}

function rowStart(row) {
    return columns * (row - 1);
}

function rowEnd(row) {
    return columns * row;
}


/********************
Input loop (event listener)
********************/
// keydown event, e = event object, 
document.addEventListener("keydown", (e) => {
  // e.key = key that was pressed
  const key = e.key;

  // Stop typing if the row is full
  if (currentBox >= rowEnd(currentRow)) return;

  // Only accept letters A-Z ( uppercase or lowsercase)
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess = [...currentGuess, key.toUpperCase()];
    currentBox++;
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  //////////////////////
  // PREVIOUS CODE ⬆️
  //////////////////////

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

  //////////////////////
  // PREVIOUS CODE ⬇️
  //////////////////////


  // Stop typing if the row is full
  if (currentBox >= rowEnd(currentRow)) return;

   // Only accept letters A-Z ( uppercase or lowsercase)
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess.push(key.toUpperCase());
    currentBox++;
  }
});