/**
 * NOTE ROUTES
 * -----------
 * Defines note URLs and maps them to controller functions.
 * All routes here are PROTECTED — user must send valid JWT.
 *
 * | Operation | HTTP Method | Route           | Controller   |
 * |-----------|-------------|-----------------|--------------|
 * | Create    | POST        | /api/notes      | createNote   |
 * | Read      | GET         | /api/notes      | getNotes     |
 * | Read One  | GET         | /api/notes/:id  | getNoteById  |
 * | Update    | PUT         | /api/notes/:id  | updateNote   |
 * | Delete    | DELETE      | /api/notes/:id  | deleteNote   |
 */

const express = require("express");
const { protect } = require("../middleware/auth");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

router.use(protect);

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
