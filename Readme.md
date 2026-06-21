# Calorie Tracker Web

A full-stack calorie tracking application that allows users to search food items, calculate calories for multiple entries, and view a detailed calorie breakdown.

## Live Demo

Frontend:

* https://parasyte23.github.io/calorie-tracker-web/

Backend:

* https://calorie-tracker-web-acu7.onrender.com/

---

## Features

### User Features

* Add multiple food items dynamically
* Remove food rows
* Calculate total calories
* View calorie breakdown for each item
* Keyboard support (Enter key)
* Responsive design

### Backend Features

* Express.js REST API
* USDA FoodData Central integration
* Dynamic food search
* JSON API responses
* Error handling
* CORS support
* Environment variable support

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js
* CORS
* Dotenv

### External APIs

* USDA FoodData Central API

### Deployment

* GitHub Pages (Frontend)
* Render (Backend)

---

## Project Architecture

User Input
↓
Frontend (GitHub Pages)
↓
Fetch API
↓
Express Backend (Render)
↓
USDA FoodData API
↓
JSON Response
↓
Frontend UI Update

---

## What I Learned

* DOM Manipulation
* Dynamic Element Creation
* Event Handling
* Async / Await
* Fetch API
* Express.js Basics
* REST API Fundamentals
* API Integration
* Environment Variables
* CORS Configuration
* Git & GitHub Workflow
* Deployment using Render
* Debugging API and Network Issues

---

## Challenges Solved

### API Authentication Errors

* Diagnosed 401 Unauthorized responses
* Switched from Edamam to USDA FoodData Central

### CORS Issues

* Configured Express middleware using CORS

### Port Conflicts

* Separated frontend and backend ports during development

### Dynamic Form Handling

* Implemented add/remove row functionality
* Managed dynamically created DOM elements

---

## Future Improvements

* Save meal history using Local Storage
* Add daily calorie tracking
* Add user authentication
* Add database support
* Add nutrition information beyond calories
* Build a React version

---

## Version History

### Version 1.0

* Multiple food entry support
* USDA API integration
* Express backend
* GitHub Pages deployment
* Render backend deployment
* Error handling improvements

---

## Author

Chetan
