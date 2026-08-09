/**
 * API HELPER
 * ----------
 * Central place for all HTTP requests to the backend.
 *
 * Key concept: We attach the JWT token to every protected request
 * using the Authorization header: "Bearer <token>"
 *
 * The token is stored in localStorage after login/signup.
 */

const API_URL = "/api";

// Get token from browser localStorage
const getToken = () => localStorage.getItem("token");

// Build headers with JSON content type and optional auth token
const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Generic fetch wrapper for error handling
const request = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: getHeaders(),
  });

  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "Server returned an invalid response. Is the backend running on port 5001?"
      );
    }
  } else if (!response.ok) {
    throw new Error(
      "Empty response from server. Is the backend running on port 5001?"
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ============ AUTH API ============

export const signup = (name, email, password) =>
  request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const login = (email, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getMe = () => request("/auth/me");

// ============ NOTES CRUD API ============

// CREATE
export const createNote = (title, content) =>
  request("/notes", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });

// READ (all notes)
export const getNotes = () => request("/notes");

// READ (single note)
export const getNote = (id) => request(`/notes/${id}`);

// UPDATE
export const updateNote = (id, title, content) =>
  request(`/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });

// DELETE
export const deleteNote = (id) =>
  request(`/notes/${id}`, {
    method: "DELETE",
  });
