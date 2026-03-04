// ***************************** DOM + constant *******************/

// 1) Get the game container from HTML

const gameContainer = document.querySelector(".game");

// 2) Define board size
const rows = 6;
const column = 5;

const words = ["ARRAY", "INDDEX", "DEBUG", "ERROR", "BYTES", "ALIST", "LOGIC", "VALUE", "WHILE", "BREAK", "WHILE", "CODER", "GAMES"];

function pickSecretWord(){
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


document.addEventListener("keydown", (e) => {
  if(gameOver) return;
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
  if(key === "Enter"){
  if (currentbox === rowEnd(currentRow)){
    checkGuess();
  
  if(!gameOver){
    currentRow++;
    currentGuess = [];
    currentbox = rowStart(currentRow);
    }
  }
  return;
  }
  if (currentbox >= rowEnd(currentRow)){ 
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

function checkWin(){
  if(currentGuess.join("") === secretWord.join("")){
    gameOver = true;
    // alert("You win!");
  }
}

function checkLose(){
  if(currentRow === rows && !gameOver){
    gameOver = true;
    alert("You lost! The word was" + secretWord.join(""));
  }
}

function checkGuess(){
  for(let i = 0; i < secretWord.length; i++){
    const boxIndex = rowStart(currentRow) + i;
    const box = boxes[boxIndex];

    const letter = currentGuess[i];

    if(letter === secretWord[i]){
      box.classList.add("correct");
    } else if(secretWord.includes(letter)){
      box.classList.add("inword");
    }else{
      box.classList.add("wrong");
    }
  }
  checkWin();
  if(!gameOver && currentRow === rows)
    checkLose();
}
console.log(currentGuess);
