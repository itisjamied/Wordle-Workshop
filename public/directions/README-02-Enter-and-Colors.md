# README 02 — Enter + Colors (Now It Feels Like Wordle)

**Goal for today:**  
By the end of this lesson, your game will:

✅ Pick a secret word  
✅ Let players press **Enter** to submit a guess  
✅ Turn tiles **green, yellow, or gray**  
✅ Move to the next row after a guess  

Yesterday we built:
- the board
- typing
- backspace
- row limits

Today we’re adding **rules**.

---

# Big Idea for Today

Right now your game lets people type.

But it doesn’t *care* what they typed.

Today we teach it how to:
1. Remember a secret word  
2. Compare guesses to that word  
3. Give visual feedback  

We’ll move between:
- JavaScript (logic)
- CSS (colors)
- and small HTML hooks

---

# Step 1 — Add a Secret Word (JS)

Open `script.js`.

We need a word the player is trying to guess.

Add this near your constants:

```js
const WORDS = ["CRANE", "PLANT", "MOUSE", "TRAIN", "LIGHT"];
````

Now create a function to pick one randomly:

```js
function pickSecretWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex].split("");
}
```

Then create the actual secret word:

```js
let secretWord = pickSecretWord();
```

---

## What Just Happened (In Human Language)

* `WORDS` is an **array** (a list).
* `Math.random()` gives a number between 0 and 1.
* `Math.random() * WORDS.length` scales it to the size of the list.
* `Math.floor()` removes decimals.
* `.split("")` turns `"CRANE"` into:

  ```
  ["C","R","A","N","E"]
  ```

Why split?

Because comparing letter-by-letter is easier when it’s an array.

---

# Step 2 — Teach Enter to Submit a Guess

Right now your `keydown` listener handles:

* letters
* backspace

Now we add **Enter behavior**.

Inside your event listener, add this BEFORE the letter logic:

```js
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

# Step 3 — Create checkGuess()

Now we build the core logic of Wordle.

Add this function below your helpers:

```js
function checkGuess() {
  const start = rowStart(currentRow);

  for (let i = 0; i < columns; i++) {
    const box = boxes[start + i];
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
  checkLost();
}
```

---

# Slow Down — Understand This

This is the most important logic so far.

We loop through each letter in the guess:

```
for (let i = 0; i < columns; i++)
```

For each position:

* Compare the guessed letter
* Compare the secret letter
* Apply a CSS class

Three possibilities:

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

Otherwise.

We don’t change colors directly in JS.

We add a **class**.

CSS handles the visuals.

---

# Step 4 — Add Color Styles (CSS)

Open `style.css`.

Add:

```css
.box.correct {
  background-color: #6aaa64;
  border-color: #6aaa64;
  color: white;
}

.box.inword {
  background-color: #c9b458;
  border-color: #c9b458;
  color: white;
}

.box.wrong {
  background-color: #787c7e;
  border-color: #787c7e;
  color: white;
}
```

---

## Why This Is Clean Code

JavaScript decides:

> “What happened?”

CSS decides:

> “What does that look like?”

We separate logic from design.

That’s professional structure.

---

# Step 5 — Add Win Detection

Now we detect if the player got all letters correct.

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

# Step 6 — Add Lose Detection

Players only get 6 guesses.

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

## Why Check Order Matters

In `checkGuess()`:

```
checkWin();
checkLost();
```

We check win first.

Otherwise:

* On the last row,
* A correct guess would trigger both win AND lose.

Order matters.

---

# Step 7 — Stop Typing After Game Ends

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

# Optional Upgrade — Add Flip Animation (Fun but Simple)

In `style.css`, add:

```css
.box {
  transition: transform 0.2s ease;
}

.box.correct,
.box.inword,
.box.wrong {
  transform: rotateX(360deg);
}
```

Now tiles animate when they change color.

This makes the project feel way more real.

---

# “Try This” Mini Challenges

1. Add more words to the WORDS array.
2. Log the secret word in console while testing.
3. Make colors use CSS variables at the top of the file.
4. Add a delay between each tile flip using `setTimeout`.

---

# Tiny Vocabulary (Only New Words Today)

* **Array** — A list of values
* **Math.random()** — Generates random numbers
* **Condition** — An `if` statement
* **includes()** — Checks if something exists in an array
* **classList.add()** — Adds a CSS class to an element
* **Guard clause** — Early return that protects logic
* **Boolean** — true or false value

---

# Tomorrow (README 03 Preview)

Next we’ll add:

* A message area (instead of alert popups)
* A restart button
* A reset function
* Code cleanup + polish

You’re now officially building game logic like a real developer.

```

