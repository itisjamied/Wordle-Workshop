const gameContainer = document.querySelector(".game");
const rows = 6;
const columns = 5;
const WORDS = ["CRANE", "PLANT", "MOUSE", "TRAIN", "LIGHT"];
const message = document.querySelector(".message");

function createBoard() {
    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement("div");
        box.className = "box";
        gameContainer.appendChild(box);
    }
}
createBoard();

function secretword() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].split("");
}

const boxes = document.querySelectorAll(".box");

 let currentBox = 0;
 let currentRow = 1;
 let currentGuess= [];
 let secretWord = secretword();

 function rowStart(row) {
    return columns * (row - 1);
 }

 function rowEnd(row) {
    return columns * row;

 }

function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}

 let gameOver = false;
 
function checkWin() {
  if (currentGuess.join("") === secretWord.join("")) {
    gameOver = true;
    showMessage("🎉 You win!");
  }
}

function checkLost() {
  if (currentRow === rows && !gameOver) {
    gameOver = true;
    showMessage("You lost! The word was " + secretWord.join(""));
  }
}

  function checkGuess() {
    for (let i = 0; i < secretWord.length; i++) 
            {
         const boxIndex = rowStart(currentRow) + i;
        const box = boxes[boxIndex];
        
        const letter = currentGuess[i];

        //"if the letter matches the secret words letter `i` it's correct, add the `correct` css class"
 if (letter === secretWord[i]) {
      box.classList.add("correct");
// " if the `secretWord` `.includes` the `letter`, add in the `inword` class"
 } else if (secretWord.includes(letter)) {
      box.classList.add("inword");
// "if all else fails, add the css class `wrong` to the letter"
 } else {
      box.classList.add("wrong");
    }
    }
    checkWin();
    if (!gameOver && currentRow === rows) {
        checkLost();
    }
 }

 function resetGame() {
  // Reset game state
  currentRow = 1;
  currentBox = 0;
  currentGuess = [];
  gameOver = false;

  // Pick new word
  secretWord = secretword();

  // Clear tiles
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("correct", "inword", "wrong");
  });

  // Hide message
  hideMessage();
}








 

document.addEventListener("keydown", (e) => {
  // e.key = key that was pressed
  if (gameOver) return;
  const key = e.key;

 if (key === "Backspace") {
    // Don’t let them delete into the previous row
    if (currentBox > rowStart(currentRow)) {
      currentBox--;
      boxes[currentBox].textContent = "";
      currentGuess.pop();
    }
    return;
  }

    if (key === "Enter") {
    if (currentBox === rowEnd(currentRow)) {
        checkGuess();

        if (!gameOver) {
            currentRow++;
            currentGuess = [];
            CurrentBox = rowStart(currentRow);
        }
  }
return;
    }  

  // Stop typing if the row is full
  if (currentBox >= rowEnd(currentRow)) return;


  // Only accept letters A-Z ( uppercase or lowsercase)
  if (key.length === 1 && key.match(/[a-z]/i)) {
    boxes[currentBox].innerHTML = `<span class="letter">${ key.toUpperCase() }</span>`;
    currentGuess = [...currentGuess, key.toUpperCase()];
    currentBox++;
  }
});



 
