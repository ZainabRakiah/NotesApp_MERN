/**
 * SERVER ENTRY POINT
 * ------------------
 * This file starts the Express server and connects everything together.
 *
 * Express = web framework for Node.js
 * It handles HTTP requests and routes them to the right handler.
 */

require("dotenv").config(); // Load variables from .env file
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// MIDDLEWARE
// cors: allows React frontend (different port) to call this API
app.use(cors());

// express.json(): parses incoming JSON request bodies
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Simple health check route
app.get("/", (req, res) => {
  res.json({ message: "Notes API is running!" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
