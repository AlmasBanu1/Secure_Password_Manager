# 🔐 Secure Password Manager

## 📖 Project Vision

Build a complete Password Manager while learning JavaScript from the basics.

Each version introduces one or more new JavaScript concepts. The project grows alongside my JavaScript knowledge.

---

# 🚀 Completed Milestones

## ✅ Version 1

**Features**
- Basic password strength validation

**JavaScript Concepts Used**
- Variables
- Conditions
- Functions

---

## ✅ Version 2

**Features**
- Strong Password
- Medium Password
- Weak Password

**JavaScript Concepts Used**
- if...else if...else
- return

---

## ✅ Version 3

**Features**
- Character-by-character password scanning

**JavaScript Concepts Used**
- Loops
- Strings
- Character access using indexing

---

## ✅ Version 4

**Features**
- Dynamic uppercase letter detection
- Dynamic numeric digit detection

**JavaScript Concepts Used**
- Character range comparison
- Loop through every character
- Boolean flags

---

## ✅ Version 5

**Features**
- Dynamic uppercase letter detection
- Dynamic lowercase letter detection
- Dynamic numeric digit detection

**JavaScript Concepts Used**
- Character range comparison
- Loop through every character
- Boolean flags
- Conditional statements

---

## ✅ Version 6

**Features**
- Dynamic uppercase letter detection
- Dynamic lowercase letter detection
- Dynamic numeric digit detection
- Dynamic special character detection

**JavaScript Concepts Used**
- Character range comparison
- Loop through every character
- Boolean flags
- Logical NOT (`!`)
- Boolean expressions

---

## ✅ Version 7

**Features**
- Password score calculation
- Weak / Medium / Strong classification
- Dynamic evaluation using scoring rules

**JavaScript Concepts Used**
- Functions
- Loops
- Character range comparison
- Boolean flags
- Conditional statements
- Score calculation

---

## ✅ Version 8

**Features**
- Generate one random uppercase letter
- Generate one random lowercase letter
- Generate one random number
- Generate one random special character
- Store generated characters inside an array

**JavaScript Concepts Used**
- Arrays
- Strings
- Random number generation
- Math functions

---

## ✅ Version 9

**Features**
- Shuffle password characters
- Build final password
- Generate randomized password

**JavaScript Concepts Used**
- Arrays
- Swapping
- Temporary variables
- String concatenation

---

## ✅ Version 10

**Features**
- Custom password length
- Mandatory character rules
- Input validation

**JavaScript Concepts Used**
- Arrays
- push()
- Conditions
- Loops

---

## ✅ Version 11

**Features**
- Refactor into reusable helper functions

**JavaScript Concepts Used**
- Functions
- Parameters
- Return
- Modular programming
- Code refactoring

---

## ✅ Version 12

**Features**
- Generate multiple passwords
- Store passwords
- Display passwords

**JavaScript Concepts Used**
- Arrays
- Functions
- push()
- length

---

## ✅ Version 13

**Features**
- Search password
- Linear Search

**JavaScript Concepts Used**
- Arrays
- Linear Search
- break
- Boolean variables

---

## ✅ Version 14

**Features**
- Update password

**JavaScript Concepts Used**
- Arrays
- Linear Search
- Array indexing
- break

---

## ✅ Version 15

**Features**
- Delete password
- Manual left-shift deletion

**JavaScript Concepts Used**
- Nested loops
- pop()
- Linear Search

---

## ✅ Version 16

** Features **
- Create reusable `searchPassword()` function
- Search passwords using function calls
- Return search result
- Improve code modularity

** JavaScript Concepts Used **
- Function Design
- Function Parameters
- Return Values
- Boolean Return
- Code Reusability
- Modular Programming

---

## ✅ Version 17

** Features **
- Create reusable `displayPasswords()` function
- Display all stored passwords using function calls
- Eliminate repeated display loops
- Improve code readability and modularity

** JavaScript Concepts Used **
- Function Design
- Function Parameters
- Code Reusability
- Clean Code
- Refactoring
- Modular Programming

---

## ✅ Version 18

** Features **
- Create reusable `updatePassword()` function
- Update passwords using function calls
- Return update status
- Improve code modularity

** JavaScript Concepts Used **
- Function Design
- Function Parameters
- Function Composition
- Boolean Return
- Code Reusability
- Modular Programming

---

## ✅ Version 19

### Refactor Delete Module

**Features**

- Create reusable `deletePassword()` function
- Delete passwords using function calls
- Return deletion status
- Improve code modularity

**JavaScript Concepts Used**

- Function Design
- Function Parameters
- Function Composition
- Boolean Return
- Code Reusability
- Modular Programming

---

## ✅ Version 20

### Refactor Generate & Search Modules

**Features**

- Create reusable `generatePasswords()` function
- Generate multiple passwords using function calls
- Return an array of generated passwords
- Replace manual password generation loop
- Improve overall project architecture
- Search passwords using built-in array methods
- Find matching passwords
- Find password indexes
- Display passwords using `forEach()`
- Update passwords using `findIndex()`

**JavaScript Concepts Used**

- Function Design
- Function Parameters
- Function Composition
- Arrays
- Array `push()`
- `return`
- Code Reusability
- Modular Programming
- Project Architecture
- Built-in Array Methods

**Built-in Methods Used**

- `includes()`
- `indexOf()`
- `find()`
- `findIndex()`
- `forEach()`

---

## ✅ Version 21

### JavaScript Built-in Update & Delete Methods

**Features**

- Delete passwords using `splice()`
- Locate passwords using `findIndex()`
- Simplify password deletion
- Remove manual array shifting logic
- Compare manual deletion with built-in implementation
- Keep password update logic using `findIndex()`

**JavaScript Concepts Used**

