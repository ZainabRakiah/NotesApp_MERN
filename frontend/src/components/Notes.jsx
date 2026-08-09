/**
 * NOTES PAGE - Full CRUD Demo
 * ---------------------------
 * This page demonstrates all 4 CRUD operations:
 *
 * CREATE → handleCreate()  → POST /api/notes
 * READ   → fetchNotes()    → GET  /api/notes
 * UPDATE → handleUpdate()  → PUT  /api/notes/:id
 * DELETE → handleDelete()  → DELETE /api/notes/:id
 */

import { useState, useEffect } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api";
import NoteForm from "./NoteForm";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // READ - Fetch all notes when page loads
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // CREATE - Add a new note
  const handleCreate = async ({ title, content }) => {
    try {
      const newNote = await createNote(title, content);
      setNotes([newNote, ...notes]); // Add to top of list
    } catch (err) {
      setError(err.message);
    }
  };

  // UPDATE - Edit an existing note
  const handleUpdate = async ({ title, content }) => {
    try {
      const updated = await updateNote(editingNote._id, title, content);
      setNotes(notes.map((n) => (n._id === updated._id ? updated : n)));
      setEditingNote(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE - Remove a note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFormSubmit = editingNote ? handleUpdate : handleCreate;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="loading">Loading your notes...</div>;

  return (
    <div className="container">
      <div className="notes-header">
        <h2>My Notes = {notes.length}</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <NoteForm
        onSubmit={handleFormSubmit}
        editingNote={editingNote}
        onCancelEdit={() => setEditingNote(null)}
      />

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <h3>No notes yet</h3>
            <p>Create your first note using the form above!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-card-footer">
                <span className="note-date">
                  {formatDate(note.createdAt)}
                </span>
                <div className="note-actions">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingNote(note)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
