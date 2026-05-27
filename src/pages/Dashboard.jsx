import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const recentActivities = [
  { title: 'Completed React Component Basics', time: '2 hours ago' },
  { title: 'Solved Array Loop Challenge', time: 'Yesterday' },
  { title: 'Read blog post about CSS layout', time: '2 days ago' }
]

function Dashboard() {
  const { progress } = useContext(UserContext);

  const stats = [
    { label: 'Tutorials completed', value: progress.tutorials.length.toString() },
    { label: 'Challenges solved', value: progress.challenges.length.toString() },
    { label: 'Articles read', value: progress.blogs.length.toString() },
    { label: 'Learning streak', value: `${progress.streak} days` }
  ];

  return (
    <div className="dashboard-container">

      <Navbar />

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <div className="dashboard-card">
            <p className="eyebrow">Your learning space</p>
            <h1>Dashboard</h1>
            <p className="dashboard-intro">
              Track your progress, revisit recent lessons, and keep building
              your developer skills.
            </p>
          </div>

          <div className="dashboard-hero-card">
            <h2>Keep going!</h2>
            <p>You are on a {progress.streak}-day streak. Keep learning at your own pace.</p>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((item) => (
            <article key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent activity</h2>
            <p className="section-subtitle">
              Your latest progress across tutorials, challenges, and articles.
            </p>
          </div>

          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.title} className="activity-item">
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard