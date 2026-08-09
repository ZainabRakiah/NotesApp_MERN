/**
 * APP - Main Router
 * -----------------
 * React Router handles navigation between pages:
 * - /login, /signup → public (anyone can access)
 * - /notes → protected (must be logged in)
 * - / → redirect based on auth status
 */

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/notes" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/notes" /> : <Signup />}
        />

        {/* Protected route - requires JWT token */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        {/* Default: go to notes if logged in, else login */}
        <Route
          path="/"
          element={<Navigate to={user ? "/notes" : "/login"} />}
        />
      </Routes>
    </>
  );
};

export default App;
