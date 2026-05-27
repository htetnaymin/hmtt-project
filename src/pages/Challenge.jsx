import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import challenges from '../data/challenges'
import { UserContext } from '../context/UserContext'

function Challenge() {
  const { id } = useParams();
  const { progress, markComplete } = useContext(UserContext);

  const challenge = challenges.find(c => c.id === parseInt(id));
  const isSolved = progress.challenges.includes(challenge?.id);

  if (!challenge) {
    return (
      <div>
        <Navbar />
        <div className="tutorial-page" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Challenge Not Found</h1>
          <Link to="/challenges"><button style={{ marginTop: '20px' }}>Back to Challenges</button></Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="tutorial-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <Link to="/challenges" style={{ color: '#38bdf8', textDecoration: 'none' }}>&larr; Back to Challenges</Link>
        <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{challenge.title}</h1>
        <span className="difficulty" style={{ marginBottom: '2rem', display: 'inline-block' }}>{challenge.difficulty}</span>
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p>Get ready to test your problem-solving skills! In this challenge, you will implement a solution for <strong>{challenge.title}</strong>.</p>
          <p style={{ marginTop: '1rem', color: 'gray' }}>Interactive code editor coming soon...</p>
          
          <button 
            className="primary-button" 
            onClick={() => markComplete('challenges', challenge.id)}
            disabled={isSolved}
            style={{ marginTop: '2rem', opacity: isSolved ? 0.6 : 1, cursor: isSolved ? 'default' : 'pointer' }}
          >
            {isSolved ? '✓ Solved' : 'Mark as Solved'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Challenge