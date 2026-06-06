import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Hardcoded admin — cannot be registered, always exists
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "devlearn2025";

// Helpers: load/save registered users from localStorage
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("devlearn_users") || "[]");
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem("devlearn_users", JSON.stringify(users));
};

// Persist logged-in session across refresh
const loadSession = () => {
  try {
    return JSON.parse(localStorage.getItem("devlearn_session") || "null");
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());

  const persistSession = (userObj) => {
    if (userObj) {
      localStorage.setItem("devlearn_session", JSON.stringify(userObj));
    } else {
      localStorage.removeItem("devlearn_session");
    }
    setUser(userObj);
  };

  // --- REGISTER ---
  const register = (username, password) => {
    const trimmed = username.trim();
    if (!trimmed || !password) {
      return { success: false, error: "All fields are required." };
    }
    if (trimmed.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
      return { success: false, error: "That username is not available." };
    }
    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters.",
      };
    }

    const users = loadUsers();
    const exists = users.some(
      (u) => u.username.toLowerCase() === trimmed.toLowerCase(),
    );
    if (exists) {
      return { success: false, error: "Username already taken." };
    }

    const newUser = { username: trimmed, password, role: "user" };
    saveUsers([...users, newUser]);

    // Auto-login after register
    const sessionUser = { username: trimmed, role: "user" };
    persistSession(sessionUser);
    return { success: true };
  };

  // --- LOGIN ---
  const login = (username, password) => {
    const trimmed = username.trim();

    // Check admin
    if (trimmed === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      persistSession({ username: trimmed, role: "admin" });
      return { success: true };
    }

    // Check registered users
    const users = loadUsers();
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === trimmed.toLowerCase() &&
        u.password === password,
    );
    if (found) {
      persistSession({ username: found.username, role: "user" });
      return { success: true };
    }

    return { success: false, error: "Invalid username or password." };
  };

  // --- LOGOUT ---
  const logout = () => persistSession(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
