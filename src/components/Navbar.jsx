import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <h1 className="logo">
          HMTT LEARN
        </h1>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li className="navbar_words" onClick={() => setIsOpen(false)}>
          <Link to="/">Home</Link>
        </li>

        <li className="navbar_words" onClick={() => setIsOpen(false)}>
          <Link to="/tutorials">Tutorials</Link>
        </li>

        <li className="navbar_words" onClick={() => setIsOpen(false)}>
          <Link to="/challenges">Challenges</Link>
        </li>

        <li className="navbar_words" onClick={() => setIsOpen(false)}>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className="navbar_words" onClick={() => setIsOpen(false)}>
          <Link to="/blog">Blog</Link>
        </li>

        <li className="navbar_words" onClick={() => setIsOpen(false)}>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar