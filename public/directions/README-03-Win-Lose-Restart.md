
# README 03 — Win • Lose • Restart (Make It Feel Complete)

**Goal for today:**  
By the end of this lesson, your Wordle game will:

✅ Show a clean win message (no more alert popups)  
✅ Show a clean lose message (and reveal the word)  
✅ Freeze the board when the game ends  
✅ Fully reset with a restart button  
✅ Feel polished and complete  

Yesterday we built:
- secret word logic  
- Enter to submit  
- color feedback  
- win + lose detection  

Today we’re upgrading the **user experience** and cleaning things up.

---

# Big Idea Today

Right now your game works.

But it doesn’t feel finished.

Professional apps:
- Don’t use `alert()`
- Don’t reload the page
- Don’t leave weird leftover state

Today we’ll:
- Add a message area
- Replace alerts
- Build a real reset system

---

# Step 1 — Add a Message Area (HTML)

Open `index.html`.

Add this under your `.game` container:

```html
<div class="message hidden"></div>

<div class="button" onclick="resetGame()">RESTART</div>
````

---

## Why This Is Better Than `alert()`

`alert()`:

* Blocks the page
* Looks old-school
* Feels disconnected

A message div:

* Is part of your layout
* Can be styled
* Can animate
* Feels modern

---

# Step 2 — Style the Message + Button (CSS)

Open `style.css`.

Add:

```css
.message {
  margin-top: 20px;
  padding: 12px 20px;
  font-weight: bold;
  border-radius: 6px;
  background: #222;
  color: white;
}

.hidden {
  display: none;
}

.button {
  margin-top: 15px;
  padding: 10px 16px;
  border: 2px solid black;
  cursor: pointer;
  font-weight: bold;
  user-select: none;
}

.button:hover {
  background: black;
  color: white;
}
```

---

## What This Does

* `.hidden` lets us show/hide things cleanly
* `.button:hover` adds interaction feedback
* `cursor: pointer` makes it feel clickable

We don’t hide or show with inline styles.
We toggle classes.

That’s cleaner.

---

# Step 3 — Replace alert() With Message Functions (JS)

Open `script.js`.

First grab the message element:

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

## Why Use Functions?

Instead of repeating:

```js
message.textContent = "You win!";
message.classList.remove("hidden");
```

everywhere, we create reusable logic.

That’s cleaner and more readable.

---

# Step 4 — Update Win Logic

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

# Step 5 — Update Lose Logic

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

## Why This Is Cleaner

* UI logic stays inside UI functions
* Game logic stays inside game functions
* The board doesn’t freeze because of an alert
* Everything feels integrated

---

# Step 6 — Make Sure Typing Stops After Game Ends

At the very top of your keydown listener, confirm you have:

```js
if (gameOver) return;
```

This is called a **guard clause**.

It prevents:

* Extra letters
* Extra submits
* Weird state bugs

Professional code protects itself.

---

# Step 7 — Build resetGame()

This is the most important part today.

Add:

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

If you miss one of these?
The game will behave weirdly.

Resetting means restoring everything to its original condition.

---

# Step 8 — Why This Structure Is Professional

Notice what we did:

We separated:

* Game state
* UI logic
* Board logic

We didn’t:

* Reload the page
* Rebuild the board
* Duplicate code

We reused what already exists.

That’s how real apps scale.

---

# 🎉 Final Checkpoint — Your Game Is Complete

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

# Optional Polish (For Students Who Finish Early)

## 1) Add Animation When Showing Message

```css
.message {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 2) Add a Shake Effect for Invalid Enter

If Enter is pressed without 5 letters:

```js
if (key === "Enter") {
  if (currentBox !== rowEnd(currentRow)) {
    showMessage("Not enough letters!");
    return;
  }
}
```

---

## 3) Add a “Play Again” Auto-Focus

Scroll the board into view:

```js
gameContainer.scrollIntoView({ behavior: "smooth" });
```

---

# Vocabulary (New Today)

* **UI (User Interface)** — What the user sees and interacts with
* **Guard clause** — Early return that protects logic
* **Reset state** — Returning variables to original values
* **Reusable function** — A function built to be called multiple times
* **Class toggle** — Adding/removing CSS classes dynamically

---

# You Just Built

* DOM manipulation
* Game state management
* Event-driven input
* Conditional logic
* UI feedback
* Reset systems

This is the foundation of:

* React apps
* Mobile apps
* Web games
* Interactive dashboards

You didn’t just “follow a tutorial.”

You built a system.

---

# Next Level Ideas (If You Want a README 04)

* On-screen keyboard
* Word validation dictionary API
* Hard mode
* Score tracking
* Dark mode toggle
* Animations per tile with delay

If you want, I can also create a **README-CHALLENGES.md** for advanced students.

```