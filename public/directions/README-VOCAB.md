# README — VOCAB (Wordle Coding Glossary)

This is your **Wordle Project Dictionary**.

If you ever feel stuck while reading the other READMEs, come back here.

This glossary explains coding terms in normal human language — not textbook language.

---

# 🧱 The Big Three

## HTML
**What it is:** The structure of a webpage.

Think of it like the **bones of a body**.

It defines:
- headings
- containers
- buttons
- text areas

Example:
```html
<div class="game"></div>
````

That creates a box on the page.

---

## CSS

**What it is:** The styling of a webpage.

Think of it like the **clothes and appearance**.

It controls:

* colors
* spacing
* borders
* animations
* layout

Example:

```css
.box {
  border: 2px solid #d3d6da;
}
```

That gives each tile a border.

---

## JavaScript (JS)

**What it is:** The behavior of a webpage.

Think of it like the **brain and nervous system**.

It handles:

* typing
* checking guesses
* moving rows
* resetting the game

Example:

```js
document.addEventListener("keydown", ...)
```

That listens for keyboard input.

---

# 🌳 The DOM

## DOM (Document Object Model)

The webpage as JavaScript sees it.

When you use:

```js
document.querySelector(".game")
```

You are saying:

> “Find this element in the DOM.”

JS can:

* change text
* add classes
* remove elements
* create new elements

---

## Element

A single piece of HTML.

Examples:

* `<div>`
* `<h1>`
* `<button>`

Each tile in Wordle is an element.

---

## Class

A label attached to an element.

Example:

```html
<div class="box"></div>
```

Classes are used by:

* CSS (to style)
* JS (to find and change)

---

# 🔁 Logic & Control

## Variable

A named container that stores data.

Example:

```js
let currentRow = 1;
```

It can change.

---

## Constant

A variable that cannot change.

Example:

```js
const rows = 6;
```

We use `const` when we don’t want the value reassigned.

---

## State

The data your program is currently remembering.

In Wordle, state includes:

* currentRow
* currentBox
* currentGuess
* gameOver

State changes while the game runs.

---

## Boolean

A value that is either:

* `true`
* `false`

Example:

```js
let gameOver = false;
```

---

## Condition (if statement)

A decision.

Example:

```js
if (letter === secretWord[i]) {
  // do something
}
```

It asks:

> “Is this true?”

---

## Loop

Repeats code.

Example:

```js
for (let i = 0; i < 5; i++)
```

That runs 5 times.

We used this to:

* create 30 tiles
* check 5 letters

---

## Guard Clause

An early return that protects logic.

Example:

```js
if (gameOver) return;
```

It prevents the rest of the function from running.

---

# 🧠 Arrays & Data

## Array

A list of values.

Example:

```js
["C", "R", "A", "N", "E"]
```

We use arrays for:

* WORDS list
* secretWord
* currentGuess

---

## Index

The position of something in an array.

Indexes start at **0**, not 1.

Example:

```js
secretWord[0]
```

That’s the first letter.

---

## .includes()

Checks if an array contains something.

Example:

```js
secretWord.includes(letter)
```

---

## .split("")

Turns a string into an array.

Example:

```js
"CRANE".split("")
```

Becomes:

```js
["C","R","A","N","E"]
```

---

## .join("")

Turns an array back into a string.

Example:

```js
currentGuess.join("")
```

---

# 🎮 Events & Interaction

## Event

Something that happens.

Examples:

* key press
* mouse click
* hover

---

## Event Listener

Code that waits for an event.

Example:

```js
document.addEventListener("keydown", ...)
```

It says:

> “When a key is pressed, run this code.”

---

## e.key

The actual key pressed.

If you press:

* A → `"a"`
* Enter → `"Enter"`
* Backspace → `"Backspace"`

---

# 🎨 Styling & Classes

## classList

A property that lets you modify classes.

Example:

```js
box.classList.add("correct");
```

---

## classList.add()

Adds a class.

---

## classList.remove()

Removes a class.

---

## CSS Grid

A layout system.

We used:

```css
display: grid;
grid-template-columns: repeat(5, 60px);
```

To build the board layout.

---

# 🔄 Reset & Flow

## Function

Reusable block of code.

Example:

```js
function resetGame() { ... }
```

---

## Reset State

Returning variables to original values.

Example:

```js
currentRow = 1;
currentGuess = [];
gameOver = false;
```

---

## UI (User Interface)

What the user sees and interacts with.

* The board
* The tiles
* The message box
* The restart button

---

# 🧩 How It All Connects

When you press a key:

1. The event listener fires.
2. JavaScript updates state.
3. JavaScript updates the DOM.
4. CSS automatically styles based on classes.
5. The screen updates.

That loop happens constantly.

That’s interactive programming.

---

# 🚀 Final Thought

If you understand:

* variables
* loops
* conditions
* arrays
* event listeners
* DOM manipulation

You understand the foundation of:

* Web development
* Game development
* React
* Mobile apps
* Interactive dashboards

You didn’t just learn Wordle.

You learned how interactive systems work.

```