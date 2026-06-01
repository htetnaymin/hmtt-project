import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { saveCustomItem, getCustomListOnly, deleteCustomItem } from '../data/dynamicData'

function Admin() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Blog Form States
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogDate, setBlogDate] = useState(() => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  });
  const [blogTags, setBlogTags] = useState('React, Frontend');
  const [blogReadTime, setBlogReadTime] = useState('4 min read');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('Alex Johnson');
  const [blogAuthorAvatar, setBlogAuthorAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');
  const [blogCover, setBlogCover] = useState('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60');

  // 2. Tutorial Form States
  const [tutTitle, setTutTitle] = useState('');
  const [tutDesc, setTutDesc] = useState('');
  const [tutLevel, setTutLevel] = useState('Basic');
  const [tutCategory, setTutCategory] = useState('JavaScript');
  const [tutContent, setTutContent] = useState('');

  // 3. Challenge Form States
  const [chalTitle, setChalTitle] = useState('');
  const [chalDifficulty, setChalDifficulty] = useState('Easy');
  const [chalDesc, setChalDesc] = useState('');
  const [chalTemplate, setChalTemplate] = useState('function myChallenge() {\n  // Write code here\n}');
  const [chalFuncName, setChalFuncName] = useState('myChallenge');
  const [chalTestsText, setChalTestsText] = useState('[\n  {"input": ["test"], "expected": "test", "label": "myChallenge(\\"test\\")"}\n]');

  // 4. Manage Tab States
  const [customBlogs, setCustomBlogs] = useState(() => getCustomListOnly('blogs'));
  const [customTuts, setCustomTuts] = useState(() => getCustomListOnly('tutorials'));
  const [customChals, setCustomChals] = useState(() => getCustomListOnly('challenges'));

  const loadCustomLists = () => {
    setCustomBlogs(getCustomListOnly('blogs'));
    setCustomTuts(getCustomListOnly('tutorials'));
    setCustomChals(getCustomListOnly('challenges'));
  };

  const triggerToast = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  useEffect(() => {
    document.title = 'Admin Panel | HMTT Learn';
    return () => {
      document.title = 'HMTT Learn';
    };
  }, []);

  // Submit Handlers
  const handleBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      date: blogDate,
      tags: blogTags.split(',').map(t => t.trim()).filter(Boolean),
      readTime: blogReadTime,
      author: {
        name: blogAuthor,
        avatar: blogAuthorAvatar
      },
      coverImage: blogCover,
      featured: false
    };

    saveCustomItem('blogs', newBlog);
    triggerToast(`Successfully created blog: "${blogTitle}"!`);
    
    // Reset Form
    setBlogTitle('');
    setBlogSummary('');
    setBlogContent('');
    loadCustomLists();
  };

  const handleTutorialSubmit = (e) => {
    e.preventDefault();
    const newTut = {
      title: tutTitle,
      description: tutDesc,
      level: tutLevel,
      category: tutCategory,
      content: tutContent
    };

    saveCustomItem('tutorials', newTut);
    triggerToast(`Successfully created tutorial: "${tutTitle}"!`);

    // Reset Form
    setTutTitle('');
    setTutDesc('');
    setTutContent('');
    loadCustomLists();
  };

  const handleChallengeSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Validate JSON input for tests
      const parsedTests = JSON.parse(chalTestsText);
      if (!Array.isArray(parsedTests)) {
        throw new Error("Tests must be a valid JSON array.");
      }

      const newChal = {
        title: chalTitle,
        difficulty: chalDifficulty,
        description: chalDesc,
        template: chalTemplate,
        functionName: chalFuncName,
        tests: parsedTests
      };

      saveCustomItem('challenges', newChal);
      triggerToast(`Successfully created challenge: "${chalTitle}"!`);

      // Reset Form
      setChalTitle('');
      setChalDesc('');
      setChalTemplate('function myChallenge() {\n  // Write code here\n}');
      setChalFuncName('myChallenge');
      setChalTestsText('[\n  {"input": ["test"], "expected": "test", "label": "myChallenge(\\"test\\")"}\n]');
      loadCustomLists();

    } catch (err) {
      alert(`Invalid JSON format in Test Cases: ${err.message}`);
    }
  };

  const handleDelete = (category, id, title) => {
    if (window.confirm(`Are you sure you want to delete custom ${category.slice(0, -1)}: "${title}"?`)) {
      deleteCustomItem(category, id);
      triggerToast(`Deleted custom ${category.slice(0, -1)}: "${title}".`);
      loadCustomLists();
    }
  };

  return (
    <div className="admin-page-wrapper">
      <Navbar />

      <main className="admin-main-container">
        <section className="page-intro">
          <p className="eyebrow">Admin Console</p>
          <h1>Content Management Dashboard</h1>
          <p>
            Create and publish dynamic tutorials, coding challenges, and dev articles. All content is saved locally for immediate presentation preview.
          </p>
        </section>

        {successMessage && (
          <div className="admin-success-toast">
            <span>✨ {successMessage}</span>
          </div>
        )}

        {/* Tab Selection */}
        <section className="admin-tabs-section">
          <div className="admin-tabs-container">
            <button 
              className={`admin-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              📝 Create Blog
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'tutorials' ? 'active' : ''}`}
              onClick={() => setActiveTab('tutorials')}
            >
              📚 Create Tutorial
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
              onClick={() => setActiveTab('challenges')}
            >
              💻 Create Challenge
            </button>
            <button 
              className={`admin-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              ⚙️ Manage Custom Content ({customBlogs.length + customTuts.length + customChals.length})
            </button>
          </div>
        </section>

        {/* Forms & Listing Panels */}
        <section className="admin-forms-container">
          
          {/* BLOG FORM */}
          {activeTab === 'blogs' && (
            <form className="admin-card-form" onSubmit={handleBlogSubmit}>
              <h2>Publish a New Dev Blog</h2>
              
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="blogTitle">Blog Title</label>
                  <input type="text" id="blogTitle" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder="e.g. 10 Tips for Cleaner Code" required />
                </div>
                <div className="form-group">
                  <label htmlFor="blogDate">Publish Date</label>
                  <input type="text" id="blogDate" value={blogDate} onChange={(e) => setBlogDate(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="blogSummary">Short Summary</label>
                <input type="text" id="blogSummary" value={blogSummary} onChange={(e) => setBlogSummary(e.target.value)} placeholder="Provide a brief summary card overview..." required />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="blogTags">Tags (comma-separated)</label>
                  <input type="text" id="blogTags" value={blogTags} onChange={(e) => setBlogTags(e.target.value)} placeholder="React, Frontend" required />
                </div>
                <div className="form-group">
                  <label htmlFor="blogReadTime">Reading Time</label>
                  <input type="text" id="blogReadTime" value={blogReadTime} onChange={(e) => setBlogReadTime(e.target.value)} placeholder="4 min read" required />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label htmlFor="blogAuthor">Author Name</label>
                  <input type="text" id="blogAuthor" value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="blogAuthorAvatar">Author Avatar URL</label>
                  <input type="text" id="blogAuthorAvatar" value={blogAuthorAvatar} onChange={(e) => setBlogAuthorAvatar(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="blogCover">Cover Image URL</label>
                  <input type="text" id="blogCover" value={blogCover} onChange={(e) => setBlogCover(e.target.value)} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="blogContent">Blog Body Content (Markdown Supported)</label>
                <textarea id="blogContent" rows="12" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} placeholder="## Introduction&#10;&#10;Write your article here..." required />
              </div>

              <button type="submit" className="primary-button admin-submit-btn">Publish Blog Post</button>
            </form>
          )}

          {/* TUTORIAL FORM */}
          {activeTab === 'tutorials' && (
            <form className="admin-card-form" onSubmit={handleTutorialSubmit}>
              <h2>Publish a New Tutorial</h2>

              <div className="form-group">
                <label htmlFor="tutTitle">Tutorial Title</label>
                <input type="text" id="tutTitle" value={tutTitle} onChange={(e) => setTutTitle(e.target.value)} placeholder="e.g. Introduction to CSS Flexbox" required />
              </div>

              <div className="form-group">
                <label htmlFor="tutDesc">Short Description</label>
                <input type="text" id="tutDesc" value={tutDesc} onChange={(e) => setTutDesc(e.target.value)} placeholder="Brief summary of the lesson skills..." required />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="tutLevel">Level</label>
                  <select id="tutLevel" value={tutLevel} onChange={(e) => setTutLevel(e.target.value)}>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tutCategory">Category</label>
                  <input type="text" id="tutCategory" value={tutCategory} onChange={(e) => setTutCategory(e.target.value)} placeholder="JavaScript" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tutContent">Tutorial Material (Markdown Supported)</label>
                <textarea id="tutContent" rows="12" value={tutContent} onChange={(e) => setTutContent(e.target.value)} placeholder="## Step 1: Concept&#10;&#10;Explain the lesson details..." required />
              </div>

              <button type="submit" className="primary-button admin-submit-btn">Publish Tutorial</button>
            </form>
          )}

          {/* CHALLENGE FORM */}
          {activeTab === 'challenges' && (
            <form className="admin-card-form" onSubmit={handleChallengeSubmit}>
              <h2>Create a New Coding Challenge</h2>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="chalTitle">Challenge Title</label>
                  <input type="text" id="chalTitle" value={chalTitle} onChange={(e) => setChalTitle(e.target.value)} placeholder="e.g. FizzBuzz" required />
                </div>
                <div className="form-group">
                  <label htmlFor="chalDifficulty">Difficulty</label>
                  <select id="chalDifficulty" value={chalDifficulty} onChange={(e) => setChalDifficulty(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="chalDesc">Problem Description</label>
                <textarea id="chalDesc" rows="4" value={chalDesc} onChange={(e) => setChalDesc(e.target.value)} placeholder="Provide challenge description, examples, inputs, and constraints..." required />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="chalFuncName">JavaScript Function Name</label>
                  <input type="text" id="chalFuncName" value={chalFuncName} onChange={(e) => setChalFuncName(e.target.value)} placeholder="e.g. fizzBuzz" required />
                </div>
                <div className="form-group" style={{ opacity: 0.5 }}>
                  <label>Environment</label>
                  <input type="text" value="JavaScript (ES6 Sandbox)" readOnly />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="chalTemplate">Starter Code Template</label>
                <textarea id="chalTemplate" rows="6" className="admin-code-textarea" value={chalTemplate} onChange={(e) => setChalTemplate(e.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="chalTestsText">Automated Test Cases (JSON Format Array)</label>
                <textarea id="chalTestsText" rows="6" className="admin-code-textarea" value={chalTestsText} onChange={(e) => setChalTestsText(e.target.value)} required />
                <span className="input-helper">Must be a valid JSON array. Each test item needs `input` (array of arguments), `expected` output value, and a `label` description.</span>
              </div>

              <button type="submit" className="primary-button admin-submit-btn">Publish Challenge</button>
            </form>
          )}

          {/* MANAGE ITEMS LISTING */}
          {activeTab === 'manage' && (
            <div className="admin-manage-pane">
              <h2>Manage Custom Content</h2>
              <p className="pane-intro-sub">
                Below is a list of dynamic items published during your session. You can delete them from the local cache.
              </p>

              {/* Custom Blogs */}
              <div className="manage-list-section">
                <h3>Custom Blogs ({customBlogs.length})</h3>
                {customBlogs.length === 0 ? (
                  <p className="empty-list-text">No custom blogs created yet.</p>
                ) : (
                  <div className="manage-grid">
                    {customBlogs.map(blog => (
                      <div key={blog.id} className="manage-card">
                        <div className="manage-card-info">
                          <h4>{blog.title}</h4>
                          <span>Published on {blog.date}</span>
                        </div>
                        <button className="delete-btn-admin" onClick={() => handleDelete('blogs', blog.id, blog.title)}>Delete</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Tutorials */}
              <div className="manage-list-section">
                <h3>Custom Tutorials ({customTuts.length})</h3>
                {customTuts.length === 0 ? (
                  <p className="empty-list-text">No custom tutorials created yet.</p>
                ) : (
                  <div className="manage-grid">
                    {customTuts.map(tut => (
                      <div key={tut.id} className="manage-card">
                        <div className="manage-card-info">
                          <h4>{tut.title}</h4>
                          <span>{tut.category} • {tut.level}</span>
                        </div>
                        <button className="delete-btn-admin" onClick={() => handleDelete('tutorials', tut.id, tut.title)}>Delete</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Challenges */}
              <div className="manage-list-section">
                <h3>Custom Challenges ({customChals.length})</h3>
                {customChals.length === 0 ? (
                  <p className="empty-list-text">No custom challenges created yet.</p>
                ) : (
                  <div className="manage-grid">
                    {customChals.map(chal => (
                      <div key={chal.id} className="manage-card">
                        <div className="manage-card-info">
                          <h4>{chal.title}</h4>
                          <span>{chal.difficulty} • Function: {chal.functionName}</span>
                        </div>
                        <button className="delete-btn-admin" onClick={() => handleDelete('challenges', chal.id, chal.title)}>Delete</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Admin;
