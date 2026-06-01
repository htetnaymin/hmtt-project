import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { getTutorials } from '../data/dynamicData'

function Tutorials() {
  const tutorials = getTutorials()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('All')

  // Extract unique levels for filter buttons (e.g., 'Easy', 'Medium', etc.)
  const levels = ['All', ...new Set(tutorials.map(t => t.level).filter(Boolean))]

  // Filter tutorials based on search text and selected level
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tutorial.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'All' || tutorial.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  return (

    <div>

      <Navbar />

      <section className="tutorial-page">

        <h1 className="section-title">
          Coding Tutorials
        </h1>

        <div className="search-filter-container">
          <input 
            type="text" 
            placeholder="Search tutorials..." 
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="filter-group">
            {levels.map(level => (
              <button 
                key={level} 
                className={`filter-btn ${selectedLevel === level ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="card-container">

          {filteredTutorials.length > 0 ? (
            filteredTutorials.map((tutorial) => (

            <div className="card" key={tutorial.id}>

              <h2>{tutorial.title}</h2>

              {tutorial.category && (
                <p>Category: {tutorial.category}</p>
              )}

              <span className="level">
                {tutorial.level}
              </span>

              <Link to={`/tutorials/${tutorial.id}`} style={{ textDecoration: 'none' }}>
                <button className="tutorial-button">
                  Read Tutorial
                </button>
              </Link>

            </div>

            ))
          ) : (
            <div className="no-results">No tutorials found matching your search.</div>
          )}

        </div>

      </section>
          <Footer />
    </div>

  )
}

export default Tutorials