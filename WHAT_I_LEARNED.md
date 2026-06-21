# What I Learned While Building Calorie Tracker

## Project Overview

This project started as a simple calorie calculator using a hardcoded JavaScript object and evolved into a full-stack application using:

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* USDA FoodData Central API
* Git & GitHub

---

# 1. DOM Selection and Dynamic Elements

## Problem

I initially used:

```javascript
const foodInputs = document.querySelectorAll('.food-items');
```

outside the Calculate button event listener.

New rows added dynamically were not included.

## Why It Happened

`querySelectorAll()` only selects elements that exist when the code runs.

New elements created later are not included in the original NodeList.

## Fix

Move the query inside the Calculate button event listener.

```javascript
const foodInputs = document.querySelectorAll('.food-items');
```

This creates a fresh NodeList every time Calculate is clicked.

## Lesson

Always re-query dynamic elements when their count can change.

---

# 2. forEach vs for Loop

## Problem

Validation errors were not stopping the calorie calculation.

I used:

```javascript
foodInputs.forEach(...)
```

and attempted to stop execution using:

```javascript
return;
```

## Why It Happened

`return` only exits the current callback execution.

It does not stop the entire `forEach()` loop.

## Fix

Replace `forEach()` with a traditional `for` loop.

```javascript
for(let i = 0; i < foodInputs.length; i++) {
}
```

## Lesson

Use a normal `for` loop when you need:

* `return`
* `break`
* Early termination

---

# 3. Dynamic Add and Remove Rows

## Problem

Remove buttons behaved unpredictably.

## Why It Happened

Event listeners were repeatedly attached to all buttons whenever a new row was added.

This caused duplicate listeners.

## Fix

Use closures.

Attach the remove event directly to the newly created button.

```javascript
removeBtn.addEventListener('click', () => {
    newInputContainer.remove();
});
```

## Lesson

Closures can directly connect a button with its parent element without tracking indexes.

---

# 4. Backend Development with Express

## Learned

Creating a basic Express server.

```javascript
const express = require('express');
const app = express();
```

Creating routes.

```javascript
app.get('/api/food/:foodName', ...)
```

Reading URL parameters.

```javascript
req.params.foodName
```

Sending JSON responses.

```javascript
res.json(...)
```

---

# 5. API Integration

## First Attempt

Edamam Food Database API.

## Problem

Received:

```text
Unexpected token '<'
```

## Investigation

Printed:

```javascript
response.status
response.headers
response.text()
```

Found:

```text
401 Unauthorized
```

## Root Cause

I mistakenly created credentials for the Meal Planner API but was using Food Database endpoints.

## Lesson

Authentication issues often appear as HTML error pages instead of JSON.

---

# 6. Reading API Responses

## Learned

Never assume the response format.

Inspect the response first.

```javascript
console.log(JSON.stringify(data, null, 2));
```

Then write extraction logic.

---

# 7. USDA FoodData Central API

## Learned

Searching foods using:

```javascript
https://api.nal.usda.gov/fdc/v1/foods/search
```

Reading:

```javascript
data.foods
```

Extracting nutrients from:

```javascript
foodNutrients
```

Finding calories:

```javascript
nutrients.find(...)
```

---

# 8. Frontend ↔ Backend Communication

## Learned

Using Fetch API.

```javascript
const response = await fetch(...)
```

Parsing JSON.

```javascript
const data = await response.json();
```

Displaying results on the page.

---

# 9. Async / Await

## Learned

Functions using `await` must be marked as:

```javascript
async
```

Example:

```javascript
submitbtn.addEventListener('click', async () => {
});
```

---

# 10. CORS

## Problem

Browser blocked requests.

Error:

```text
Blocked by CORS policy
```

## Fix

Install CORS package.

```bash
npm install cors
```

Enable it.

```javascript
app.use(cors());
```

## Lesson

Browsers block requests between different origins unless permission is granted.

---

# 11. Port Conflicts

## Problem

Frontend and backend were both using:

```text
localhost:3000
```

## Result

Requests were reaching the wrong server.

## Fix

Move backend to:

```javascript
const PORT = 5000;
```

## Lesson

Two servers cannot share the same port.

---

# 12. Git and GitHub

## Learned

Commit:

* index.js
* package.json
* package-lock.json
* .gitignore

Do NOT commit:

* node_modules
* .env

Use:

```gitignore
node_modules/
.env
```

---

# 13. Try-Catch

## Learned

Purpose:

Handle unexpected runtime errors.

```javascript
try {
}
catch(error) {
}
```

Use for:

* API requests
* Database operations
* File operations
* Network failures

Do NOT use it as a replacement for validation.

Use `if` statements for expected user mistakes.

---

# 14. Debugging Process

Most important lesson from this project:

Do not guess.

Investigate.

Process followed:

1. Read error.
2. Log data.
3. Inspect response.
4. Verify assumptions.
5. Identify root cause.
6. Fix one issue at a time.

This approach solved:

* API authentication errors
* JSON parsing errors
* Dynamic DOM issues
* CORS problems
* Port conflicts
* Response handling bugs

---

# Skills I Practiced

* DOM Manipulation
* Dynamic Elements
* Event Handling
* Async/Await
* Fetch API
* Express.js
* REST APIs
* JSON Handling
* API Debugging
* Error Handling
* CORS
* Git Basics
* GitHub Workflow
* Full Stack Communication
* Problem Solving & Debugging

---

# Next Goals

Version 1.1

* Local Storage
* Meal History
* Daily Tracking

Version 1.2

* Database Integration
* User Accounts

Version 2.0

* Deployment
* Public Portfolio Project
* Production Ready Application