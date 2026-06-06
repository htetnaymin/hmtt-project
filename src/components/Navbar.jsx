import { Link } from 'react-router-dom'

function Navbar() {
  return (

    <nav className="navbar">

      <h1 className="logo">
        HMTT LEARN
      </h1>

      <ul className="nav-links">

        <li className="navbar_words">
          <Link to="/">Home</Link>
        </li>

        <li className="navbar_words">
          <Link to="/tutorials">Tutorials</Link>
        </li>

        <li className="navbar_words">
          <Link to="/challenges">Challenges</Link>
        </li>

        <li className="navbar_words">
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className="navbar_words">
          <Link to="/blog">Blog</Link>
        </li>

        <li>
          <Link to="/admin">Admin</Link>
        </li>

      </ul>

    </nav>

  )
}

export default Navbar