const gameContainer = document.querySelector(".game");
const rows = 6;
const columns = 5;
function createBoard() {
    for (let i = 0; i < rows * columns; i++) {
        const box = document.createElemnet("div");
        box.className = "box";
        gameContainer.appendChild(box);
    }
}
createBoard();
const boxes = document.querySelectorAll(".box");
 let currentBox = 0;
 let currentBox2 = 1;
 let currentGuess= []

 functionrowStart(row) {
    return columns * (row - 1);
 }

 function rowEnd(row) {
    return columns * row;

 }

 document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (currentBox >= rowEnd(CurrentRow)) return;

    if (key.length === 1 && key.match(/[a-z]/i)) {
        boxes[currentBox].innerHTML = '<span class="letter">' + key.toUpperCase() + "</span>";
        currentGuess = [...currentGuess,key.toUpperCase()];
        currentBox++;
    }
    });

    document.addEventListener("keydown", (e) => {
        const key = e.key;

        if (key === "Backspace") {
            if (currentBox > rowStart(currentRow)) {
                currentBox--;
                boxes[currentBox].textContent = "";
                currentGuess.pop
            }
            reuturn;
        }

        if(currentBox >= rowEnd(currentRow)) return;

        if(key.length === 1 && key.match(/[a-z]/i)) {
            boxes[currentBox].innerHTML = '<span class="letter">' + key.toUpperCase() 
        }