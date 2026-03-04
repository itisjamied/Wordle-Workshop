// ***************************** DOM + constant *******************/

// 1) Get the game container from HTML

const gameContainer = document.querySelector(".game");
const message = document.querySelector(".message");
const button = document.querySelector(".button");
// 2) Define board size
const rows = 6;
const column = 5;

const words = [
  "ARRAY",
  "INDEX",
  "DEBUG",
  "ERROR",
  "BYTES",
  "ALIST",
  "LOGIC",
  "VALUE",
  "WHILE",
  "BREAK",
  "WHILE",
  "CODER",
  "GAMES",
  "PAGES",
];

// ************************* THIS IS FOR API WORK *******************

// CHECK IF THAT IS A REAL WORDS ///

// async function isWordReal(word) {
//   try {
//     const response = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
//     );

//     if (!response.ok) {
//       console.log(`${word} is not a real word.`);
//       return false;
//     }

//     const data = await response.json();

//     console.log(data);
//     const wordData = {
//       word: data[0].word,
//       pronunciation: data[0].phonectics[0]?.text || "N/A",
//       definition: data[0].meanings[0]?.defitions[0]?.definition || "N/A",
//     };

//     console.log(wordData);

//     return true;
//   } catch (error) {
//     console.log("Error");
//     return false;
//   }
// }

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
    console.error("API error:", error);
    return false;
  }
}

function pickSecretWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex].split("");
}

let secretWord = pickSecretWord();
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

document.addEventListener("keydown", (e) => {
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
      checkGuess();

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
  const guessWord = currentGuess.join("");
  const valid = await isWordReal(guessWord);
  if (!valid) {
    currentGuess = [];
  }
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

  console.log(valid);
}

function resetGame() {
  currentRow = 1;
  currentGuess = [];
  currentbox = 0;
  gameOver = false;

  secretWord = pickSecretWord();

  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("correct", "inword", "wrong");
  });
  button.classList.add("hidden");
  hideMessage();
}
console.log(currentGuess);
