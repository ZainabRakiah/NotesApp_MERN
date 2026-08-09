# MERN Notes App

A beginner-friendly notes application built with the **MERN stack** that demonstrates **CRUD operations**, **user authentication**, and **JWT tokens**.

## What is MERN?

| Letter | Technology | Role |
|--------|-----------|------|
| **M** | MongoDB | Database — stores users and notes |
| **E** | Express.js | Backend framework — handles API routes |
| **R** | React | Frontend — user interface |
| **N** | Node.js | Runtime — runs the backend server |

## Features

- User **Signup** and **Login** with password hashing (bcrypt)
- **JWT** (JSON Web Token) authentication
- Full **CRUD** for notes (Create, Read, Update, Delete)
- Each user can only see and manage their own notes
- Clean, commented code for learning

---

## Project Structure

```
Notes_MERN/
├── backend/                    # Node.js + Express API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   ├── User.js            # User schema (name, email, password)
│   │   └── Note.js            # Note schema (title, content, user ref)
│   ├── routes/
│   │   ├── authRoutes.js      # POST /signup, POST /login, GET /me
│   │   └── noteRoutes.js      # CRUD routes for notes
│   ├── server.js              # Entry point
│   └── .env                   # Environment variables (secrets)
│
└── frontend/                   # React app (Vite)
    └── src/
        ├── api.js             # All HTTP requests to backend
        ├── context/
        │   └── AuthContext.jsx # Shared auth state (user, token)
        └── components/
            ├── Login.jsx
            ├── Signup.jsx
            ├── Notes.jsx       # CRUD demo page
            ├── NoteForm.jsx
            └── ProtectedRoute.jsx
```

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally  
  OR a free [MongoDB Atlas](https://www.mongodb.com/atlas) cloud cluster

### 1. Clone / Open the project

```bash
cd Notes_MERN
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes_app
JWT_SECRET=your_super_secret_key_change_this
```

Start the backend:

```bash
npm run dev
```

You should see: `Server running on port 5000` and `MongoDB Connected`.

### 3. Set up the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How Authentication Works (JWT Flow)

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  React   │         │  Express │         │ MongoDB  │
│ Frontend │         │  Backend │         │ Database │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │
     │  POST /signup      │                    │
     │  {email, password} │                    │
     │───────────────────>│                    │
     │                    │  Hash password     │
     │                    │  Save user         │
     │                    │───────────────────>│
     │                    │                    │
     │                    │  Create JWT token  │
     │  { user, token }   │                    │
     │<───────────────────│                    │
     │                    │                    │
     │  Store token in    │                    │
     │  localStorage      │                    │
     │                    │                    │
     │  GET /api/notes    │                    │
     │  Authorization:    │                    │
     │  Bearer <token>    │                    │
     │───────────────────>│                    │
     │                    │  Verify JWT        │
     │                    │  Find user's notes │
     │                    │───────────────────>│
     │  [notes array]     │                    │
     │<───────────────────│                    │
```

### Key Concepts

1. **Password Hashing** — Passwords are never stored as plain text. bcrypt adds a "salt" and hashes the password before saving.

2. **JWT Token** — After login, the server creates a signed token containing the user's ID. The client sends this token with every request.

3. **Middleware** — The `protect` middleware runs before note routes. It checks the JWT and attaches the user to the request.

4. **localStorage** — The browser stores the token so the user stays logged in after refreshing the page.

---

## CRUD Operations Explained

| Operation | What you do in the app | HTTP Method | API Endpoint |
|-----------|----------------------|-------------|--------------|
| **Create** | Fill form → "Add Note" | `POST` | `/api/notes` |
| **Read** | Page loads → notes appear | `GET` | `/api/notes` |
| **Update** | Click "Edit" → change → "Update" | `PUT` | `/api/notes/:id` |
| **Delete** | Click "Delete" → confirm | `DELETE` | `/api/notes/:id` |

### Where to find the code

- **Backend CRUD**: `backend/routes/noteRoutes.js`
- **Frontend CRUD**: `frontend/src/components/Notes.jsx`
- **API calls**: `frontend/src/api.js`

---

## API Reference

### Auth Routes (no token needed)

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/auth/signup` | `{ name, email, password }` | `{ _id, name, email, token }` |
| POST | `/api/auth/login` | `{ email, password }` | `{ _id, name, email, token }` |
| GET | `/api/auth/me` | — (needs token) | `{ _id, name, email }` |

### Note Routes (token required)

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/notes` | `{ title, content }` | Created note object |
| GET | `/api/notes` | — | Array of notes |
| GET | `/api/notes/:id` | — | Single note |
| PUT | `/api/notes/:id` | `{ title, content }` | Updated note |
| DELETE | `/api/notes/:id` | — | `{ message: "Note deleted" }` |

---

## Learning Path

Read the files in this order to understand the full flow:

1. `backend/models/User.js` — What data looks like in MongoDB
2. `backend/routes/authRoutes.js` — Signup, login, JWT creation
3. `backend/middleware/auth.js` — How JWT protects routes
4. `backend/routes/noteRoutes.js` — CRUD operations
5. `frontend/src/context/AuthContext.jsx` — Managing login state in React
6. `frontend/src/api.js` — How frontend talks to backend
7. `frontend/src/components/Notes.jsx` — CRUD in the UI

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `MongoDB connection error` | Make sure MongoDB is running: `mongod` or check Atlas connection string |
| `CORS error` | Backend must be running on port 5000 |
| `401 Unauthorized` | Token expired or missing — log out and log back in |
| `Port already in use` | Change `PORT` in `.env` or kill the process using that port |

---

Happy learning!
