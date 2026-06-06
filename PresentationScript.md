# HMTT LEARN - Word-for-Word Speaker Script

This document provides a word-for-word presentation script for your team of 4. Follow the slide transition cues, action prompts, and handoff lines to ensure a smooth, professional presentation to your lecturer and classmates.

---

## Slide 1: Title & Introductions
**[Visual cue: Slide 1 showing HMTT Learn logo and team members names]**

**Speaker: Thet Paing Hein**
> "Good afternoon, everyone, and thank you for being here today. Our team is excited to present **HMTT Learn**, a unified developer learning platform and interactive coding sandbox that we designed specifically for beginner developers. 
>
> Before we jump in, let's introduce the team and how we split the engineering tasks:
> *   **Min Thant Htoo** led our CSS design system, typography, and page layout styling.
> *   **Thein Htike Zaw** developed the Homepage, Dashboard, and core interactive button elements.
> *   **Myself, Thet Paing Hein**, designed the navigation headers, site footer, and global UI/UX navigation flow.
> *   **Htet Nay Min** focused on full-stack architecture, including our browser-based compilation sandbox engine, markdown parsing, and state persistence.
> 
> Now, I will talk about the core problem we wanted to solve when we started building HMTT Learn."
>
> **[Action: Transition to Slide 2]**

---

## Slide 2: The Problem (The Hook)
**[Visual cue: Slide 2 showing the split-screen comparison: "Tab Fatigue" vs. Focused Learning]**

**Speaker: Thet Paing Hein**
> "When someone starts learning web development, they face what we call 'Tab Fatigue.' 
> 
> Imagine you are trying to learn a basic JavaScript concept. In Tab 1, you have a technical blog explaining the theory. In Tab 2, you have a YouTube tutorial. In Tab 3, you open a local editor to write code. In Tab 4, you have a browser window showing console output. In Tab 5, you have LeetCode or HackerRank to practice problems. And in Tab 6, you are keeping a notepad to track what you've done.
> 
> This constant context switching leads to loss of focus, cognitive fatigue, and discourages beginner developers. There is no single, unified interface that combines learning theory, practicing coding, and automatically tracking your progress. 
> 
> To show how HMTT Learn solves this frustration, here is Thein Htike Zaw with our solution overview."
>
> **[Action: Transition to Slide 3]**

---

## Slide 3: The Solution
**[Visual cue: Slide 3 showing the 2x2 grid diagram of Learn, Build, Read, and Track]**

**Speaker: Thein Htike Zaw**
> "Thank you, Thet Paing Hein. Our solution is **HMTT Learn** — an all-in-one learning workspace that consolidates the developer journey into four pillars:
> 
> 1.  **Learn**: Read structured, syntax-highlighted tutorials and articles.
> 2.  **Build**: Solve coding challenges in an interactive coding sandbox directly in the browser.
> 3.  **Read**: Share and read dev tips on a fully searchable blog page.
> 4.  **Track**: Keep motivated using a personalized dashboard that monitors completion status, streaks, and logs your live achievements.
> 
> By bringing all of these tools under a single navbar and layout, we eliminate tab clutter and let developers focus on writing code. 
> 
> Now, let's stop looking at static slides and show you HMTT Learn in action. Min Thant Htoo, let's start the live demo."
>
> **[Action: Transition to Slide 4 / Share browser screen containing HMTT Learn running locally]**

---

## Slide 4: Live Demo
**[Visual cue: Browser open on HMTT Learn Homepage]**

### Demo Part 1: Homepage & Navbar (Speaking: Thein Htike Zaw | Screen Share: Thein Htike Zaw)
**Speaker: Thein Htike Zaw**
> *"Here we are on the HMTT Learn Homepage. You can immediately see the clean, modern layout with clear call-to-actions, featured tutorials, and quick links to explore the categories. Everything is designed to be accessible and fast."*

### Demo Part 2: Blog & Interactive CRUD (Speaking: Min Thant Htoo | Screen Share: Thein Htike Zaw)
**Speaker: Min Thant Htoo**
> **[Cue: Share-holder clicks 'Blog' in Navbar]**
>
> *"If we navigate to the Blog page, you'll see a list of articles. Users can search for topics instantly using the search input, or filter by specific tags like 'React' or 'CSS'.*
> 
> **[Cue: Share-holder clicks a blog post]**
> 
> *"When we open an article, notice how the browser tab title updates dynamically to match the post title. If we scroll down, we can interact with the article by clicking the 'Like' button, which increments in real-time.*
> 
> *"We can also leave feedback. Let's write a comment saying 'Great tutorial team!' and submit it. The comment is added instantly, and since we built full CRUD capability, we can also delete it. This is saved to local state immediately."*

