# MarkdownPreX
The Real-Time Markdown Previewer is a web application built using Vanilla JavaScript, HTML, and CSS that allows users to write Markdown text and instantly see the rendered HTML output in a live preview pane. The goal of this project was to gain a deeper understanding of how Markdown parsers work behind the scenes while also learning more about DOM manipulation, browser APIs, text processing, and frontend application architecture.
Unlike many Markdown editors that rely on third-party libraries, this project implements a custom Markdown parser from scratch. The parser converts Markdown syntax into HTML while applying sanitization techniques to reduce potential security risks such as HTML injection and malicious script execution.
The application includes features such as live preview rendering, local storage persistence, synchronized scrolling, toolbar shortcuts, HTML export functionality, Markdown file downloads, and basic syntax highlighting for code blocks.

# Features
## Core Features
* Real-time Markdown rendering
* Custom Markdown parser built from scratch
* Live preview pane
* Headings support (# through ######)
* Bold and italic formatting
* Inline code support
* Fenced code blocks
* Ordered and unordered lists
* Blockquotes
* Horizontal rules
* Hyperlinks
* Images
* Local storage persistence
* Download Markdown as a .md file
* Copy rendered HTML to clipboard
* Toolbar shortcuts for common Markdown formatting

## User Experience Features

* Debounced rendering for smoother performance
* Synchronized scrolling between editor and preview
* Automatic content restoration after page refresh
* Lightweight interface with no external dependencies
* Responsive and easy-to-use design

### Security Features

* HTML sanitization
* URL validation
* Protection against javascript: URL injection
* Safe rendering pipeline

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6 Modules)
* Local Storage API
* Clipboard API
* Blob API
* DOM Manipulation
* Regular Expressions

## File Descriptions

### index.html

Contains the application's structure including the editor, preview pane, toolbar, and action buttons.

### style.css

Responsible for styling the user interface, layout, typography, responsiveness, and syntax highlighting.

### parser.js

Contains the custom Markdown parser responsible for:

* Parsing Markdown syntax
* Sanitizing user input
* Generating safe HTML output
* Processing inline and block-level Markdown elements

### app.js

Handles:

* Event listeners
* Rendering workflow
* Local storage persistence
* Toolbar actions
* Clipboard functionality
* File downloads
* Syntax highlighting
* Scroll synchronization

## How It Works

The application follows a simple pipeline:

1. User types Markdown into the editor.
2. Input event triggers the rendering process.
3. Markdown text is passed to the custom parser.
4. Parser converts Markdown into sanitized HTML.
5. HTML is inserted into the preview pane.
6. Syntax highlighting is applied.
7. Content is automatically saved to Local Storage.

This process repeats in real time as the user types.


# Challenges I Faced During This Project

This project turned out to be much more complex than I originally expected. At first glance, building a Markdown previewer seemed straightforward: take some text, convert it to HTML, and display it. However, once I started implementing the parser, I realized how many edge cases and technical details are involved.
One of the biggest challenges was creating a Markdown parser using regular expressions. Markdown appears simple when used casually, but supporting multiple formatting styles such as bold text, italic text, code blocks, links, images, lists, and headings requires careful ordering of parsing operations. If one regular expression runs before another, it can accidentally modify content that should have remained unchanged.
Another challenge involved security. Since the application renders user-generated content into HTML, I had to learn about Cross-Site Scripting (XSS) attacks and understand why sanitizing user input is important. Initially, I focused only on functionality, but later realized that rendering unsanitized HTML could introduce serious security vulnerabilities.
Handling code blocks also presented difficulties. Inline code needed to be protected from other formatting rules so that Markdown syntax inside code spans would not be processed accidentally. Managing this correctly required additional logic and careful testing.
Synchronizing the editor scroll position with the preview pane was another challenge. The editor and preview often have different heights because rendered HTML occupies space differently than raw Markdown text. Calculating scroll ratios and maintaining smooth synchronization required experimentation and debugging.
I also encountered issues with browser APIs. Features such as Local Storage, Clipboard access, file downloads, and ES6 module imports behave differently depending on the environment. Learning why modules require a local web server instead of opening files directly was an important lesson.
Debugging syntax errors in JavaScript was another major part of the project. Small mistakes such as missing braces, malformed regular expressions, or incorrect string escaping often caused the application to stop working entirely. Tracking down these issues improved my debugging skills significantly.

# What I Learned

This project taught me much more than just Markdown parsing.First, I gained a stronger understanding of how browsers process and render content. I learned how HTML, CSS, and JavaScript interact to create dynamic user interfaces.
I also improved my understanding of JavaScript fundamentals, including:

* Functions
* Event listeners
* Modules
* Arrow functions
* Template literals
* Arrays
* Objects
* Error handling
* DOM manipulation

One of the most valuable lessons was learning how text processing works. By building a parser from scratch, I developed a deeper understanding of regular expressions and how they can be used to recognize patterns and transform data.
I also learned about security concepts that many beginner projects overlook. Understanding why sanitization matters and how malicious input can affect a web application was an eye-opening experience.
Another important lesson was project organization. Separating functionality into multiple files made the codebase easier to understand and maintain. This reinforced the importance of modular design and clean architecture.
The project also strengthened my debugging skills. Rather than immediately searching for answers, I learned how to inspect browser errors, analyze stack traces, test assumptions, and systematically isolate problems.
Perhaps the biggest lesson was realizing that software development is rarely a straight path. Many features required multiple revisions before they worked correctly. Learning how to iterate and improve code over time was just as valuable as the final result.



