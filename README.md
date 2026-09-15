# 🔐 Secure Password Manager

A full-stack secure password manager built with **JavaScript, Node.js, Express.js, MongoDB, JWT authentication, bcrypt password hashing, and AES-based vault encryption**.

This project was developed as a learning-by-building journey, progressing from JavaScript fundamentals to a modular full-stack application with authentication, encrypted password storage, REST APIs, database persistence, and security-focused development practices.

---

## 🚀 Features

### 🔑 Authentication

* User registration
* User login
* JWT-based authentication
* Protected API routes
* Protected frontend pages
* Secure master-password hashing using bcrypt
* Generic authentication error messages

### 🔐 Password Vault

* Add passwords
* View saved passwords
* Retrieve individual passwords
* Update passwords
* Delete passwords
* User-specific password isolation
* Encrypted password storage
* Password validation

### 🎲 Password Generator

* Generate secure passwords
* Customize password generation
* Password strength checking

### 🛡️ Security

* AES-based vault encryption
* bcrypt password hashing
* JWT authentication
* Authorization middleware
* Input validation
* Environment-based secret management
* `.env` protection
* User-specific database access
* Protected API endpoints

### 🖥️ Frontend

* Login/Register page
* Dashboard
* Password creation and generator page
* Password vault
* Responsive UI
* Shared frontend API module
* Shared frontend UI utilities
* Protected frontend navigation
* Custom password visibility controls

### 🗄️ Backend

* Node.js
* Express.js
* REST API architecture
* Modular controllers
* Modular models
* Authentication middleware
* Validation middleware
* MongoDB database integration
* Centralized database configuration

---

## 🏗️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* DOM Manipulation
* Session Storage

### Backend

* Node.js
* Express.js
* REST APIs
* JSON Web Tokens (JWT)
* bcrypt
* dotenv
* CORS

### Database

* MongoDB
* MongoDB Node.js Driver

### Security

* AES encryption
* bcrypt password hashing
* JWT authentication
* Input validation
* Environment variables
* Secret management

### Development

* Git
* GitHub
* npm

---

## 📂 Project Structure

```text
Secure_Password_Manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── passwordController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validation.js
│   │
│   ├── models/
│   │   ├── passwordModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── passwordRoutes.js
│   │
│   ├── utils/
│   │   └── vaultCrypto.js
│   │
│   ├── .env.example
│   ├── server.js
│   └── server.v28.backup.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   ├── dashboard.js
│   │   ├── password-page.js
│   │   ├── password.js
│   │   ├── ui.js
│   │   └── vault-page.js
│   │
│   ├── pages/
│   │   ├── dashboard.html
│   │   ├── index.html
│   │   ├── password.html
│   │   └── vault.html
│   │
│   └── script.js
│
├── password-strength-checker-v1.js
├── password-strength-checker-v2.js
├── ...
├── password-strength-checker-v25.js
│
├── Project-Roadmap.md
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### Historical Files

The repository also contains a small number of historical files retained to preserve the project's development history:

* `backend/server.v28.backup.js` — historical V28 backend backup
* `frontend/script.js` — historical V26/V27 frontend implementation
* `password-strength-checker-v1.js` through `password-strength-checker-v25.js` — progressive JavaScript learning and project-development versions

These historical files are not part of the active V31 application flow.

> `backend/.env` is created locally during installation and is intentionally excluded from version control.

---

## 🏗️ Application Architecture

The application follows a modular client-server architecture.

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         │                     │
                         │   HTML / CSS / JS   │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Express.js      │
                         │       Server        │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
               Routes          Middleware       Controllers
                                                      │
                                                      ▼
                                                    Models
                                                      │
                                                      ▼
                                             ┌────────────────┐
                                             │    MongoDB     │
                                             └────────────────┘
```

The password encryption layer is handled by the vault encryption utility before encrypted password data is persisted in MongoDB.

---

## 🔄 Authentication Flow

