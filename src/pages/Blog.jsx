import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { getBlogs } from '../data/dynamicData'

function Blog() {
  const blogPosts = getBlogs();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')

  // Extract all unique tags across all blog posts
  const tags = ['All', ...new Set(blogPosts.flatMap(post => post.tags || []))]

  // Identify the featured post from the unfiltered list
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0]

  // Filter posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  // Determine if we should show the featured section (only when no active search/tag filter)
  const isDefaultView = searchTerm.trim() === '' && selectedTag === 'All'

  // If in default view, we separate the featured post from the remaining list
  const displayPosts = isDefaultView
    ? filteredPosts.filter(post => post.id !== featuredPost?.id)
    : filteredPosts

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

        {/* Search & Filter Section */}
        <section className="search-filter-container">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-group">
            {tags.map(tag => (
              <button 
                key={tag} 
                className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Post (Only visible in default view) */}
        {isDefaultView && featuredPost && (
          <section className="featured-section">
            <h2 className="section-title-left">Featured Article</h2>
            <article className="featured-blog-card">
              {featuredPost.coverImage && (
                <div className="featured-cover-container">
                  <img src={featuredPost.coverImage} alt={featuredPost.title} className="featured-cover" />
                </div>
              )}
              <div className="featured-content">
                <div className="featured-meta">
                  <span className="blog-date">{featuredPost.date}</span>
                  <span className="blog-divider">•</span>
                  <span className="blog-read-time">{featuredPost.readTime}</span>
                </div>
                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-summary">{featuredPost.summary}</p>
                
                <div className="blog-tags-list">
                  {featuredPost.tags && featuredPost.tags.map(tag => (
                    <span key={tag} className="blog-tag-badge">{tag}</span>
                  ))}
                </div>

                <div className="blog-card-footer">
                  {featuredPost.author && (
                    <div className="blog-author">
                      <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="author-avatar" />
                      <span className="author-name">{featuredPost.author.name}</span>
                    </div>
                  )}
                  <Link to={`/blog/${featuredPost.id}`} className="card-link featured-link">
                    Read article →
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Blog Grid */}
        <section className="blog-section">
          {isDefaultView && <h2>Recent Articles</h2>}
          <div className="blog-grid">
            {displayPosts.length > 0 ? (
              displayPosts.map((post) => (
                <article key={post.id} className="card blog-card-premium">
                  {post.coverImage && (
                    <div className="blog-card-cover-container">
                      <img src={post.coverImage} alt={post.title} className="blog-card-cover" />
                    </div>
                  )}
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-summary">{post.summary}</p>
                    
                    <div className="blog-tags-list">
                      {post.tags && post.tags.map(tag => (
                        <span key={tag} className="blog-tag-badge">{tag}</span>
                      ))}
                    </div>

                    <div className="blog-card-footer">
                      {post.author && (
                        <div className="blog-author">
                          <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                          <span className="author-name">{post.author.name}</span>
                        </div>
                      )}
                      <Link to={`/blog/${post.id}`} className="card-link">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-results">No articles found matching your criteria.</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Blog