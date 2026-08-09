/**
 * NOTE ROUTES - CRUD Operations
 * -----------------------------
 * All routes here are PROTECTED — user must send valid JWT.
 *
 * CRUD = Create, Read, Update, Delete
 *
 * | Operation | HTTP Method | Route           | What it does        |
 * |-----------|-------------|-----------------|---------------------|
 * | Create    | POST        | /api/notes      | Add a new note      |
 * | Read      | GET         | /api/notes      | Get all user's notes|
 * | Read One  | GET         | /api/notes/:id  | Get single note     |
 * | Update    | PUT         | /api/notes/:id  | Edit a note         |
 * | Delete    | DELETE      | /api/notes/:id  | Remove a note       |
 */

const express = require("express");
const Note = require("../models/Note");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All note routes require authentication
router.use(protect);

// CREATE - Add a new note
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      title,
      content,
      user: req.user._id, // Link note to logged-in user
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get all notes for the logged-in user
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // -1 = newest first

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE - Get a single note by ID
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Security: only the owner can view this note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Edit an existing note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } // new: true returns updated doc
    );

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Remove a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
