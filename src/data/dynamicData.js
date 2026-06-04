import staticBlogs from './blogs'
import staticTutorials from './tutorials'
import staticChallenges from './challenges'

// Helper to retrieve custom items from localStorage safely
const getCustomItems = (key) => {
  const saved = localStorage.getItem(key);
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

// Helper to save custom items to localStorage
const saveCustomItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const getBlogs = () => {
  const custom = getCustomItems('custom_blogs');
  return [...staticBlogs, ...custom];
};

export const getTutorials = () => {
  const custom = getCustomItems('custom_tutorials');
  return [...staticTutorials, ...custom];
};

export const getChallenges = () => {
  const custom = getCustomItems('custom_challenges');
  return [...staticChallenges, ...custom];
};

export const saveCustomItem = (category, item) => {
  const key = `custom_${category}`;
  const items = getCustomItems(key);
  
  // Assign a unique numeric ID based on timestamp
  const newItem = {
    ...item,
    id: Date.now()
  };
  
  items.push(newItem);
  saveCustomItems(key, items);
  return newItem;
};

export const deleteCustomItem = (category, id) => {
  const key = `custom_${category}`;
  const items = getCustomItems(key);
  const filtered = items.filter(item => item.id !== parseInt(id));
  saveCustomItems(key, filtered);
};

export const getCustomListOnly = (category) => {
  return getCustomItems(`custom_${category}`);
};
