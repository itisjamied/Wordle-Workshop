
# README 03 — Win • Lose • Restart 

**Goal for today:**  
By the end of this, your Wordle game will:

✅ Show a clean win message (no more alert popups)  
✅ Show a clean lose message (and reveal the word)  
✅ Freeze the board when the game ends  
✅ Fully reset with a restart button  
✅ Feel polished and complete  


We’re mostly upgrading the **user experience** and cleaning things up.

# Vocabulary (New Today)

* **UI (User Interface)** — What the user sees and interacts with
* **Guard clause** — Early return that protects logic
* **Reset state** — Returning variables to original values
* **Reusable function** — A function built to be called multiple times
* **Class toggle** — Adding/removing CSS classes dynamically

---

<details>
  <summary><h1> 🗣️ Step 1 — Add a Message Area (HTML)</h1></summary>

Open `index.html`.

Add this under your `.game` container:

```html
<div class="message hidden"></div>

<div class="button" onclick="resetGame()">RESTART</div>
````
---
</details>

<details>

<summary><h1> 🎨 Step 2 — Style the Message + Button (CSS)</h1></summary>


Open `style.css`.

Add:

```css
 /* WIN SCREEN */
.message {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--white);
    font-size: 2rem;
    text-align: center;
}

.hidden {
  display: none;
}

 /* RESET BUTTON */
.button {
    color:var(--gray);
    margin-top: 20px;
    cursor: pointer;
}

.button:hover {
    color: var(--white);
}
```

---

## What This Does

* `.hidden` lets us show/hide things cleanly
* `.button:hover` adds interaction feedback
* `cursor: pointer` makes it feel clickable

We don’t hide or show with inline styles. We toggle classes.

---
</details>

<details>
<summary><h1>‼️ Step 3 — Replace alert() With Message Functions (JS)</h1></summary>

Open `script.js`.

First grab the message element from the `DOM`:

```js
const message = document.querySelector(".message");
```

Now create two helper functions:

```js
function showMessage(text) {
  message.textContent = text;
  message.classList.remove("hidden");
}

function hideMessage() {
  message.textContent = "";
  message.classList.add("hidden");
}
```

---
</details>

<details>
<summary><h1> 🙌 Step 4 — Update Win Logic</h1></summary>



Replace your `alert("You win!")` with:

```js
function checkWin() {
  if (currentGuess.join("") === secretWord.join("")) {
    gameOver = true;
    showMessage("🎉 You win!");
  }
}
```

---

</details>

<details>
<summary><h1> 👎 Step 5 — Update Lose Logic</h1></summary>


Replace your lose alert with:

```js
function checkLost() {
  if (currentRow === rows && !gameOver) {
    gameOver = true;
    showMessage("You lost! The word was " + secretWord.join(""));
  }
}
```
---

</details>

<details>
<summary><h1> 🛑 Step 6 — Make Sure Typing Stops After Game Ends</h1></summary>

At the very top of your keydown listener, confirm you have:

```js
if (gameOver) return;
```

This is called a **guard clause**.

This prevents: Extra letters, Extra submits, or Weird state bugs

---
</details>


<details>
<summary><h1> 🔨 Step 7 — Build resetGame()</h1></summary>
This is the most important part today.

Add this near the other game logic 

```js
function resetGame() {
  // Reset game state
  currentRow = 1;
  currentBox = 0;
  currentGuess = [];
  gameOver = false;

  // Pick new word
  secretWord = pickSecretWord();

  // Clear tiles
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("correct", "inword", "wrong");
  });

  // Hide message
  hideMessage();
}
```

---

## What resetGame() Does

It resets **three categories**:

### 1️⃣ Game State

* position
* guess array
* gameOver flag

### 2️⃣ Secret Word

* picks a fresh word

### 3️⃣ UI

* clears letters
* removes color classes
* hides message

If you miss one of these? The game will probably behave weirdly.
</details>

<details>
<summary><h1> 🎉 Final Checkpoint — Your Game Is Complete </h1></summary>



Your Wordle now:

✅ Builds the board
✅ Accepts typing
✅ Limits rows
✅ Checks guesses
✅ Colors tiles
✅ Detects win
✅ Detects loss
✅ Shows messages
✅ Restarts cleanly

You built a full interactive browser game.

That’s not beginner-level anymore.



---

# You Just Built

* DOM manipulation
* Game state management
* Event-driven input
* Conditional logic
* UI feedback
* Reset systems


---
</details>