```text
                              ┌──────────────┐
                              │     User     │
                              └──────┬───────┘
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │ Login / Register     │
                         │        Page          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Express Auth Route   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Authentication       │
                         │ Controller           │
                         └──────────┬───────────┘
                                    │
                     ┌──────────────┼──────────────┐
                     │              │              │
                     ▼              ▼              ▼
               Validate Input   Find User    Verify bcrypt
                                                    │
                                                    ▼
                                              Generate JWT
                                                    │
                                                    ▼
                         ┌──────────────────────────────┐
                         │ Frontend receives JWT        │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                              sessionStorage
                                        │
                                        ▼
                              Protected API Request
                                        │
                                        ▼
                         ┌──────────────────────────────┐
                         │ Authentication Middleware    │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                              Authorized Controller
```

---

## 🔐 Password Storage Flow

Passwords stored inside the vault are encrypted before being persisted.

### Storing a Password

```text
                         ┌──────────────────┐
                         │  User Password   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    Validation    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  AES Encryption  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Encrypted Data   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     MongoDB      │
                         └──────────────────┘
```

### Retrieving a Password

```text
                         ┌──────────────────┐
                         │     MongoDB      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Encrypted Data   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  AES Decryption  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Original Password│
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Authorized User  │
                         └──────────────────┘
```

---

## 🔑 Authentication Security

The application uses different security mechanisms for different types of sensitive information.

### Master Password

The user's master password is **hashed using bcrypt**.

The original master password is not stored directly.

```text
                         ┌──────────────────┐
                         │  Master Password │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │      bcrypt      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  Password Hash   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     MongoDB      │
                         └──────────────────┘
```

### Stored Vault Passwords

Vault passwords need to be recovered when an authorized user requests them, so they are **encrypted rather than one-way hashed**.

```text
                         ┌──────────────────┐
                         │  Vault Password  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  AES Encryption  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Encrypted Data   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     MongoDB      │
                         └──────────────────┘
```

---

## 🗄️ Database

The application uses MongoDB for persistent storage.

### Users Collection

Stores user authentication information such as:

* Username
* bcrypt password hash
* Account creation timestamp

### Passwords Collection

Stores encrypted password records associated with a specific user.

Password records contain information such as:

* User ID
* Encrypted password
* Creation timestamp
* Update timestamp

User ownership is checked when accessing, updating, or deleting password records.

---

## 🌐 API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Password Vault

```text
GET    /api/passwords
GET    /api/passwords/:id
POST   /api/passwords
PUT    /api/passwords/:id
DELETE /api/passwords/:id
```

Password routes require valid authentication.

Detailed API documentation is provided separately as part of the Version 31 documentation phase.

---

## 💻 Running the Project Locally

For detailed setup instructions, see:

```text
docs/INSTALLATION.md
```

### Quick Start

#### 1. Clone the repository

```bash
git clone https://github.com/AlmasBanu1/Secure_Password_Manager.git
```

#### 2. Navigate into the project

```bash
cd Secure_Password_Manager
```

#### 3. Install dependencies

```bash
npm install
```

#### 4. Configure environment variables

Create:

```text
backend/.env
```

Use `backend/.env.example` as the template.

Required variables:

```env
ENCRYPTION_KEY=your_encryption_key_here
JWT_SECRET=your_jwt_secret_here
VAULT_ENCRYPTION_KEY=your_64_character_vault_key_here
```

Never commit the real `.env` file or its secrets to GitHub.

#### 5. Start the application

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

---

## 🌐 Application Pages

### Login / Register

```text
http://localhost:3000/pages/index.html
```

### Dashboard

```text
http://localhost:3000/pages/dashboard.html
```

### Password Generator / Creation

```text
http://localhost:3000/pages/password.html
```

### Password Vault

```text
http://localhost:3000/pages/vault.html
```

---

## 🧪 Testing

The project has been tested across the major application flows, including:

* User registration
* User login
* JWT authentication
* Protected API access
* Password creation
* Password retrieval
* Password update
* Password deletion
* User-specific password access
* Frontend authentication flow
* Protected frontend pages
* Frontend navigation
* Password visibility controls
* MongoDB connectivity
* Environment configuration
* Local server startup

Final production testing will be completed after deployment.

---

## 🛡️ Security Considerations

This project was designed with security as an important part of the development process.

Implemented security measures include:

