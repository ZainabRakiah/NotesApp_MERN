/**
 * NOTE MODEL
 * ----------
 * Each note belongs to a user (one-to-many relationship).
 * We store the user's ID as a reference using mongoose.Schema.Types.ObjectId.
 *
 * This is how we ensure users can only see/edit THEIR OWN notes.
 */

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please add content"],
      trim: true,
    },
    // Reference to the User who owns this note
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
