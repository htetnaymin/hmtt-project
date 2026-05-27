import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategoryCard from '../components/CategoryCard'
import TutorialCard from '../components/TutorialCard'
import { Link } from 'react-router-dom'

const featuredTutorials = [
  { title: 'JavaScript Fundamentals' },
  { title: 'React Component Basics' },
  { title: 'Build Your First App' }
]

const categories = [
  { title: 'Tutorials' },
  { title: 'Challenges' },
  { title: 'Blog' }
]

function Home() {
  return (
    <div className="home-container">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <span className="eyebrow">Code smarter. Learn faster.</span>
            <h1>Hands-on coding tutorials for beginner developers</h1>

            <p>
              Learn with step-by-step lessons, real coding challenges, and
              practical blog guides designed for new developers.
            </p>

            <div className="home-cta-group">
              <Link to="/tutorials">
                <button className="primary-button">Start Learning</button>
              </Link>
              <Link to="/challenges">
                <button className="secondary-button">Try a challenge</button>
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-visual">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6062/6062646.png"
                alt="coding illustration"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-features">
        <div className="section-header">
          <h2>What you'll get</h2>
          <p className="section-subtitle">
            Clear lessons, real practice, and the tools to build confidence.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Practical guides</h3>
            <p>Follow step-by-step tutorials that build real skills.</p>
          </div>
          <div className="feature-card">
            <h3>Interactive challenges</h3>
            <p>Solve bite-sized problems to reinforce what you learn.</p>
          </div>
          <div className="feature-card">
            <h3>Developer blog</h3>
            <p>Stay inspired with easy-to-read web development tips.</p>
          </div>
        </div>
      </section>

      <section className="home-section home-preview">
        <div className="section-header">
          <h2>Featured tutorials</h2>
          <p className="section-subtitle">
            Start with a tutorial that fits your current skill level.
          </p>
        </div>

        <div className="preview-grid">
          {featuredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.title} title={tutorial.title} />
          ))}
        </div>

        <div className="preview-actions">
          <Link to="/tutorials">
            <button className="primary-button">View all tutorials</button>
          </Link>
        </div>
      </section>

      <section className="home-section home-categories">
        <div className="section-header">
          <h2>Explore categories</h2>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <CategoryCard key={item.title} title={item.title} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home