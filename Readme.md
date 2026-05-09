# 🗳️ Poll App (WhatsApp-style Voting UI)

A full-stack poll application with a modern UI inspired by WhatsApp polls. Users can create polls, vote, view percentage-based results, and interact with a clean, responsive interface.

---

## 🚀 Features

### 🧠 Core Functionality

* Create polls with minimum 2 and maximum 4 options
* Vote on polls with instant result updates
* Percentage-based results with animated green bars
* View total votes per option and poll
* Change vote selection (frontend-controlled)

---

### 🔐 Authentication
* User Login functionality
* Session persistence using localStorage
* Login-first workflow before accessing poll system
* Logout functionality

---

### 🌙 Theme Support
* Dark Mode / Light Mode toggle
* Theme persistence using localStorage
* Dynamic UI switching without refresh

---

### 🎯 UX Enhancements

* WhatsApp-style **progress bar UI**
* **Selected option highlight**
* Smooth animations and transitions
* Dynamic add/remove options
* Default 2 options on load

---

### ⚠️ Validations

* Prevent empty question
* Enforce **min/max options (2–4)**
* Detect **duplicate options (case-insensitive)**
* Snackbar-based error messages (no alerts)

---

### 🔔 Snackbar Notifications

* Clean, non-intrusive error handling
* Appears for:

  * Invalid inputs
  * Duplicate options
  * Max option limit reached

---

### 🏗️ Project Structure

---
project/
│
├── backend/
│   ├── controller/
│   │   ├── authController.js
│   │   └── pollController.js
│   │
│   ├── service/
│   │   ├── authService.js
│   │   └── pollService.js
│   │
│   ├── models/
│   │   └── pollModel.js
│   │
│   ├── data/
│   │   └── db.js
│   │
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
└── README.md
---

## ⚙️ Tech Stack

### Frontend

* HTML5
* CSS3 (Flexbox, animations)
* Vanilla JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Storage

* In-memory database (for simplicity)

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd poll-app
```

### 2. Setup Backend

```bash
cd backend
npm install
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

### 3. Run Frontend

Open:

```
frontend/index.html
```

Or use **Live Server (recommended)** in VS Code.

---

## 📸 UI Behavior

* Click an option → vote is recorded
* Results update instantly:

  * Percentage shown
  * Green bar fills dynamically
* Selected option is highlighted
* Vote count displayed (for selected option)

---

## ⚠️ Known Limitations

* Votes stored in **memory (lost on restart)**
* Vote tracking handled via **localStorage (frontend only)**
* Vote switching does not update backend counts correctly
* No authentication / user identity

---

## 💡 Key Learning Highlights

* Implemented **layered architecture** (Controller → Service → Model)
* Built dynamic UI with **state-driven rendering**
* Handled edge cases like **duplicate detection & validation**
* Designed a **responsive, modern UI with animations**

## ⭐ If you like this project

Give it a ⭐ and feel free to improve it!