- `findIndex()`
- `splice()`
- Array indexing
- Boolean return values
- Function composition
- Code reusability
- Modular programming

---

## ✅ Version 22

### Build Command Line Interface (CLI)

**Features**

- Interactive menu
- User input
- Execute operations through menu
- Generate password operation
- Display password operation
- Search password operation
- Update password operation
- Delete password operation
- Invalid choice handling
- Exit option
- Repeating menu-driven program flow

**JavaScript Concepts Used**

- Node.js `readline`
- User interaction
- User input
- Program flow
- Conditional statements
- Menu-driven applications
- Callback functions
- Recursive function calls for menu repetition
- Function composition
- Code reusability

**CLI Operations**

1. Generate Password
2. Display Passwords
3. Search Password
4. Update Password
5. Delete Password
6. Exit

---

## ✅ Version 23

### Store Passwords in Files

**Features**

- Load passwords from a JSON file
- Save passwords to a JSON file
- Persist passwords between program executions
- Save newly generated passwords
- Save updated passwords
- Save deleted-password changes
- Handle missing JSON file
- Handle empty JSON file
- Handle invalid JSON data

**JavaScript Concepts Used**

- Node.js `fs` module
- File handling
- JSON
- `JSON.parse()`
- `JSON.stringify()`
- `fs.existsSync()`
- `fs.readFileSync()`
- `fs.writeFileSync()`
- `try...catch`
- Persistent data storage
- Error handling

**File**

- `passwords.json`

---

## ✅ Version 24

### Encrypt Passwords

**Features**

- Encrypt passwords before saving
- Decrypt passwords when loading
- Use AES-256-CBC encryption
- Generate a random IV for every encryption
- Store IV with encrypted password
- Protect stored password data
- Store encryption key in environment variables
- Keep `.env` and `passwords.json` out of Git

**JavaScript Concepts Used**

- Node.js `crypto` module
- AES-256-CBC
- Encryption
- Decryption
- Random initialization vectors (IV)
- `crypto.randomBytes()`
- `crypto.createCipheriv()`
- `crypto.createDecipheriv()`
- `crypto.scryptSync()`
- Environment variables
- `dotenv`
- `.gitignore`
- Cryptography fundamentals
- Security principles

**Files**

- `password-strength-checker-v24.js`
- `.env`
- `passwords.json`

---

## Version 25

### Improve Password Security

**Features**

- Upgrade encryption from AES-256-CBC to AES-256-GCM
- Encrypt passwords before saving
- Decrypt passwords when loading
- Generate a random salt for every password
- Generate a random IV for every encryption
- Store authentication tag with encrypted password
- Detect modified or tampered encrypted data
- Detect incorrect encryption keys
- Protect stored password data
- Store encryption key in environment variables
- Handle encryption and decryption errors
- Keep .env and password files out of Git

**JavaScript Concepts Used**

- Node.js crypto module
- AES-256-GCM
- Authenticated encryption
- Encryption
- Decryption
- Random salt
- Random initialization vectors (IV)
- Authentication tags
- crypto.randomBytes()
- crypto.createCipheriv()
- crypto.createDecipheriv()
- cipher.getAuthTag()
- decipher.setAuthTag()
- crypto.scryptSync()
- Environment variables
- dotenv
- .gitignore
- Cryptography fundamentals
- Data integrity
- Tamper detection
- Security best practices

**Files**

- password-strength-checker-v25.js
- .env
- passwords.json
- passwords-v24-backup.json

# 🚀 Upcoming Milestones

## ⬜ Version 26

### Build Frontend Interface

**Features**

- User Interface
- Password input form
- Buttons
- Password list
- Search interface
- Update and delete controls

**JavaScript Concepts**

- DOM Manipulation
- Events
- Forms
- Event Handling

---

## ⬜ Version 27

### Connect Frontend with Backend

**Features**

- Connect frontend to backend
- Send password data
- Receive password data
- Perform password operations through API

**JavaScript Concepts**

- HTTP Requests
- Fetch API
- REST API
- Client-Server Communication

---

## ⬜ Version 28

### Connect Database

**Features**

- Store passwords permanently
- Retrieve passwords
- Update stored passwords
- Delete stored passwords

**Technologies**

- Node.js
- Express
- MongoDB / MySQL

---

## ⬜ Version 29

### Final Project Refactoring

**Features**

- Improve folder structure
- Separate modules
- Error handling
- Code cleanup
- Remove duplicate code
- Improve security
- Optimize project architecture

**Concepts**

- Modular Architecture
- Error Handling
- Clean Code
- Code Optimization
- Software Engineering Practices

---

## ⬜ Version 30

### Testing & Security Improvements

**Features**

- Input validation
- Password validation
- Error handling
- Test password operations
- Test file operations
- Test database operations
- Security review

**Concepts**

- Testing
- Validation
- Error Handling
- Security Testing

---

## ⬜ Version 31

### Final Documentation & Deployment

**Features**

- README
- Project screenshots
- Installation Guide
- Usage Guide
- Project Architecture Documentation
- Security Documentation
- Deployment
- Portfolio Ready Project

**Final Outcome**

A complete professional Secure Password Manager suitable for:

- GitHub Portfolio
- Resume Project
- Internship Applications
- Placement Interviews

---

# 🎯 Final Goal

Develop a complete Secure Password Manager that demonstrates:

- JavaScript Fundamentals
- Problem Solving
- Data Structures & Algorithms
- Clean Coding Practices
- Modular Programming
- Software Engineering Principles
- Built-in JavaScript Methods
- File Handling
- JSON
- Encryption
- Security Concepts
- CLI Development
- Frontend Development
- Backend Development
- API Communication
- Database Integration
- Testing
- Error Handling
- Project Deployment

This project will serve as both a complete JavaScript
learning journey and a professional portfolio project.