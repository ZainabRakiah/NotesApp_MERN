/**
 * AUTH ROUTES
 * -----------
 * Defines auth URLs and maps them to controller functions.
 */

const express = require("express");
const { protect } = require("../middleware/auth");
const {
  signupUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
