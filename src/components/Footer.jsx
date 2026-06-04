export default function Footer() {
  return (
    <footer className="footer">
 
      <div className="footer-top">
 
        <div className="footer-brand">
          <div className="logo">{"HMTT LEARN"}</div>
          <p className="footer-tagline">
            Empowering the next generation of developers — one tutorial at a time.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="GitHub" className="Social_Icons">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
            </a>
            <a href="#" aria-label="Twitter" className="Social_Icons">
              <img src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" alt="Twitter" />
            </a>
            <a href="#" aria-label="YouTube" className="Social_Icons">
              <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" />
            </a>
            <a href="#" aria-label="Discord" className="Social_Icons">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png" alt="Discord" />
            </a>
          </div>
        </div>
 
        <div className="footer-links-group">
          <h4>Learn</h4>
          <ul>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Challenges</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Roadmaps</a></li>
            <li><a href="#">Quizzes</a></li>
          </ul>
        </div>
 
        <div className="footer-links-group">
          <h4>Topics</h4>
          <ul>
            <li><a href="#">HTML & CSS</a></li>
            <li><a href="#">JavaScript</a></li>
            <li><a href="#">Python</a></li>
            <li><a href="#">Java</a></li>
            <li><a href="#">React</a></li>
          </ul>
        </div>
 
        <div className="footer-links-group">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
 
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Get new tutorials and coding tips in your inbox.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your@email.com" />
            <button className="Subscribe_Button">Subscribe</button>
          </div>
        </div>
 
      </div>
 
      <div className="footer-bottom">
        <p>© 2026 HMTTLearn. All rights reserved.</p>
        <div className="footer-badges">
          <span className="badge">🚀 10k+ Learners</span>
          <span className="badge">📚 200+ Tutorials</span>
          <span className="badge">🆓 Free Forever</span>
        </div>
      </div>
 
    </footer>
  );
}