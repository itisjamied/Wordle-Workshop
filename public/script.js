// ***************************** DOM + constant *******************/

// 1) Get the game container from HTML

const gameContainer = document.querySelector(".game");
const message = document.querySelector(".message");
const button = document.querySelector(".button");
const error = document.querySelector(".error");
// 2) Define board size
const rows = 6;
const column = 5;

// const words = [
//   "ARRAY",
//   "INDEX",
//   "DEBUG",
//   "ERROR",
//   "BYTES",
//   "ALIST",
//   "LOGIC",
//   "VALUE",
//   "WHILE",
//   "BREAK",
//   "WHILE",
//   "CODER",
//   "GAMES",
//   "PAGES",
// ];

async function randomWord() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5",
  );

  const data = await response.json();
  console.log(data[0].toUpperCase().split(""));

  return data[0].toUpperCase().split("");
}

async function isWordReal(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
    );

    // if response is 404, then it's not a word, return false
    if (!response.ok) {
      console.log(`${word} is not a real word.`);
      return false;
    }

    const data = await response.json();
    console.log(data);
    const wordData = {
      word: data[0].word,
      pronunciation: data[0].phonetics?.[0]?.text || "N/A",
      definitions: data[0].meanings[0]?.definitions[0].definition || "N/A",
    };

    console.log(wordData);

    return true;
  } catch (error) {
    console.error(error);
    currentGuess = [];
    return false;
  }
}

let secretWord = await randomWord();
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

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}

document.addEventListener("keydown", async (e) => {
  if (gameOver) return;
  // console.log(e);
  const key = e.key;

  if (key === "Backspace") {
    if (currentbox > rowStart(currentRow)) {
      currentbox--;
      boxes[currentbox].textContent = "";
      currentGuess.pop();
    }
    return;
  }
  if (key === "Enter") {
    if (currentbox === rowEnd(currentRow)) {
      const valid = await isWordReal(currentGuess.join(""));
      if (valid) {
        checkGuess();
        error.classList.add("non-opacity");
      } else if (!valid) {
        currentbox = currentbox - 5;
        currentGuess = [];
        currentRow--;

        for (let i = currentbox; i < rowEnd(currentRow + 1); i++) {
          boxes[i].textContent = "";
        }
        console.log(boxes[0].textContent);
        console.log(boxes);

        error.classList.remove("non-opacity");
      }

      if (!gameOver) {
        currentRow++;
        currentGuess = [];
        currentbox = rowStart(currentRow);
      }
    }
    return;
  }
  if (currentbox >= rowEnd(currentRow)) {
    return;
  }
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentbox].innerHTML =
      `<span class="letter">${key.toUpperCase()}</span>`;
    currentGuess = [...currentGuess, key.toUpperCase()];
    currentbox++;
    console.log(`currentRow: ${currentRow}`);
    console.log(`currentGuess: ${currentGuess}`);
    console.log(`currentbox: ${currentbox}`);
  }
});

let gameOver = false;

function checkWin() {
  if (currentGuess.join("") === secretWord.join("")) {
    gameOver = true;
    showMessage("🎉 You win!");
    button.classList.remove("hidden");
  }
}

function checkLose() {
  if (currentRow === rows && !gameOver) {
    gameOver = true;
    showMessage("You lost! The word was " + secretWord.join("").toLowerCase());
    button.classList.remove("hidden");
  }
}
// THIS IS WHERE THE ERROR IS FIXED THIS AS SOON AS POSSIBLE //
async function checkGuess() {
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
  checkWin();
  if (!gameOver && currentRow === rows) checkLose();
}

async function resetGame() {
  currentRow = 1;
  currentGuess = [];
  currentbox = 0;
  gameOver = false;

  secretWord = await randomWord();

  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("correct", "inword", "wrong");
  });
  button.classList.add("hidden");
  hideMessage();
}
console.log(currentGuess);
window.resetGame = resetGame;
