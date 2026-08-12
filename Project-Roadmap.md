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

---

## Version 26

Build Frontend Interface

**Features**

- Password generation and input
- Password list management
- Search and highlighting
- Show/hide and copy passwords
- Password strength detection
- Update and delete passwords
- Input validation and user feedback
- Responsive light UI

**Concepts**

- DOM Manipulation
- Events & Event Handling
- Arrays & Functions
- Input Validation
- Dynamic UI Updates
- Clipboard API
- Regular Expressions

**Files**

- index.html
- style.css
- script.js

---

## Version 27 — Backend/API Integration

**Features**

- Connect V26 frontend to Node.js/Express
- REST API
- GET, POST, PUT, DELETE
- Connect frontend ↔ backend
- Temporary in-memory password storage
- Basic API validation and error handling

**Concepts**

- Node.js
- Express.js
- REST API
- HTTP Methods
- Fetch API
- Client-Server Communication
- JSON
- Async/Await
- API Error Handling

**Files**

- backend/server.js
- frontend/script.js

---

## Version 28 — Database & Persistent Storage

**Features**

- MongoDB Community Server integration
- MongoDB database connection
- Persistent password storage
- Create password records
- Read password records
- Update password records
- Delete password records
- MongoDB-generated document IDs
- Automatic record timestamps
- Database connection error handling
- Express API connected to MongoDB
- Replaced V27 in-memory storage with persistent database storage

**Backend**

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- REST API

**API Operations**

- GET `/api/passwords`
- POST `/api/passwords`
- PUT `/api/passwords/:id`
- DELETE `/api/passwords/:id`

**Files**

- backend/server.js
- backend/db.js

---

## Version 29 — Authentication, Authorization & Vault Security — COMPLETED ✅

**Completed Features**

- User registration
- User accounts
- Master password
- Secure master-password hashing with bcrypt
- Login / unlock system
- JWT-based authentication
- JWT token validation
- Protected password-management APIs
- Authentication error handling
- Authorization
- User-specific password records
- User-to-password relationships
- Cross-user access prevention
- AES-256-GCM vault encryption
- Secure encryption/decryption flow
- Decryption only for authorized users
- Authentication and authorization error handling

**Security Concepts Implemented**

- Authentication vs Authorization
- Password hashing vs encryption
- bcrypt
- JWT
- Bearer tokens
- Protected REST APIs
- Access control
- User ownership
- AES-256-GCM
- Initialization vectors (IV)
- Authentication tags
- Environment-based secret management

**Verified Tests**

- Correct login → passed
- Incorrect password → rejected
- JWT generated → passed
- Missing token → rejected
- Invalid JWT → rejected
- Authenticated CRUD → passed
- Vault encryption → passed
- Vault decryption → passed
- User-specific password storage → passed
- Cross-user password access → rejected

**Files Added/Updated**

- backend/server.js
- backend/userModel.js
- backend/vaultCrypto.js
- backend/db.js
- package.json
- package-lock.json
- .env

---

## Version 30 — Security Hardening & Testing

**Features**

- Input validation
- Username validation
- Master-password validation
- Vault-password validation
- MongoDB ObjectId validation
- JWT authentication validation
- Protected REST APIs
- User-specific authorization
- Cross-user access prevention
- Cross-user update prevention
- Cross-user delete prevention
- AES vault encryption verification
- Encrypted password storage verification
- IV and authentication-tag verification
- Plaintext password storage prevention
- Password update encryption verification
- Authentication error handling
- Authorization error handling
- Security-focused API testing
- Multi-user isolation testing
- Owner access testing
- CRUD security testing

**Security Tests Completed**

- Invalid username rejected
- Invalid master password rejected
- Invalid vault password rejected
- Invalid ObjectId rejected
- Missing JWT rejected
- Invalid JWT rejected
- User 2 cannot access User 1 password
- User 2 cannot update User 1 password
- User 2 cannot delete User 1 password
- User 1 can access own password
- User 1 can update own password
- User 1 can delete own password
- Passwords stored encrypted in MongoDB
- Plaintext vault passwords absent from MongoDB
- Updated passwords are re-encrypted
- Authorized users can decrypt their own passwords

**Files**

- backend/server.js
- backend/validation.js
- backend/vaultCrypto.js
- backend/userModel.js
- backend/db.js
- Project-Roadmap.md

---

# 🚀 Upcoming Milestones

## Version 31 — Refactoring, Documentation & Deployment

Turn the project into a clean, maintainable and portfolio-ready application.

**Requirements**

- Clean project structure
- Modularize backend
- Modularize frontend
- Separate routes/controllers/database logic where appropriate
- Remove duplicate code
- Improve naming and code organization
- Basic performance/architecture cleanup
- Environment configuration
- `.env` secret management
- `.env.example`
- README
- Installation guide
- Usage guide
- API documentation
- Architecture documentation
- Security documentation
- Deployment
- Production configuration
- Final testing after deployment
- Final portfolio preparation

**Final Project Quality**

- Clean code
- Maintainable architecture
- Secure configuration
- Proper documentation
- Working production deployment
- Git/GitHub history
- Portfolio-ready presentation

---

# 🎯 Final Goal

The Secure Password Manager should demonstrate:

- JavaScript Fundamentals
- Problem Solving
- Arrays & Objects
- Functions
- Built-in JavaScript Methods
- DOM Manipulation
- Event Handling
- Async/Await
- Fetch API
- JSON
- Node.js
- Express.js
- REST APIs
- MongoDB
- CRUD Operations
- Authentication
- Authorization
- JWT
- Password Hashing
- Encryption & Decryption
- Input Validation
- Security Concepts
- Error Handling
- Testing
- Git & GitHub
- Environment Variables
- Secret Management
- Modular Programming
- Software Engineering Principles
- Documentation
- Deployment

---

This project will serve as both a complete JavaScript
learning journey and a professional portfolio project.