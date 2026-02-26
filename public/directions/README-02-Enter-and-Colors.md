# README 02 — Enter + Colors

**Goal for today:**  
By the end of this lesson, your game will:

✅ Pick a secret word  
✅ Let players press **Enter** to submit a guess  
✅ Turn tiles **green, yellow, or gray**  
✅ Move to the next row after a guess  

---

# Big Idea for Today

Right now your game lets people type.

But it doesn’t really *care* what they typed.

Today we'll figure out how to:
1. Remember a secret word  
2. Compare guesses to that word  
3. Give visual feedback  

## Vocabulary

* **Array** — A list of values
* **Math.random()** — Generates random numbers
* **Condition** — An `if` statement
* **includes()** — Checks if something exists in an array
* **classList.add()** — Adds a CSS class to an element
* **Guard clause** — Early return that protects logic
* **Boolean** — true or false value


---

<details>
<summary><h1>🕵️‍♀️ Step 1 — Add a Secret Word (JS)</h1></summary>

Open `script.js`.

We need a word the player is trying to guess.

Add this near your constants up top, right under `const rows = ` and `const columns = `;

```js
const WORDS = ["CRANE", "PLANT", "MOUSE", "TRAIN", "LIGHT"];
````

Now create a function to pick one randomly: place under `createBoard();` function

```js
function pickSecretWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].split("");
}
```

* `Math.random()` gives a number between 0 and 1.
* `Math.random() * WORDS.length` scales it to the size of the list.
* `Math.floor()` removes decimals.
* `WORDS` is the **array** (a list) we just made.
* `.split("")` turns `"CRANE"` into:


Then create the actual secret word, place with ur other game state `let` variables

```js
let secretWord = pickSecretWord();
```

`secretWord` might return something like 

``` js
  ["C","R","A","N","E"]
```


We split it up because comparing letter-by-letter is easier when it’s an array.


---
</details>

<details>
<summary><h1> 🆒 Step 2 — Enter to Submit a Guess</h1></summary>

Right now your `keydown` listener handles:

* letters
* backspace

Now we need to add **Enter behavior**.

Inside your event listener, add this BEFORE the letter logic:

```js
// ENTER: check  your guess
if (key === "Enter") {
  // Only allow Enter if row is full
  if (currentBox === rowEnd(currentRow)) {
    checkGuess();

    // Move to next row if game isn’t over
    if (!gameOver) {
      currentRow++;
      currentGuess = [];
      currentBox = rowStart(currentRow);
    }
  }

  return;
}
```

---

## Why This Works

We only allow Enter when:

```
currentBox === rowEnd(currentRow)
```

That means:

* You’ve typed exactly 5 letters
* You’re at the end of the row

Then:

* `checkGuess()` runs
* If the game isn’t over, we move to the next row

This prevents:

* Submitting incomplete guesses
* Jumping rows too early

---
</details>
<details>
<summary><h1> ✅ Step 3 — Create checkGuess()</h1></summary>


Now we build the core logic of Wordle.

Add this function below your helpers:

```js
/********************
Game logic
 ********************/
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
```

---

# Let's break this function down

We save where the start of the row is in `start`
``` js
const start = rowStart(currentRow);
```

We loop through each letter in the guess using another for-loop, similar to what we did to generate the boxes

``` js
for (let i = 0; i < columns; i++)
```

For each position we....

check / save the box we're in 
```js
const box = boxes[start + i];
```
check / save what letter is it
``` js
 const letter = currentGuess[i];
```

## There are 3  possibilities:

### 1️⃣ Green (correct position)
```
letter === secretWord[i]
```
Same letter, same position.

### 2️⃣ Yellow (in word, wrong spot)
```
secretWord.includes(letter)
```
Letter exists somewhere in the word.

### 3️⃣ Gray (not in word)

Otherwise, it's wrong


## So our function looks something like this and we will handle the color chnaging / styles in css
```js
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
```





---
</details>
<details>
<summary><h1> 🎨 Step 4 — Add Color Styles (CSS) </h1></summary>

Open `style.css`.

Add:

```css

/* comomon styles for all states of box */
.box.wrong, .box.correct, .box.inword {
    color: var(--white);
}
/* boxes styled based on state */
.box.wrong {
    background-color: var(--gray);
    border-color: var(--gray);
}

.box.correct {
    background-color: var(--green);
    border-color: var(--green);
}

.box.inword {
    background-color: var(--yellow);
    border-color: var(--yellow);
}
```

---

## Clean Code

In practice it's good to seprate logic from design

JavaScript decides: > “What happened?”

CSS decides: > “What does that look like?”

---
</details>
<details>
<summary><h1> 🎉 Step 5 — Add Win Detection</h1></summary>


Now we detect if the player got all letters correct. 

!! MAKE SURE to place this above `checkGues()` since it's called in this function, it must be define before

Add:

```js
let gameOver = false;

function checkWin() {
  if (currentGuess.join("") === secretWord.join("")) {
    gameOver = true;
    alert("You win!");
  }
}
```

---

## Why `.join("")`?

Remember:

```
["C","R","A","N","E"]
```

is not the same as:

```
"CRANE"
```

`.join("")` turns the array back into a string.

---
</details>
<details>
<summary><h1> ❌ Step 6 — Add Lose Detectio</h1></summary>


Players only get 6 guesses.

!! MAKE SURE to place this above `checkGues()` since it's called in this function, it must be define before

Add:

```js
function checkLost() {
  if (currentRow === rows && !gameOver) {
    gameOver = true;
    alert("You lost! The word was " + secretWord.join(""));
  }
}
```

---
</details>

<details>
<summary><h1> 🛑 Step 7 — Stop Typing After Game Ends</h1></summary>

At the very top of your keydown listener, add:

```js
if (gameOver) return;
```

Now once someone wins or loses:

* The board freezes
* No extra typing

That’s called a **guard clause**.

It protects your logic.

---

# 🎉 Checkpoint — End of Day 2

Your game now:

✅ Picks a random word
✅ Submits guesses with Enter
✅ Colors tiles
✅ Detects win
✅ Detects loss
✅ Moves to next row

This is now a real playable Wordle.

---
</details>
<details>

<summary><h1> 🙃 Optional Upgrade — Add Flip Animation (Fun but Simple) </h1></summary>

In `style.css`, add:

```css
.box.wrong, .box.correct, .box.inword {
    color: var(--white);
    transition: 0.5s ease-in-out;  /* add these two lines */
    transform: rotatex(180deg); /* add these two lines */
}

/* flip letter back */
.box.correct,
.box.inword,
.box.wrong {
  transform: rotateX(360deg);
}
```

Now tiles animate when they change color.


---
</details>



###  (README 03 Preview)

Next we’ll add:

* A message area (instead of alert popups)
* A restart button
* A reset function
* Code cleanup + polish


