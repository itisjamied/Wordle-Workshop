const gameContainer = document.querySelector(".game");

const rows = 6;
const columns = 5;
const WORDS =["CRANE", "PLANT", "MOUSE", "TRAIN", "LIGHT"];
const message = document.querySelector(".message");

//THE ; IN THE FUNCTION NAME WAS CAUSING AN ERROR, ADDED IT AND IT WORKS NOW
function createBoard() {
    for (let i = 0; i < rows * columns; i++) {
      const box = document.createElement("div");
      box.className = "box";
      gameContainer.appendChild(box);
    }
}
function pickSecretWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].split("");
}

createBoard();

const boxes = document.querySelectorAll(".box");
let currentBox = 0;
let currentRow = 1;
let currentGuess = [];
let secretWord = pickSecretWord();
let gameOver = false;

function rowStart(row) {
  return columns* (row - 1);
}

function rowEnd(row) {
  return columns * row;
}

document.addEventListener("keydown", (e) => {
  console.log("key")
  if (gameOver) return;
  const key = e.key;

  if (key === "Enter") {
    if (currentBox === rowEnd(currentRow)) {
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

function checkwin() {
  if (currentGuess.join("") === secretWord.join("")) {
    gameOver = true;
    showMessage("You win!");
  }
}

function checkLost() {
  if (currentRow === rows && !gameOver) {
    gameOver = true;
    showMessage(`You lose! The word was ${secretWord.join("")}`);
  }
}

function checkGuess() {
  for (let i = 0; i < secretWord.length; i++) {
    const boxIndex = rowStart(currentRow) + i;
    const box = boxes[boxIndex];
    const letter = currentGuess[i];

    if (letter === secretWord[i]) {
      box.classList.add("correct");
    } else if (secretWord.includes(letter)) {
      box.classList.add("inword");
    } else {
      box.classList.add("wrong");
    }     
  }
    checkwin();
  if (!gameOver && currentRow === rows) {
    checkLost();
  }
}

function resetGame() {
  currentBox = 0;
  currentRow = 1;
  currentGuess = [];
  secretWord = pickSecretWord();
  gameOver = false;
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("correct", "inword", "wrong");
  });
  hideMessage();
}

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message
  message.classList.add("hidden");
}