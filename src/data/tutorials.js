const tutorials = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Learn the basic concepts of JavaScript, including variables, loops, and functions.',
    level: "Basic",
    content: `## Introduction

JavaScript is the programming language of the Web. In this tutorial, you will learn the basics.

### Variables
Variables are containers for storing data values.

\`\`\`javascript
let x = 5;
let y = 6;
let z = x + y;
\`\`\`

### Functions
A JavaScript function is a block of code designed to perform a particular task.
`,
  },
  {
    id: 2,
    title: 'React Component Basics',
    description: 'Understand how to build reusable UI components using React.',
    level: "Intermediate",
    content: `## Your First Component

React components are regular JavaScript functions that return UI elements.

\`\`\`jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  );
}
\`\`\`
`,
  },
  {
    id: 3,
    title: 'Build Your First App',
    description: 'Put it all together and build your first functional web application.',
    level: "Advanced",
    content: `## Putting it all together

Now that you know the basics of JavaScript and React components, it's time to build a real app.

We will be building a **To-Do List**.

### Requirements:
1. An input field to type a new task
2. A button to add the task
3. A list of existing tasks
4. A way to mark tasks as complete
`,
  },
  {
    id: 4,
    title: 'Introduction to React Router',
    description: 'Learn how to navigate between pages in a React application using React Router.',
    level: "Intermediate",
    content: `## Why Routing?

In a Single Page Application (SPA) like those built with React, routing allows you to navigate between different views without refreshing the whole page.

### Setting up React Router
First, you wrap your application in a \`<BrowserRouter>\`, then define your \`<Routes>\` and individual \`<Route>\` components.

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`
`,
  },
  {
    id: 5,
    title: 'Fetching Data with APIs',
    description: 'Understand how to make network requests and handle asynchronous data in JavaScript.',
    level: "Intermediate",
    content: `## The Fetch API

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses.

### Basic Fetch Request
Using \`async / await\` makes working with promises much cleaner.

\`\`\`javascript
async function getUser() {
  try {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}
\`\`\`

### Using Fetch in React
Typically, you'll want to fetch data inside a \`useEffect\` hook when the component mounts.

\`\`\`jsx
import { useState, useEffect } from 'react';

export default function DataComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);

  return <div>{data ? data.name : 'Loading...'}</div>;
}
\`\`\`
`,
  }
];
export default tutorials;