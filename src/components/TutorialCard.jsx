import React from 'react';

export default function TutorialCard({ title }) {
  return (
    <div className="tutorial-card">
      <h3>{title || 'Tutorial Title'}</h3>
      <p>Follow this easy tutorial to strengthen your coding workflow.</p>
      <span className="tutorial-badge">Beginner</span>
    </div>
  )
}