/**
 * AUTH CONTEXT
 * --------------
 * React Context lets us share auth state (user, token) across
 * all components without passing props manually ("prop drilling").
 *
 * After login/signup:
 * 1. Save token + user to localStorage (persists after page refresh)
 * 2. Set state so components know user is logged in
 *
 * On logout:
 * 1. Clear localStorage
 * 2. Reset state
 */

import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi, signup as signupApi, getMe } from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: check if user was previously logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Optionally verify token is still valid with backend
      getMe()
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch(() => {
          // Token expired or invalid — log out
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ _id: data._id, name: data.name, email: data.email })
    );
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  const signup = async (name, email, password) => {
    const data = await signupApi(name, email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ _id: data._id, name: data.name, email: data.email })
    );
    setUser({ _id: data._id, name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
