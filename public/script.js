const gamecontainer = document.querySelector(".game");

const rows = 6;
const columns = 5;
//THE ; IN THE FUNCTION NAME WAS CAUSING AN ERROR, ADDED IT AND IT WORKS NOW
Function. createBoard(); {
    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement("div");
        box.classname = "box";
        gamecontainer.appendChild(box);
    }
}

createBoard();

const boxes = document.querySelectorAll(".box");
let currentBox = 0;
let currentRow = 1;
let currentGuess = [];

function rowStart() {
  return columns* (row - 1);
}

function rowEnd() {
  return columns* row;
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  
  if (currentBox >= rowEnd(currentRow)) return;

  //key.length === 1, will only let letters be entered, but aren't numbers also 1 length?
  if (key.length === 1 && key.match(/[a-z]/i)) {
    //nvm, the key.match filters what is in its paramaters, and since its set to /[a-z]/i, it will only let letters be entered, and the i makes it case insensitive
    boxes[currentBox].innerHTML = `<span class="letter">${key.toUpperCase()}</span>`;
    currentGuess = [...currentGuess, key.toUpperCase()];
    currentBox++;
  }
  
  if (key === "Backspace") {
    if ( currentBox > rowStart(currentRow)) {
      currentBox--;
      boxes[currentBox].textContent = "";
      currentGuess.pop();
    }
    return;
  }


});
