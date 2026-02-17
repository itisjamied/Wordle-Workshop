// get the game container
const gameContainer = document.querySelector('.game');

// create 6 rows with 5 boxes each (30 total boxes)
const secretWord = ["C", "R", "A", "N", "E"];
const rows = 6;
const columns = 5;

// for loop, initalize; condition; expression
for (let i = 0; i < rows * columns; i++) {
    const box = document.createElement('div');
    box.className = 'box';
    gameContainer.appendChild(box);
}

const boxes = document.querySelectorAll(".box");

// currentBox = which box we’re currently filling (index numbers = 0 to 29)
let currentBox = 0;
let currentRow = 1;
let currentColumn = 0;
let currentGuess = [];

function resetGame() {
    // set variables back to initial values
    currentBox = 0;
    currentRow = 1;
    currentColumn = 0;
    currentGuess = [];
    // reset box content and styles visually
    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("correct", "inword", "wrong");
    });
    // reset message
    const message = document.querySelector(".message");
    message.style.display = "none";
}

function checkWin() {
    if (currentGuess.join("") === secretWord.join("")) {
        const message = document.querySelector(".message");
        if (currentRow === 1) {
            message.textContent = `Incredible! You guessed the word on your first try!`;
        } else {
        message.textContent = `Congrats! You win in ${currentRow} guesses!`;
        }
        message.style.display = "block";
        document.removeEventListener("keydown");
    }
    else return;
}

function checkLoose(){
        const message = document.querySelector(".message");
        message.textContent = `Game Over! The word was ${secretWord.join("")}`;
        message.style.display = "block";
        document.removeEventListener("keydown");
}

function checkGuess(){
    for (let i = 0; i < secretWord.length; i++) {
        const boxIndex = (currentRow - 1) * columns + i;
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
    if (currentRow === rows) {
       checkLoose();
    }
}


document.addEventListener("keydown", (e) => {
  const key = e.key;

  // if key is length 1, and is a letter z upper case or lowercase
  if (key.length === 1 && key.match(/[a-z]/i)) {
    // if (currentBox < boxes.length) {
    if (currentBox < (columns * currentRow)){
        boxes[currentBox].innerHTML = `<span class="letter"> ${key.toUpperCase() } </span>`;
        currentBox++;
        currentGuess = [...currentGuess, key.toUpperCase()];
    }
    return;
  }

  //  if they hit backspace
  if (key === "Backspace") {
    if (currentBox > (columns * (currentRow -1))) {
      currentBox--;
      boxes[currentBox].textContent = "";
      currentGuess.pop();
    }
    return;
  }

  // check , enter key? not over the row limit, and @ the end of the row
  if ( key === "Enter" && currentRow <= rows && currentBox === (columns * currentRow)) {

    checkGuess();

    currentRow++;
    currentGuess = []; 
    currentBox = columns * (currentRow - 1);
  }

});

