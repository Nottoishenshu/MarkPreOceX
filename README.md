
# MarkdownPreX
The Real-Time Markdown Previewer is a web application built using plain JavaScript, HTML and CSS. It lets users write text and instantly see the rendered HTML output in a live preview pane. The goal of this project was to understand how Markdown parsers work and to learn about DOM manipulation, browser APIs, text processing and frontend application architecture. The Real-Time Markdown Previewer helps users to write Markdown text and see the output instantly.
The goal is to gain an understanding of Markdown parsers and to learn about DOM manipulation.

# Features

## Core Features

* time Markdown rendering
* Custom Markdown parser
* Live preview pane
* Headings support
* italic formatting
* Inline code support
* Fenced code blocks
* Ordered and unordered lists
* Blockquotes
* Horizontal rules
* Hyperlinks
* Images
* storage persistence
* Download Markdown as a.md file
* Copy rendered HTML to clipboard
* Toolbar shortcuts for common Markdown formatting

## User Experience Features

* Debounced rendering
* Scrolling
* Automatic content restoration
* Lightweight interface
* design

## Security Features

* HTML sanitization
* URL validation
* Protection against javascript: URL injection
* Safe rendering pipeline

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* Local Storage API
* Clipboard API
* Blob API
* DOM Manipulation
* Regular Expressions
* fonts from (https://fonts.google.com/specimen/Pixelify+Sans)
* icon from (https://www.pinterest.com/)

## File Descriptions

### index.html
Contains the applications structure.

### style.css
Responsible for styling.

### parser.js
Contains the custom Markdown parser.

### app.js
Handles rvent. Rendering.

## How It Works
- 1. User types Markdown into the editor.
- 2. Input event triggers the rendering process.
- 3. Markdown text is passed to the custom parser.
- 4. Parser converts Markdown into sanitized HTML.
- 5. HTML is inserted into the preview pane.

# Challenges
Building a Markdown previewer was complex. I had to create a parser using regular expressions. Supporting formatting styles requires careful ordering of parsing operations.

- Security:
I had to learn about Cross-Site Scripting (XSS) attacks and sanitize user input.

- Code Blocks:
Handling code blocks was difficult. Inline code needed to be protected from formatting rules.

- Scroll Synchronization:
Synchronizing the editor scroll position with the preview pane was a challenge.

- Browser APIs:
Features such as Local Storage and Clipboard access behave differently.

- Debugging:
Debugging syntax errors, in JavaScript was a part of the project.

- What I Learned:
This project taught me about parsing and text processing. I gained an understanding of how browsers process and render content.

- JavaScript Fundamentals:
I improved my understanding of JavaScript fundamentals.

- Project Organization:
The project reinforced the importance of design.

- Debugging Skills:
The project strengthened my debugging skills.

- Software Development:
The project showed that software development is rarely a path.
