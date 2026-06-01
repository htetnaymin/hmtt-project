/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Initialize state from localStorage, or use default values if empty
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('userProgress');
    let data;
    if (saved) {
      try {
        data = JSON.parse(saved);
      } catch {
        data = null;
      }
    }
    
    if (!data) {
      data = {
        tutorials: [],
        challenges: [],
        blogs: [],
        streak: 3, // Set baseline streak to 3 to look active for the presentation
        activities: []
      };
    }

    // Ensure activities array exists and seed it if empty to look populated
    if (!data.activities) {
      data.activities = [];
    }
    if (data.activities.length === 0) {
      data.activities = [
        {
          id: 'seed-1',
          type: 'tutorials',
          title: 'JavaScript Fundamentals',
          action: 'Completed tutorial',
          time: '2 hours ago'
        },
        {
          id: 'seed-2',
          type: 'challenges',
          title: 'Reverse a String',
          action: 'Solved challenge',
          time: 'Yesterday'
        },
        {
          id: 'seed-3',
          type: 'blogs',
          title: 'Getting Started with React',
          action: 'Read article',
          time: '2 days ago'
        }
      ];
    }
    return data;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const markComplete = (category, id, title = '') => {
    setProgress(prev => {
      // Avoid duplicates for completed lists
      if (prev[category].includes(id)) return prev;

      // Determine action phrasing
      let actionPhrasing = 'Completed tutorial';
      if (category === 'challenges') actionPhrasing = 'Solved challenge';
      if (category === 'blogs') actionPhrasing = 'Read article';

      // Create a new activity entry
      const now = new Date();
      const formattedTime = now.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
                            ' at ' + 
                            now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newActivity = {
        id: Date.now().toString(),
        type: category,
        title: title || `${category.charAt(0).toUpperCase() + category.slice(1, -1)} #${id}`,
        action: actionPhrasing,
        time: formattedTime
      };

      // Add to front of activities list
      return { 
        ...prev, 
        [category]: [...prev[category], id],
        activities: [newActivity, ...prev.activities]
      };
    });
  };

  return (
    <UserContext.Provider value={{ progress, markComplete }}>
      {children}
    </UserContext.Provider>
  );
}