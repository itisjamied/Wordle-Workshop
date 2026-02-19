/********************
 DOM + constants
********************/

// get the game container + message container
const gameContainer = document.querySelector('.game');
const message = document.querySelector(".message");

// set global constants
// const secretWord = ["C", "R", "A", "N", "E"];
const rows = 6;
const columns = 5;

const WORDS = [
  "CRANE",
  "PLANT",
  "SHARE",
  "BRICK",
  "MOUSE",
  "STONE",
];

/********************
Build board
********************/

function createBoard() {
// for loop, initalize; condition; expression
// create 6 rows with 5 boxes each (30 total boxes)
  for (let i = 0; i < rows * columns; i++) {
    const box = document.createElement("div");
    box.className = "box";
    gameContainer.appendChild(box);
  }
}

createBoard();
const boxes = document.querySelectorAll(".box");

function pickSecretWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].split(""); // returns ["C","R","A","N","E"]
}

/********************
Game state (changes)
 ********************/
let currentBox = 0; 
let currentRow = 1;
let currentGuess = [];
let gameOver = false;
let secretWord = pickSecretWord();

/********************
Helpers (small math)
********************/
function rowStart(row) {
  return columns * (row - 1);
}
function rowEnd(row) {
  return columns * row;
}


/********************
UI helpers
********************/
function showMessage(text) {
  message.textContent = text;
  message.style.display = "block";
}
function hideMessage() {
  message.style.display = "none";
}


/********************
Game logic
 ********************/
function resetGame() {
    // set state variables back to initial values
    currentBox = 0;
    currentRow = 1;
    currentGuess = [];
    gameOver = false;
    secretWord = pickSecretWord();
    // reset box content and styles visually
    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("correct", "inword", "wrong");
    });
    hideMessage();
}

function checkWin() {
    if (currentGuess.join("") === secretWord.join("")) {
        gameOver = true;
        if (currentRow === 1) {
            showMessage("Incredible! You guessed the word on your first try!");
        } else {
            showMessage(`Congrats! You win in ${currentRow} guesses!`);
        }
    }
}

function checkLost(){
    gameOver = true;
    showMessage(`Game Over! The word was ${secretWord.join("")}`);
}

function checkGuess(){
    // loop once per letter in the secret word
    for (let i = 0; i < secretWord.length; i++) {
    // find correct index + elemtned ( based on index)
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

/********************
Input loop (event listener)
********************/

// keydown event, e = event object, 
document.addEventListener("keydown", (e) => {
if (gameOver) return;
    // e.key = key that was pressed
    const key = e.key;

  // if key is length 1, and is a letter z upper case or lowercase
    if (key.length === 1 && key.match(/[a-z]/i)) {
    // if (currentBox < boxes.length) {
        if (currentBox < rowEnd(currentRow)){
            boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
            currentBox++;
            currentGuess = [...currentGuess, key.toUpperCase()];
        }
    return;
    }

  //  if they hit backspace
  if (key === "Backspace") {
    if (currentBox > rowStart(currentRow)) {
      currentBox--;
      boxes[currentBox].textContent = "";
      currentGuess.pop();
    }
    return;
  }

  // check , enter key? not over the row limit, and @ the end of the row
  if ( key === "Enter" && currentBox === rowEnd(currentRow)) {

    checkGuess();
    if (!gameOver) {
        currentRow++;
        currentGuess = [];
        currentBox = columns * (currentRow - 1);
    }
    return;
}
});