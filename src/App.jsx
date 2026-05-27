import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Tutorials from './pages/Tutorials.jsx'
import Challenges from './pages/Challenges.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Challenge from './pages/Challenge.jsx'
import Tutorial from './pages/Tutorial.jsx'
import { UserProvider } from './context/UserContext.jsx'

function App() {

  return (
    <UserProvider>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/tutorials"
          element={<Tutorials />}
        />

        <Route
          path="/challenges"
          element={<Challenges />}
        />

        <Route
          path="/challenges/:id"
          element={<Challenge />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/blog/:id"
          element={<BlogPost />}
        />

        <Route
          path="/tutorials/:id"
          element={<Tutorial />}
        />

      </Routes>
    </UserProvider>
  )
}

export default App