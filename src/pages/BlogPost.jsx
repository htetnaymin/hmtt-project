import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import blogPosts from '../data/blogs'
import ReactMarkdown from 'react-markdown'
import { UserContext } from '../context/UserContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function BlogPost() {
  const { id } = useParams()
  const { progress, markComplete } = useContext(UserContext);

  const post = blogPosts.find((p) => p.id === parseInt(id))
  const isRead = progress.blogs.includes(post?.id);

  if (!post) {
    return (
      <div className="blog-post-page">
        <Navbar />
        <main className="blog-main" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <h1>Post Not Found</h1>
          <Link to="/blog" className="blog-back-link">
            ← Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="blog-post-page">
      <Navbar />
      <main className="blog-main blog-post-main">
        <Link to="/blog" className="blog-back-link">
          ← Back to Blog
        </Link>

        <article className="blog-article">
          <p className="eyebrow">Blog post</p>
          <h1>{post.title}</h1>
          <p className="blog-post-meta">{post.date}</p>
          <div className="blog-post-content">
            <ReactMarkdown
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          
          <button 
            className="primary-button" 
            onClick={() => markComplete('blogs', post.id)}
            disabled={isRead}
            style={{ marginTop: '3rem', opacity: isRead ? 0.6 : 1, cursor: isRead ? 'default' : 'pointer' }}
          >
            {isRead ? '✓ Read' : 'Mark as Read'}
          </button>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default BlogPost