/********************
 DOM + constants
********************/

// 1) Get the game container from HTML
const gameContainer = document.querySelector(".game");

// 2) Define board size
const rows = 6;
const columns = 5;

/********************
 Build board
********************/

function createBoard() {
  // Create rows * columns tiles (6 * 5 = 30)
  for (let i = 0; i < rows * columns; i++) {
    const box = document.createElement("div");
    box.className = "box";
    gameContainer.appendChild(box);
  }
}

createBoard();