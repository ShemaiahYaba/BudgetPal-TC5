# TechCrush Backend Engineering Track — Course Notes

**Tutor:** Oluwatobi Adelabu  
**Track:** Backend Engineering with Node.js

---

## Table of Contents

1. [Introduction — Thinking Like a Backend Engineer](#introduction)
2. [Week 1 — Node.js, Tools & Environment Setup](#week-1)
3. [Week 1 (Doc 2) — Introduction to Backend JavaScript](#week-1-doc-2)
4. [Week 3 — Backend JavaScript Part 2 (Arrays, Objects, OOP)](#week-3)
5. [Week 4 — NPM and Modules](#week-4)
6. [Week 5 — ES Modules, Git & GitHub](#week-5)
7. [Week 6 — HTTP Module & Introduction to Express.js](#week-6)
8. [Week 7 (Doc 2) — RESTful APIs & Express.js Essentials](#week-7-doc-2)
9. [Week 7 (Doc 1) — Express.js Params, Cookies & Validation](#week-7-doc-1)
10. [Week 8 — Databases with Express.js](#week-8)

---

## Introduction — Thinking Like a Backend Engineer {#introduction}

### Who is a Backend Engineer?

A backend engineer is a software engineer who specializes in the server-side of applications, focusing on:
- Core computational logic
- Databases and data architecture
- APIs (Application Programming Interfaces)
- Background processes that power what users see on the frontend

### Core Responsibilities

| Area | Description |
|------|-------------|
| Server-Side Development | Creating and maintaining server-side logic, business rules, workflows |
| Database Management | Designing schemas, optimizing queries, managing migrations and data integrity |
| API Development | Designing RESTful APIs, creating documentation, managing authentication |
| System Architecture | Designing scalable systems, caching strategies, high availability planning |

### Technical Skills Required

- **Languages:** JavaScript (Node.js), Python, Ruby, Java, PHP, C#, Go
- **Frameworks:** Express.js, NestJS, Django, Ruby on Rails, ASP.NET, Spring Boot
- **Databases:** MySQL, PostgreSQL (relational); MongoDB, Redis (NoSQL)
- **Tools:** Git, CI/CD, Docker, Kubernetes, Cloud platforms (AWS, Azure, GCP)

### Soft Skills

Patience, dedication, problem-solving, analytical thinking, communication, team collaboration, documentation, time management.

---

### Thinking Like a Backend Engineer

**Problem-Solving Strategies**
- Break complex problems into smaller, manageable parts
- Identify and prioritize key features and requirements
- Develop and test hypotheses early
- Refactor and optimize code
- Collaborate with frontend devs, designers, and PMs

**Mindset Shifts**
- Think server-side: Focus on data storage, processing, and retrieval
- Consider scalability: Design for high traffic and large datasets
- Ensure security: Protect sensitive data and prevent vulnerabilities
- Optimize performance: Minimize latency, maximize throughput
- Embrace modularity: Organize code into reusable components

---

### GRIT in Backend Engineering

GRIT (Passion + Perseverance toward long-term goals) is crucial because:

- **Debugging:** A gritty engineer keeps pushing until the problem is solved
- **Mastering Complex Concepts:** Continuously learns and refines their craft
- **Handling System Failures:** Stays calm, analyzes logs, finds root causes
- **Building Scalable Systems:** Avoids shortcuts and technical debt
- **Staying Consistent:** Learns from mistakes and adapts

**How to develop GRIT:**
- Adopt a Growth Mindset — treat challenges as learning opportunities
- Set Long-Term Goals — aim beyond just fixing bugs
- Embrace Failure — the best engineers have broken production at least once
- Build Resilience — stay consistent
- Stay Curious — read docs, experiment with new technologies

---

### Best Practices & Development Principles

**SOLID Principles**
- **S** — Single Responsibility: Each module/class should do one thing
- **O** — Open/Closed: Open for extension, closed for modification
- **L** — Liskov Substitution: Subclasses should replace parent classes without breaking things
- **I** — Interface Segregation: Break large interfaces into smaller, focused ones
- **D** — Dependency Inversion: High-level modules should depend on abstractions, not low-level modules

**Design Patterns**
- **MVC (Model-View-Controller):** Separates data, UI, and business logic
- **Microservices:** Breaks monolithic apps into smaller, independent services

**Development Principles**
- **DRY** — Don't Repeat Yourself
- **KISS** — Keep It Simple, Stupid
- **YAGNI** — You Ain't Gonna Need It
- **CQS** — Command-Query Separation
- **SoC** — Separation of Concerns

---

## Week 1 — Node.js, Tools & Environment Setup {#week-1}

### What is Backend Engineering?

Backend engineering refers to the server-side of an application — everything that communicates between the database and the browser. Think of it as the engine under the hood of a car: essential but not always visible.

### What is Node.js?

An open-source, cross-platform JavaScript runtime environment that allows execution of JavaScript **outside a web browser**. Built on Chrome's V8 engine. Created by Ryan Dahl in 2009.

### Features of Node.js

**Event-Driven**
- The flow of the program is determined by events (user actions, outputs, messages)
- An event loop listens for events and triggers callback functions

**Non-blocking I/O Model**
- Operations like reading a file or querying a database don't halt execution
- Node.js continues processing other tasks while waiting
- When the operation finishes, it triggers an event and the callback runs

**Practical Example:** If a Node.js server receives 1000 simultaneous requests requiring database queries, it doesn't create 1000 threads. It initiates all 1000 queries and continues listening. As each completes, it triggers an event and processes the response.

### Node.js vs Other Backend Languages

| Language | Strengths | Weaknesses | Ideal For |
|----------|-----------|------------|-----------|
| Node.js | Non-blocking I/O, unified JS stack, rich npm ecosystem | Poor for CPU-heavy tasks | Real-time apps, APIs, microservices |
| PHP | Easy to learn, great for CMS | Slower, limited concurrency | Legacy websites, WordPress |
| Python | Readable syntax, strong AI/ML | Slower execution | Data science, AI, enterprise apps |
| Java | Multithreading, enterprise stability | Verbose, steep learning curve | Banking, large-scale systems |
| Go | Native concurrency, fast compilation | Less mature ecosystem | Cloud services, high-performance APIs |

**Use Node.js for:** Real-time apps, APIs/microservices, I/O-heavy workloads, full-stack JS apps  
**Avoid Node.js for:** CPU-intensive tasks (e.g., video encoding), apps needing strict multithreading

---

### Environment Setup

**Required Tools**
- **Node.js** (LTS version) — [nodejs.org](https://nodejs.org)
  - Verify: `node -v` and `npm -v`
- **VS Code** — [code.visualstudio.com](https://code.visualstudio.com)
- **Postman** — [postman.com/downloads](https://postman.com/downloads)
- **MongoDB** (Community Edition)
- **MySQL** — verify with `mysql --version`
- **Git** — verify with `git -v`
- **GitHub account**

**Recommended VS Code Extensions:** GitLens, Prettier, CodeSnap, DotEnv

### Key VS Code Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open folder | `Ctrl+K, Ctrl+O` | `Cmd+K, Cmd+O` |
| Explorer panel | `Ctrl+Shift+E` | `Cmd+Shift+E` |
| New file | `Ctrl+N` | `Cmd+N` |
| Open terminal | `Ctrl+\`` | `Cmd+\`` |
| Save file | `Ctrl+S` | `Cmd+S` |
| Switch tabs | `Ctrl+Tab` | `Cmd+Tab` |
| Close file | `Ctrl+W` | `Cmd+W` |

---

## Week 1 (Doc 2) — Introduction to Backend JavaScript {#week-1-doc-2}

### Your First Node.js Script

```js
console.log("Welcome to Node.js Bootcamp!");
// Run with: node app.js
```

### Node.js Global Objects

| Object | Description |
|--------|-------------|
| `__dirname` | Directory of the current module |
| `__filename` | File name of the current module |
| `console.log()` | Outputs messages to the console |
| `global` | Makes a variable accessible throughout the app |
| `process` | Provides info and control over the current Node.js process |
| `require` / `exports` | Export and import modules (CommonJS) |
| `setTimeout()` / `setInterval()` | Execute code after a delay or repeatedly |

### Server-Side vs Client-Side JavaScript

| Aspect | Server-Side (Node.js) | Client-Side (Browser) |
|--------|-----------------------|-----------------------|
| Runtime | Node.js server | User's browser |
| Purpose | Business logic, databases, APIs | UI, DOM manipulation |
| System Access | Files, databases, server resources | Limited to browser APIs |
| Global Object | `global` | `window` |
| DOM Access | None | Full access |
| Modules | CommonJS / ESM | ESM or script tags |

---

### JavaScript Fundamentals in Node.js

#### Variables & Constants

```js
let myAge = 5;           // block-scoped, can be reassigned
const pi = 3.14;         // constant, cannot be reassigned
```

**Naming Conventions:** camelCase, snake_case, or PascalCase. Must start with a letter, `_`, or `$`. Case-sensitive.

#### Data Types

```js
let age = 25;                        // Number (integer)
let price = 19.99;                   // Number (float)
let name = "John";                   // String
let isAdult = true;                  // Boolean
let value = null;                    // Null (intentional absence)
let home;                            // Undefined (declared but not assigned)
let person = { name: "Alice" };      // Object
let numbers = [1, 2, 3, 4];         // Array
```

#### Type Casting

```js
Number("123")       // → 123
String(456)         // → "456"
Boolean(0)          // → false
parseInt("42")      // → 42
parseFloat("42.56") // → 42.56
```

#### Operators

**Arithmetic:** `+`, `-`, `*`, `/`, `%`, `++`, `--`, `**`  
**Assignment:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`  
**Comparison:** `==`, `!=`, `===`, `!==`, `>`, `<`, `>=`, `<=`  
**Logical:** `&&`, `||`, `!`  
**Ternary:** `condition ? valueIfTrue : valueIfFalse`  
**Spread:** `...arr`  
**Nullish Coalescing:** `value ?? "default"`

> **Note:** Always prefer `===` (strict equality) over `==` (loose equality)

#### Conditional Statements

```js
// if/else
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// switch
switch (color) {
    case "red":
        console.log("Red");
        break;
    default:
        console.log("Unknown");
}
```

#### Loops

```js
for (let i = 0; i < 5; i++) { }           // for loop
while (i < 5) { }                          // while loop
do { } while (j < 5);                      // do...while
for (let fruit of fruits) { }              // for...of (arrays)
for (let key in person) { }               // for...in (objects)
```

#### Functions

```js
// Function Declaration (can be hoisted)
function greet() { console.log("Hello!"); }

// Function Expression
let sayHi = function() { console.log("Hi!"); };

// Arrow Function
let add = (a, b) => a + b;

// With parameters and return value
function multiply(a, b) { return a * b; }

// Higher-order function (accepts a function as argument)
function operate(a, b, operation) { return operation(a, b); }

// Function that returns a function
function createGreeter(greeting) {
    return function(name) { return `${greeting}, ${name}!`; };
}
```

---

## Week 3 — Backend JavaScript Part 2 {#week-3}

### Arrays

```js
let fruits = ["apple", "banana", "cherry"];

fruits[0];           // "apple" (zero-indexed)
fruits.push("orange"); // Add to end
fruits.pop();        // Remove from end
```

### Objects

```js
let car = { color: "red", make: "Toyota", model: "Corolla" };

car.color;           // "red" — dot notation
car["color"];        // "red" — bracket notation
car.year = 2020;     // Add property
delete car.model;    // Remove property
"color" in car;      // true — check property exists

// Useful Object methods
Object.keys(obj)     // → array of keys
Object.values(obj)   // → array of values
Object.entries(obj)  // → array of [key, value] pairs
Object.assign({}, obj)  // shallow copy
Object.freeze(obj)   // prevent modifications
```

### Classes & OOP

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
}
const john = new Person("John", 30);
john.greet();
```

**Static Methods** — called on the class, not instances:
```js
class MathHelper {
    static add(a, b) { return a + b; }
}
MathHelper.add(3, 4); // 7
```

**Private Fields:**
```js
class BankAccount {
    #balance = 0;   // private field
    deposit(amount) { this.#balance += amount; }
    get balance() { return this.#balance; }
}
```

### The Four Pillars of OOP

**1. Inheritance**
```js
class Animal { speak() { console.log("Sound"); } }
class Dog extends Animal { speak() { console.log("Bark"); } }
```

**2. Encapsulation** — bundling data and methods, hiding internal state with private fields (`#`)

**3. Abstraction** — hiding complex implementation details, exposing only what's needed

**4. Polymorphism** — different classes used interchangeably through a shared interface

### Closures

```js
function counter() {
    let count = 0;
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
}
const myCounter = counter();
myCounter.increment(); // 1
myCounter.increment(); // 2
```

---

## Week 4 — NPM and Modules {#week-4}

### What is NPM?

Node Package Manager — the default package manager for Node.js. Created by Isaac Z. Schlueter in 2010. Simplifies installing, updating, and managing third-party libraries.

### Essential NPM Commands

```bash
npm init              # Initialize project (interactive)
npm init -y           # Initialize with defaults

npm install package   # Install and add to dependencies
npm i package         # Shorthand
npm install package@1.2.3  # Install specific version
npm install package --save-dev  # Dev dependency only
npm i -D package      # Shorthand for dev dependency

npm uninstall package # Remove a package
npm update            # Update all packages
npm list              # List installed packages
npm run script-name   # Run a script from package.json
```

### package.json

```json
{
  "name": "techcrush-project",
  "version": "1.0.0",
  "description": "A project description",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6"
  }
}
```

### Semantic Versioning (SemVer)

Format: `MAJOR.MINOR.PATCH`

| Symbol | Meaning | Example |
|--------|---------|---------|
| `4.17.1` | Exact version | Only 4.17.1 |
| `^4.17.1` | Compatible with 4.x.x | ≥4.17.1 but <5.0.0 |
| `~4.17.1` | Patch updates only | ≥4.17.1 but <4.18.0 |
| `*` | Latest (not for production) | Any version |

### Importing Modules (CommonJS)

```js
const path = require('path');             // Built-in module
const colors = require('colors');         // Third-party module
const greetings = require('./my_module/greetings'); // Custom module
```

### Exporting Modules (CommonJS)

```js
// greetings.js
function sayHello(name) { return `Hello, ${name}!`; }
function sayGoodbye(name) { return `Goodbye, ${name}!`; }

module.exports = { sayHello, sayGoodbye };
```

### Key Built-in Node.js Modules

`fs`, `path`, `http/https`, `url`, `util`, `crypto`, `os`, `events`, `stream`, `buffer`, `child_process`, `readline`, `zlib`

---

## Week 5 — ES Modules, Git & GitHub {#week-5}

### ES Modules (ESM)

Introduced in ES6 (ECMAScript 2015). Key features:
- **Static Structure** — imports/exports determined at load time
- **Strict Mode** — automatically enabled
- **Module Scope** — variables scoped to module, not global

**Enabling ESM:** Add `"type": "module"` to `package.json`

> **Note:** When using ESM, `require()` and `module.exports` are NOT available. Use `import`/`export` instead. `__dirname` and `__filename` are also not available — use `import.meta.url`.

### ESM Syntax

```js
// Named exports
export const myVariable = 42;
export function myFunction() { }

// Default export
export default function myFunction() { }

// Named imports
import { myFunction, myVariable } from './myModule.js';

// Default import
import myDefaultExport from './myModule.js';

// Import everything
import * as utils from './utils.js';

// Rename on import
import { renamedVariable as myVar } from './myModule.js';

// Re-export from another module
export * from './myOtherModule.js';

// Dynamic import
const module = await import('./myModule.js');
```

### Error Handling

```js
try {
    const result = await riskyOperation();
    return result;
} catch (error) {
    console.error(error);
    throw new Error('Operation failed');
} finally {
    // always runs
}
```

### Destructuring

```js
const [result1, result2] = ["value 1", "value 2"];
const { name, age } = person;
```

---

### Git & GitHub

**Git** is a distributed version control system that tracks changes to files.

**Key features:** Version control, branching & merging, distributed (every dev has a full copy), handles large codebases.

**GitHub** is a platform for hosting Git repositories. Alternatives: GitLab, Bitbucket.

### Essential Git Commands

```bash
# Setup
git init                          # Initialize a repo
git config --global user.name "Name"
git config --global user.email "email"

# Staging & Committing
git add <file>                    # Stage a file
git add .                         # Stage all changes
git commit -m "message"           # Commit with message
git commit --amend                # Modify last commit

# Remote
git remote add origin <url>       # Add remote
git push origin <branch>          # Push to remote
git push -u origin main           # Push and set upstream
git pull origin <branch>          # Pull latest changes
git clone <url>                   # Clone a repository

# Branches
git branch <name>                 # Create branch
git checkout <branch>             # Switch to branch
git checkout -b <branch>          # Create and switch
git merge <branch>                # Merge branch into current
git rebase <branch>               # Rebase (advanced merging)

# Status & History
git status                        # Check working directory state
git log --oneline                 # View compact commit history
git diff                          # View unstaged changes

# Reset
git reset --soft                  # Unstage, keep changes
git reset --hard                  # Delete all changes permanently
```

### .gitignore

```
node_modules
.env
```

### Git Best Practices

- Write meaningful commit messages: describe *what* changed and *why*
- Use branches for every new feature
- Never commit directly to `main`/`master` in team projects
- Always pull before pushing

---

## Week 6 — HTTP Module & Introduction to Express.js {#week-6}

### Understanding URLs

```
https://www.example.com:8080/path/to/resource?query=search#section
```

| Part | Example | Description |
|------|---------|-------------|
| Protocol | `https://` | Communication protocol |
| Host | `www.example.com` | Domain name or IP |
| Port | `:8080` | Server port (80=HTTP, 443=HTTPS) |
| Path | `/path/to/resource` | Resource location on server |
| Query String | `?query=search` | Key-value data passed to server |
| Fragment | `#section` | Client-side anchor |

### Node.js HTTP Module

```js
import http from 'http';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
```

**With routing and JSON responses:**
```js
import http from 'http';
import url from 'url';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    switch (parsedUrl.pathname) {
        case '/':
            res.end('Hello, World!');
            break;
        case '/user':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ name: 'John', age: 30 }));
            break;
        default:
            res.statusCode = 404;
            res.end(JSON.stringify({ error: '404 Not Found' }));
    }
});
```

### HTTP Status Codes

| Range | Category | Common Codes |
|-------|----------|-------------|
| 1xx | Informational | 100 Continue |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 304 Not Modified |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict |
| 5xx | Server Error | 500 Internal Server Error, 503 Service Unavailable |

---

### Introduction to Express.js

Express.js is a lightweight, flexible, non-opinionated Node.js web framework for building web applications and APIs.

**Install:** `npm install express`

**Key Features:** Middleware support, routing, error handling, templating engines, static file serving.

### HTTP Verbs

| Verb | Use Case |
|------|----------|
| GET | Retrieve data |
| POST | Create a new resource |
| PUT | Replace/update an existing resource entirely |
| PATCH | Partially update a resource |
| DELETE | Remove a resource |
| HEAD | Retrieve headers only (no body) |
| OPTIONS | Describe communication options (used in CORS) |

### Basic Express Server

```js
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to our Express.js server!');
});

app.get('/about', (req, res) => {
    res.json({ message: 'About Us' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

### Using Express Router (Modularity)

```js
// routes/about.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'About Us' });
});

export default router;

// app.js
import aboutRoutes from './routes/about.js';
app.use('/about', aboutRoutes);
```

### EJS Templating Engine

```bash
npm install ejs
```

```js
// app.js
app.set('view engine', 'ejs');

app.get('/user', (req, res) => {
    res.render('index', { username: 'JohnDoe', email: 'johndoe@example.com' });
});
```

```html
<!-- views/index.ejs -->
<h1>Welcome, <%= username %>!</h1>
<p>Your email: <%= email %></p>
```

---

## Week 7 (Doc 2) — RESTful APIs & Express.js Essentials {#week-7-doc-2}

### What is a RESTful API?

A RESTful API (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP and communicates via JSON. Each request contains all the information needed to process it (stateless).

### Key Principles of REST

- **Stateless** — Server stores no client state between requests
- **Resource-Oriented** — Operates on resources identified by URLs (e.g., `/users`, `/products/1`)
- **Uniform Interface** — Consistent, predictable endpoint structure
- **Layered System** — Separation of concerns between business logic, database, and client layers
- **Cacheable** — Responses marked as cacheable or non-cacheable

### RESTful API Design Criteria

**Use HTTP Methods Properly**
```
GET    /users          # List all users
GET    /users/123      # Get specific user
POST   /users          # Create user
PUT    /users/123      # Update entire user
DELETE /users/123      # Delete user
```

**Resource Naming Rules**
- Use nouns, not verbs (`/users`, not `/getUsers`)
- Use plural names for collections (`/products`, not `/product`)

**Consistent Error Response Shape**
```json
{
    "success": false,
    "message": "Resource not found",
    "status": 404
}
```

**Other Best Practices**
- Use proper HTTP status codes
- Provide pagination: `?page=1&limit=20`
- Use API versioning: `/api/v1/users`
- Document with Swagger or Postman collections

---

### Handling Headers

```js
app.get('/profile', (req, res) => {
    const userAgent = req.get('User-Agent');   // Read request header
    res.set('X-Custom-Header', 'HelloWorld');  // Set response header
    res.status(200).send('Done');
});
```

### Handling Query Strings

```js
app.get('/search', (req, res) => {
    const query = req.query.query; // /search?query=express
    res.send(`You searched for: ${query}`);
});
```

### Handling POST / Form Data

```js
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json());                          // for JSON bodies

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    res.send(`Submitted by: ${name}`);
});
```

### File Uploads with Multer

```bash
npm install multer
```

```js
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads'); },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`File uploaded: ${req.file.filename}`);
});
```

### Middleware

```js
// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Auth middleware
const checkAuth = (req, res, next) => {
    if (req.headers['authorization']) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// Using middleware on a route
app.get('/protected', checkAuth, (req, res) => {
    res.send('Access granted');
});
```

### Request Object Summary

| Property | Description | Example |
|----------|-------------|---------|
| `req.query` | URL query string data | `/search?animal=dog` → `req.query.animal` |
| `req.body` | Data from POST/PUT body | Needs `express.json()` middleware |
| `req.params` | Route parameters | `/user/:id` → `req.params.id` |
| `req.headers` | HTTP request headers | `req.headers['user-agent']` |
| `req.cookies` | Cookies (needs `cookie-parser`) | `req.cookies['theme']` |
| `req.get()` | Get specific header | `req.get('User-Agent')` |

### Response Object Summary

| Method | Description |
|--------|-------------|
| `res.send()` | Send any response type |
| `res.json()` | Send JSON response |
| `res.status()` | Set HTTP status code |
| `res.cookie()` | Set a cookie |
| `res.redirect()` | Redirect to another URL |
| `res.render()` | Render a view (EJS, Pug, etc.) |

---

### Project Folder Structure

```
src/
├── config/         # DB connections, env variables
├── controllers/    # Request/response logic
├── models/         # Database schemas/models
├── routes/         # API endpoint definitions
├── services/       # Business logic
├── middlewares/    # Custom Express middleware
├── utils/          # Helper functions
├── helpers/        # Complex helper functions
└── app.js          # Main entry point
tests/              # Unit, integration, e2e tests
docs/               # API docs, schema docs
logs/               # Application logs
.env                # Environment variables
package.json
```

---

## Week 7 (Doc 1) — Params, Cookies & Validation {#week-7-doc-1}

### Route Parameters

```js
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is ${userId}`);
});

// Multiple params
app.get('/user/:id/:action', (req, res) => {
    const { id, action } = req.params;
    res.json({ id, action });
});
```

### Cookies with cookie-parser

```bash
npm install cookie-parser
```

```js
import cookieParser from 'cookie-parser';
app.use(cookieParser());

// Set a cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('theme', 'dark', { maxAge: 900000, httpOnly: true });
    res.send('Cookie set');
});

// Read a cookie
app.get('/get-cookie', (req, res) => {
    const theme = req.cookies['theme'];
    res.send(`Theme: ${theme}`);
});
```

---

### Input Validation with express-validator

```bash
npm install express-validator
```

```js
import { body, validationResult } from 'express-validator';

app.post('/signup', [
    body('email').isEmail().withMessage('Provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Min 8 characters')
                    .matches(/\d/).withMessage('Must contain a number')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('Signup successful');
});
```

### Validation Methods

| Method | Description |
|--------|-------------|
| `body()` | Validate request body |
| `query()` | Validate query string |
| `param()` | Validate route parameters |
| `header()` | Validate headers |
| `withMessage()` | Set error message for failed validation |

### String Validators

| Validator | Description |
|-----------|-------------|
| `isLength({ min, max })` | Check string length |
| `notEmpty()` | Ensure field is not empty |
| `isAlpha()` | Letters only |
| `isAlphanumeric()` | Letters and numbers |
| `isEmail()` | Valid email format |
| `isURL()` | Valid URL format |

### Numeric, Date & Boolean Validators

| Validator | Description |
|-----------|-------------|
| `isInt({ min, max })` | Integer in range |
| `isFloat({ min, max })` | Float in range |
| `isNumeric()` | Numbers only |
| `isDate()` | Valid date |
| `isBoolean()` | Boolean value |
| `isAfter(date)` / `isBefore(date)` | Date comparison |

### Sanitization Methods

| Method | Description |
|--------|-------------|
| `escape()` | Escape HTML tags |
| `normalizeEmail()` | Lowercase and normalize email |
| `trim()` | Remove surrounding whitespace |

### Custom Validator

```js
body('age').custom(value => {
    if (value < 18) {
        throw new Error('Must be at least 18');
    }
    return true;
});
```

---

## Week 8 — Databases with Express.js {#week-8}

### SQL vs NoSQL

| Feature | SQL | NoSQL |
|---------|-----|-------|
| Data Structure | Tables (relational) | Documents, key-value, graph |
| Schema | Fixed/predefined | Dynamic/flexible |
| Transactions | ACID compliant | BASE |
| Scalability | Vertical | Horizontal |
| Best For | Complex queries, structured data | Large volumes, flexible data |

### SQL Databases (Relational)
- **MySQL** — most popular open-source RDBMS
- **PostgreSQL** — advanced, extensibility-focused
- **MS SQL Server** — Microsoft ecosystem
- **Oracle** — enterprise-grade

**Use when:** Banking systems, e-commerce platforms, ERP systems

### NoSQL Databases
- **MongoDB** — document store (JSON-like)
- **Redis** — in-memory key-value store
- **Cassandra** — distributed wide-column store

**Use when:** Social media, real-time analytics, CMS

### CRUD Operations

| Operation | Description |
|-----------|-------------|
| **C**reate | Insert new record(s) |
| **R**ead | Retrieve some/all records |
| **U**pdate | Modify some/all record(s) |
| **D**elete | Remove some/all record(s) |

---

### MongoDB with Mongoose

**MongoDB** stores data in flexible, JSON-like documents within collections.

**Install:**
```bash
npm install mongoose
```

**Mongoose** is an ODM (Object Data Modeling) library that provides schema validation and manages relationships between data in MongoDB.

**Documentation:** [mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)

**Source code examples:** https://github.com/tobyemmanuel/techcrush-db-class

---

### MySQL with Sequelize

**MySQL** stores data in structured tables with defined schemas and relationships via foreign keys.

**Install:**
```bash
npm install mysql2
npm install sequelize
```

**Sequelize** is a promise-based ORM (Object-Relational Mapping) for MySQL, PostgreSQL, SQLite, and SQL Server. Allows using JavaScript objects instead of writing raw SQL.

**Documentation:** [sequelize.org/docs/v6/getting-started](https://sequelize.org/docs/v6/getting-started/)

**Source code examples:** https://github.com/tobyemmanuel/techcrush-db-class

---

## Quick Reference — Key Packages

| Package | Purpose | Install |
|---------|---------|---------|
| `express` | Web framework | `npm i express` |
| `mongoose` | MongoDB ODM | `npm i mongoose` |
| `mysql2` | MySQL driver | `npm i mysql2` |
| `sequelize` | SQL ORM | `npm i sequelize` |
| `multer` | File uploads | `npm i multer` |
| `express-validator` | Input validation | `npm i express-validator` |
| `cookie-parser` | Cookie handling | `npm i cookie-parser` |
| `ejs` | Templating engine | `npm i ejs` |
| `dotenv` | Environment variables | `npm i dotenv` |
| `chalk` | Colored console output | `npm i chalk` |
| `nodemailer` | Sending emails | `npm i nodemailer` |
| `jsonwebtoken` | JWT auth | `npm i jsonwebtoken` |
| `bcrypt` | Password hashing | `npm i bcrypt` |

---

## Key References

- Node.js Docs: https://nodejs.org/docs
- Express.js Docs: https://expressjs.com/en/5x/api.html
- express-validator: https://express-validator.github.io/docs
- Mongoose: https://mongoosejs.com/docs/guide.html
- Sequelize: https://sequelize.org/docs/v6/getting-started/
- NPM Docs: https://docs.npmjs.com/cli/v11/commands/npm
- Git Book: https://git-scm.com/book/en/v2
- GitHub Docs: https://docs.github.com/en
- MDN JavaScript Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript
