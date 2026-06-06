import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, login, logout, register } = useAuth();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login"); // "login" | "register"
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const openModal = (tab = "login") => {
    setModalTab(tab);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setModalOpen(true);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError("");
  };

  const switchTab = (tab) => {
    setModalTab(tab);
    setError("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const triggerShake = (msg) => {
    setError(msg);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(username.trim(), password);
    if (result.success) {
      closeModal();
    } else {
      triggerShake(result.error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      triggerShake("Passwords do not match.");
      return;
    }
    const result = register(username, password);
    if (result.success) {
      closeModal();
    } else {
      triggerShake(result.error);
    }
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "?";

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          DevLearn
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/tutorials">Tutorials</Link>
          </li>
          <li>
            <Link to="/challenges">Challenges</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          {user && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link to="/admin" className="nav-admin-link">
                ⚙ Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Profile area */}
        <div className="nav-profile-area" ref={dropdownRef}>
          {user ? (
            <div className="nav-avatar-wrapper">
              <button
                className="nav-avatar-btn"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="Profile menu"
              >
                <span className="nav-avatar">{getInitial(user.username)}</span>
                <span className="nav-username">{user.username}</span>
                <svg
                  className={`nav-chevron ${dropdownOpen ? "open" : ""}`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-header">
                    <span className="nav-dropdown-name">{user.username}</span>
                    <span
                      className={`nav-dropdown-badge ${user.role === "admin" ? "" : "nav-dropdown-badge--user"}`}
                    >
                      {user.role === "admin" ? "Admin" : "Member"}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="nav-dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    📊 Dashboard
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="nav-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      ⚙ Admin Panel
                    </Link>
                  )}
                  <button
                    className="nav-dropdown-item nav-dropdown-logout"
                    onClick={handleLogout}
                  >
                    ↩ Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth-btns">
              <button
                className="nav-login-btn"
                onClick={() => openModal("login")}
              >
                Sign in
              </button>
              <button
                className="nav-register-btn"
                onClick={() => openModal("register")}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* AUTH MODAL */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className={`login-modal ${shaking ? "shake" : ""}`}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Tab switcher */}
            <div className="auth-modal-tabs">
              <button
                className={`auth-modal-tab ${modalTab === "login" ? "active" : ""}`}
                onClick={() => switchTab("login")}
              >
                Sign in
              </button>
              <button
                className={`auth-modal-tab ${modalTab === "register" ? "active" : ""}`}
                onClick={() => switchTab("register")}
              >
                Sign up
              </button>
            </div>

            {/* LOGIN FORM */}
            {modalTab === "login" && (
              <>
                <div className="login-modal-header">
                  <div className="login-modal-icon">👋</div>
                  <h2>Welcome back</h2>
                  <p>Sign in to continue learning</p>
                </div>
                <form onSubmit={handleLogin} className="login-form">
                  <div className="login-field">
                    <label htmlFor="login-username">Username</label>
                    <input
                      id="login-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      autoComplete="username"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="login-field">
                    <label htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  {error && (
                    <div className="login-error">
                      <span>⚠</span> {error}
                    </div>
                  )}
                  <button type="submit" className="login-submit-btn">
                    Sign in
                  </button>
                  <p className="auth-switch-hint">
                    No account?{" "}
                    <button
                      type="button"
                      className="auth-switch-link"
                      onClick={() => switchTab("register")}
                    >
                      Sign up free
                    </button>
                  </p>
                </form>
              </>
            )}

            {/* REGISTER FORM */}
            {modalTab === "register" && (
              <>
                <div className="login-modal-header">
                  <div className="login-modal-icon">🚀</div>
                  <h2>Create account</h2>
                  <p>Start your learning journey today</p>
                </div>
                <form onSubmit={handleRegister} className="login-form">
                  <div className="login-field">
                    <label htmlFor="reg-username">Username</label>
                    <input
                      id="reg-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      autoComplete="username"
                      autoFocus
                      required
                    />
                  </div>
                  <div className="login-field">
                    <label htmlFor="reg-password">Password</label>
                    <input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  <div className="login-field">
                    <label htmlFor="reg-confirm">Confirm Password</label>
                    <input
                      id="reg-confirm"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  {error && (
                    <div className="login-error">
                      <span>⚠</span> {error}
                    </div>
                  )}
                  <button type="submit" className="login-submit-btn">
                    Create account
                  </button>
                  <p className="auth-switch-hint">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="auth-switch-link"
                      onClick={() => switchTab("login")}
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