### Demo Part 3: Code Sandbox (Speaking: Htet Nay Min | Screen Share: Thein Htike Zaw)
**Speaker: Htet Nay Min**
> **[Cue: Share-holder clicks 'Challenges' in Navbar, then clicks 'Reverse a String']**
>
> *"Next is our core feature: the interactive Code Playground. On the left side, we have the problem description and a checklist of test cases. On the right side, we have our JavaScript code editor and a custom console terminal.*
> 
> *"First, let's test what happens when we write incorrect code. Let's type a syntax error and click 'Run Tests'.*
> 
> **[Cue: Share-holder types syntax error and clicks 'Run Tests']**
> 
> *"As you can see, the terminal console outputs the exact compilation error safely, and our test checklist remains unpassed.*
> 
> *"Now let's replace this with the correct solution: `return str.split("").reverse().join("");` and click 'Run Tests' again.*
> 
> **[Cue: Share-holder replaces code with the solution and clicks 'Run Tests']**
> 
> *"Awesome! The console terminal prints a success message and all test cases turn green. We can now click the 'Mark as Solved' button to submit our answer."*
> 
> **[Cue: Share-holder clicks 'Mark as Solved']**

### Demo Part 4: Student Dashboard & Progress (Speaking: Htet Nay Min | Screen Share: Thein Htike Zaw)
**Speaker: Htet Nay Min**
> **[Cue: Share-holder clicks 'Dashboard' in Navbar]**
> 
> *"If we go to the Dashboard, you'll see that our solved challenge count has increased, our learning streak is active, and our real-time activity feed logged: 'Solved challenge: Reverse a String' with the exact local timestamp."*

### Demo Part 5: Admin Panel (Speaking: Htet Nay Min | Screen Share: Thein Htike Zaw)
**Speaker: Htet Nay Min**
> **[Cue: Share-holder clicks 'Admin' in Navbar]**
>
> *"Finally, let's show how instructors can add content. We'll fill out the Admin form to create a new blog post titled 'Presentation Success' with some markdown text, and click submit.*
> 
> **[Cue: Share-holder creates blog post and submits]**
> 
> *"If we go back to the Blog page, you can see our new post rendered in the grid. If we go back to the Admin 'Manage' tab and click delete, it is instantly removed. Everything is kept synchronized in real-time.*
> 
> *"Now let's head back to our slide deck to look at our engineering choices."*
>
> **[Action: Switch screen share back to Slide Deck / Transition to Slide 5]**

---

## Slide 5: The Technology Stack
**[Visual cue: Slide 5 showing logos of React 19, Vite, React Router, LocalStorage]**

**Speaker: Min Thant Htoo**
> "Thank you, Htet Nay Min. For HMTT Learn, we chose a robust and highly performant frontend stack:
> *   **React 19 & Vite**: We used React 19 for modular component rendering, combined with Vite for sub-second hot-module replacement (HMR), keeping our build times extremely fast.
> *   **Content Parsers**: We integrated `react-markdown` and `react-syntax-highlighter` to display technical articles and code examples with styling matching the VS Code Dark theme.
> *   **Persistence & State**: We synchronized local state with the browser's `LocalStorage`. This ensured that user progress, written code, likes, and comments are fully preserved across page reloads without network delay.
> 
> Next, Htet Nay Min will talk about the engineering challenges we faced and how we solved them."
>
> **[Action: Transition to Slide 6]**

---

## Slide 6: Engineering Challenges Faced
**[Visual cue: Slide 6 showing comparison tables for Sandbox Compiler and Data Shadowing]**

**Speaker: Htet Nay Min**
> "As a team, we hit two main technical hurdles that required careful engineering:
> 
> **Challenge 1: Code Sandbox Execution Engine**
> We needed to compile and execute student-submitted code strings against test cases containing different arguments, completely in the browser. 
> 
> We resolved this by building a compiler using the `new Function` constructor wrapped in strict try-catch blocks to safely capture compile-time and run-time errors. We also developed a custom recursive `deepEqual` utility to compare complex outputs like nested arrays and objects. 
> 
> Because this compilation happens completely client-side in the user's browser environment, it is secure and avoids server-side vulnerabilities like Remote Code Execution.
> 
> **Challenge 2: Data Shadowing & Dynamic Merging**
> When we first built the pages, they relied on static JSON files. Adding items via the Admin Panel didn't update the feeds because they couldn't write back to files in the browser.
> 
> We solved this by creating a unified getter pattern. Now, when list pages render, they merge static file data with dynamic custom data stored in LocalStorage. This gives the user a seamless database-like experience in the browser.
> 
> Now let's talk about the future of HMTT Learn."
>
> **[Action: Transition to Slide 7]**

---

## Slide 7: V2 Roadmap (Future Steps)
**[Visual cue: Slide 7 showing the horizontal chevron timeline for V2]**

**Speaker: Htet Nay Min**
> "HMTT Learn is currently a fully functional MVP prototype. In our next phase of development, we have three key goals:
> 
> 1.  **Database Migration**: Moving our local data synchronization to a live backend database like Supabase or Firebase.
> 2.  **User Authentication**: Adding developer accounts so users can log in, sync progress across different devices, and view classmates' activity feeds.
> 3.  **Rich Text Editor**: Integrating a full-featured code editor widget like Monaco Editor to provide autocomplete and linting helpers inside the sandbox.
> 
> That concludes our presentation. Thank you for your time, and we would now love to open the floor to any questions or feedback."
>
> **[Action: Transition to Slide 8 / QA Slide]**