* bcrypt hashing for master passwords
* AES encryption for recoverable vault passwords
* JWT-based authentication
* Authorization middleware
* User-specific database queries
* Input validation
* Environment variables for secrets
* `.env` excluded from Git
* `.env.example` provided for configuration reference
* Generic authentication failure messages
* Protected password CRUD operations

### Important

This project is intended as an educational and portfolio project.

It should **not be treated as a production-grade replacement for established password managers** without further security auditing, threat modeling, penetration testing, key-management improvements, and independent security review.

---

## 📈 Learning Journey

This project was built progressively rather than as a single implementation.

The development journey covered:

```text
JavaScript Fundamentals
          ↓
Functions / Arrays / Objects
          ↓
DOM Manipulation
          ↓
Event Handling
          ↓
Built-in JavaScript Methods
          ↓
Async / Await
          ↓
Fetch API
          ↓
Node.js
          ↓
Express.js
          ↓
REST APIs
          ↓
MongoDB
          ↓
CRUD Operations
          ↓
Authentication
          ↓
JWT
          ↓
bcrypt
          ↓
Encryption / Decryption
          ↓
Input Validation
          ↓
Security
          ↓
Modular Architecture
          ↓
Documentation
          ↓
Deployment
```

---

## 📚 Version History

The project was developed through multiple versions, with each version introducing new functionality or improving the existing implementation.

Major milestones include:

* **V20** — JavaScript methods and project refactoring foundation
* **V24** — Password management improvements
* **V25** — Secure AES-based vault encryption
* **V26** — Frontend development
* **V27** — Express REST API
* **V28** — MongoDB persistence
* **V29** — Authentication and access control
* **V30** — Security hardening and testing
* **V31** — Refactoring, documentation, deployment, and portfolio preparation

For the complete development history, see:

```text
Project-Roadmap.md
```

---

## 🎯 Project Goals

The Secure Password Manager was created to demonstrate practical understanding of:

* JavaScript
* Problem solving
* Arrays and objects
* Functions
* Built-in JavaScript methods
* DOM manipulation
* Event handling
* Async/Await
* Fetch API
* JSON
* Node.js
* Express.js
* REST APIs
* MongoDB
* CRUD operations
* Authentication
* Authorization
* JWT
* Password hashing
* Encryption and decryption
* Input validation
* Error handling
* Security concepts
* Git and GitHub
* Environment variables
* Secret management
* Modular programming
* Software engineering principles
* Documentation
* Deployment

---

## 🚧 Current Status

**Version 31 — Refactoring, Documentation & Deployment**

### Completed

* Clean project structure
* Modular backend
* Modular frontend
* Separated routes, controllers, models, middleware, and database logic
* Environment configuration
* Secret management
* `.env.example`
* Shared frontend API module
* Shared frontend UI module
* Multi-page frontend architecture
* Protected frontend pages
* Centralized authentication token handling
* Refactored authentication controller
* Refactored password controller
* Refactored MongoDB database module
* Removed unused CSS files
* Verified authentication flow
* Verified password CRUD operations
* Verified protected API access
* Verified frontend navigation
* Verified local server startup

### Remaining

* Complete README documentation
* Installation guide
* Usage guide
* API documentation
* Architecture documentation
* Security documentation
* Deployment
* Production configuration
* Final production testing
* Portfolio preparation

---

## 👩‍💻 Author

**Almas Banu**

B.E. Computer Science and Engineering — Cybersecurity

Bengaluru, Karnataka, India

GitHub: `AlmasBanu1`

---

## ⭐ Future Improvements

Possible future improvements include:

* Stronger key-management architecture
* Password search and filtering
* Password categories
* Password expiration reminders
* Secure password sharing
* Multi-factor authentication
* Improved session management
* Security audit
* Automated testing
* CI/CD
* Production monitoring
* Improved deployment architecture

---

## ⚠️ Disclaimer

This project is developed for educational, learning, and portfolio purposes.

Although security principles such as password hashing, encryption, authentication, authorization, validation, and secret management have been implemented, the project should undergo professional security auditing and additional hardening before being used to protect highly sensitive real-world credentials.
