import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getTutorials } from '../data/dynamicData'
import ReactMarkdown from 'react-markdown'
import { UserContext } from '../context/UserContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function Tutorial() {
  const { id } = useParams();
  const { progress, markComplete } = useContext(UserContext);

  const tutorials = getTutorials();
  const tutorial = tutorials?.find(t => t.id === parseInt(id));
  const isCompleted = progress.tutorials.includes(tutorial?.id);

  if (!tutorial) {
    return (
      <div>
        <Navbar />
        <div className="tutorial-page" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Tutorial Not Found</h1>
          <Link to="/tutorials"><button style={{ marginTop: '20px' }}>Back to Tutorials</button></Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="tutorial-page" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <Link to="/tutorials" style={{ color: '#38bdf8', textDecoration: 'none' }}>&larr; Back to Tutorials</Link>
        <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{tutorial.title}</h1>
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', marginTop: '1rem' }}>
          <p>{tutorial.description}</p>
          <div className="blog-post-content" style={{ marginTop: '2rem' }}>
            <ReactMarkdown
              components={{
                code({inline, className, children, ...props}) {
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
              {tutorial.content || '*Full tutorial content coming soon...*'}
            </ReactMarkdown>
          </div>
          
          <button 
            className="primary-button" 
            onClick={() => markComplete('tutorials', tutorial.id, tutorial.title)}
            disabled={isCompleted}
            style={{ marginTop: '2rem', opacity: isCompleted ? 0.6 : 1, cursor: isCompleted ? 'default' : 'pointer' }}
          >
            {isCompleted ? '✓ Completed' : 'Mark as Complete'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Tutorial