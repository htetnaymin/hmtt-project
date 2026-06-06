import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getBlogs } from "../data/dynamicData";
import ReactMarkdown from "react-markdown";
import { UserContext } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function BlogPost() {
  const { id } = useParams();
  const { progress, markComplete } = useContext(UserContext);
  const { user } = useAuth();

  const blogPosts = getBlogs();
  const post = blogPosts.find((p) => p.id === parseInt(id));
  const isRead = progress.blogs.includes(post?.id);

  useEffect(() => {
    if (post) document.title = `${post.title} | DevLearn`;
    return () => {
      document.title = "DevLearn";
    };
  }, [post]);

  // Likes
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem(`blog_likes_count_${id}`);
    if (saved) return parseInt(saved);
    const numericId = parseInt(id) || 1;
    return numericId > 10000 ? (numericId % 43) + 8 : numericId * 8 + 5;
  });
  const [hasLiked, setHasLiked] = useState(() => {
    return localStorage.getItem(`blog_has_liked_${id}`) === "true";
  });

  const handleLike = () => {
    setLikes((prev) => {
      const next = hasLiked ? prev - 1 : prev + 1;
      localStorage.setItem(`blog_likes_count_${id}`, next.toString());
      return next;
    });
    setHasLiked((prev) => {
      const next = !prev;
      localStorage.setItem(`blog_has_liked_${id}`, next.toString());
      return next;
    });
  };

  // Comments — commentName auto-fills from logged-in user
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(`blog_comments_${id}`);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "mock-1",
        authorName: "Emily Vance",
        text: "This was super clear! Thanks for breaking down the concepts so well.",
        date: "2 days ago",
      },
      {
        id: "mock-2",
        authorName: "Devon Miller",
        text: "Loved the code snippets. Can we get a follow up on advanced patterns next?",
        date: "1 day ago",
      },
    ];
  });

  // Auto-fill name from logged-in user; keep in sync if user changes
  const [commentName, setCommentName] = useState(user?.username || "");
  const [commentText, setCommentText] = useState("");

  // If user logs in/out while on the page, update the prefill
  useEffect(() => {
    setCommentName(user?.username || "");
  }, [user]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      authorName: commentName.trim(),
      text: commentText.trim(),
      date: "Just now",
    };
    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem(`blog_comments_${id}`, JSON.stringify(updated));
    setCommentText("");
    // Keep name filled for next comment
  };

  const handleDeleteComment = (commentId) => {
    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);
    localStorage.setItem(`blog_comments_${id}`, JSON.stringify(updated));
  };

  if (!post) {
    return (
      <div className="blog-post-page">
        <Navbar />
        <main
          className="blog-main"
          style={{ textAlign: "center", paddingTop: "80px" }}
        >
          <h1>Post Not Found</h1>
          <Link to="/blog" className="blog-back-link">
            ← Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <Navbar />
      <main className="blog-main blog-post-main">
        <Link to="/blog" className="blog-back-link">
          ← Back to Blog
        </Link>

        <article className="blog-article-premium">
          {post.coverImage && (
            <div className="blog-post-cover-wrapper">
              <img
                src={post.coverImage}
                alt={post.title}
                className="blog-post-cover-img"
              />
            </div>
          )}

          <div className="blog-post-content-container">
            <div className="blog-post-header-meta">
              <div className="blog-post-tags">
                {post.tags &&
                  post.tags.map((tag) => (
                    <span key={tag} className="blog-tag-badge">
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="blog-post-time-meta">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="blog-post-title-main">{post.title}</h1>

            {post.author && (
              <div className="blog-post-author-bar">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="author-avatar-large"
                />
                <div className="author-info-text">
                  <span className="author-name-large">
                    Written by {post.author.name}
                  </span>
                  <span className="author-title">
                    Technical Writer & Developer
                  </span>
                </div>
              </div>
            )}

            <hr className="blog-post-divider" />

            <div className="blog-post-content">
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        {...props}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="blog-post-action-bar">
              <button
                className={`like-button ${hasLiked ? "liked" : ""}`}
                onClick={handleLike}
                aria-label="Like this post"
              >
                <span className="like-icon">{hasLiked ? "❤️" : "🤍"}</span>
                <span className="like-count">
                  {likes} {likes === 1 ? "Like" : "Likes"}
                </span>
              </button>

              <button
                className="primary-button mark-read-btn"
                onClick={() => markComplete("blogs", post.id, post.title)}
                disabled={isRead}
                style={{
                  opacity: isRead ? 0.6 : 1,
                  cursor: isRead ? "default" : "pointer",
                }}
              >
                {isRead ? "✓ Read" : "Mark as Read"}
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="blog-comments-section">
          <h2>Discussion ({comments.length})</h2>

          <form className="comment-form" onSubmit={handleAddComment}>
            <h3>Leave a Comment</h3>

            <div className="form-group">
              <label htmlFor="commentName">
                Name
                {user && (
                  <span className="comment-name-autofill-badge">
                    ✓ signed in as {user.username}
                  </span>
                )}
              </label>
              <input
                type="text"
                id="commentName"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your name"
                readOnly={!!user}
                className={user ? "comment-name-readonly" : ""}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="commentText">Comment</label>
              <textarea
                id="commentText"
                rows="4"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                required
              />
            </div>
            <button type="submit" className="primary-button submit-comment-btn">
              Post Comment
            </button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div className="comment-author-avatar">
                    {comment.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="comment-meta">
                    <span className="comment-author-name">
                      {comment.authorName}
                    </span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  {/* Only show delete for own comments (matched by name) or admin */}
                  {(user?.role === "admin" ||
                    user?.username === comment.authorName) && (
                    <button
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                      title="Delete Comment"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogPost;
