const gameContainer = document.querySelector(".game");
const rows = 6;
const columns = 5;
function createBoard() {
    for (let i = 0; i < rows * columns; i++) {
    const box = document.createElement("div");
    box.className = "box";
    gameContainer.appendChild(box);
  }
}