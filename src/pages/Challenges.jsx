import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import challenges from '../data/challenges'
import { Link } from 'react-router-dom'

function Challenges() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  // Extract unique difficulties safely
  const difficulties = ['All', ...new Set(challenges.map(c => c.difficulty).filter(Boolean))]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  return (

    <div>

      <Navbar />

      <section className="tutorial-page">

        <h1 className="section-title">
          Coding Challenges
        </h1>

        <div className="search-filter-container">
          <input 
            type="text" 
            placeholder="Search challenges..." 
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-group">
            {difficulties.map(diff => (
              <button 
                key={diff} 
                className={`filter-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                onClick={() => setSelectedDifficulty(diff)}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <div className="card-container">

          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge) => (

            <div className="card" key={challenge.id}>

              <h2>{challenge.title}</h2>

              <span className="difficulty">
                {challenge.difficulty}
              </span>

              <p>
                Practice your problem-solving skills
                with this coding challenge.
              </p>

              <Link to={`/challenges/${challenge.id}`} style={{ textDecoration: 'none' }}>
                <button className="challenge-buttons">
                  Solve Challenge
                </button>
              </Link>

            </div>

            ))
          ) : (
             <div className="no-results">No challenges found matching your search.</div>
          )}

        </div>

      </section>
          <Footer />
    </div>

  )
}

export default Challenges