import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import blogPosts from '../data/blogs'

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      summary: 'Learn the basics of React, including components, props, and state.',
      date: 'May 15, 2026',
    },
    {
      id: 2,
      title: 'Understanding React Hooks',
      summary: 'Dive deep into useState, useEffect, and custom hooks to power up your functional components.',
      date: 'May 18, 2026',
    },
    {
      id: 3,
      title: 'Advanced State Management',
      summary: 'Explore Context API and Redux for managing complex state in your applications.',
      date: 'May 22, 2026',
    }
  ];

  return (
    <div className="blog-page">
      <Navbar />

      <main className="blog-main">
        <section className="page-intro">
          <p className="eyebrow">Developer Blog</p>
          <h1>Latest articles for developers</h1>
          <p>
            Discover tutorials, workflow tips, and ideas for building your first
            projects with confidence.
          </p>
        </section>

        <section className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="card blog-card">
              <span className="level">{post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <Link to={`/blog/${post.id}`} className="card-link">
                Read more →
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Blog