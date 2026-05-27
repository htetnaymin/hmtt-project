import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Initialize state from localStorage, or use default values if empty
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('userProgress');
    if (saved) return JSON.parse(saved);
    return {
      tutorials: [],
      challenges: [],
      blogs: [],
      streak: 1
    };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const markComplete = (category, id) => {
    setProgress(prev => {
      if (prev[category].includes(id)) return prev;
      return { ...prev, [category]: [...prev[category], id] };
    });
  };

  return (
    <UserContext.Provider value={{ progress, markComplete }}>
      {children}
    </UserContext.Provider>
  );
}