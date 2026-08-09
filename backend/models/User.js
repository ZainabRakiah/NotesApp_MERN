/**
 * USER MODEL
 * ----------
 * A Mongoose "Model" represents a collection in MongoDB.
 * This schema defines what a User document looks like.
 *
 * Key concepts:
 * - Schema: blueprint for documents (like a table structure in SQL)
 * - Model: constructor compiled from Schema (used to CRUD documents)
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true, // No two users can have the same email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// "User" collection in MongoDB will store documents matching this schema
module.exports = mongoose.model("User", userSchema);
