import { Link } from 'react-router-dom'

function Navbar() {
  return (

    <nav className="navbar">

      <h1 className="logo">
        HMTT LEARN
      </h1>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/tutorials">Tutorials</Link>
        </li>

        <li>
          <Link to="/challenges">Challenges</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
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