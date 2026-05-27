const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    summary: 'Learn the basics of React, including components, props, and state.',
    content: `## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called **"components"**.

### Components
Components let you split the UI into independent, reusable pieces.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`
`,
    date: 'May 15, 2026',
  },
  {
    id: 2,
    title: 'Understanding React Hooks',
    summary: 'Dive deep into useState, useEffect, and custom hooks to power up your functional components.',
    content: `## Why Hooks?

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

### useState
\`useState\` is a Hook that lets you add React state to function components.

\`\`\`jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
`,
    date: 'May 18, 2026',
  },
  {
    id: 3,
    title: 'Advanced State Management',
    summary: 'Explore Context API and Redux for managing complex state in your applications.',
    content: `## Beyond useState

Managing state in a large application can be challenging. We will explore the Context API built into React, as well as third-party libraries like Redux and Zustand.

### Context API
Context provides a way to pass data through the component tree without having to pass props down manually at every level.

* Avoids prop drilling
* Built into React natively
* Great for themes, user auth, etc.
`,
    date: 'May 22, 2026',
  }
];

export default blogPosts;