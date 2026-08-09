/**
 * NOTE FORM - Create & Update
 * ---------------------------
 * This single form handles both CREATE and UPDATE (Edit):
 * - If `editingNote` is null → CREATE mode (POST)
 * - If `editingNote` has data → UPDATE mode (PUT)
 *
 * This is a common React pattern: one form, two operations.
 */

import { useState, useEffect } from "react";

const NoteForm = ({ onSubmit, editingNote, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // When user clicks "Edit", populate form with existing note data
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    if (!editingNote) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="note-form">
      <h3>
        {editingNote ? "Edit Note" : "Create New Note"}
        <span className="badge">{editingNote ? "UPDATE" : "CREATE"}</span>
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            required
          />
        </div>

        <div className="note-form-actions">
          <button type="submit" className="btn btn-primary">
            {editingNote ? "Update Note" : "Add Note"}
          </button>
          {editingNote && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
