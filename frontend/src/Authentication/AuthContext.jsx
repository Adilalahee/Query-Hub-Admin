import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(
        "/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  // Logout function
  const logout = async () => {
    await axios.get("/api/auth/logout", { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
