const gameContainer =
document.querySelector("game");


// Board Size:
const rows = 6;
const columns = 5;



//Build Board
function createBoard() {
    //Create Rows * Column Tiles
    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElement("div");
        box.className = "box";
        gameContainer.appendChild(box);
    }
}
createBoard();

let currentBox = 0;
let currentRow = 1;
let currentGuess = []


const boxes =
document.querySelectorAll(".box");

for (intiliazer; condition; update)

or
for (let i = 0; i < rows * columns; i++) {
    
}

function rowStart(row) {
    return columns * (row - 1);
}

