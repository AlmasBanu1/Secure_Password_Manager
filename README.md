# 🔐 Secure Password Manager

A full-stack secure password manager built with **JavaScript, Node.js, Express.js, MongoDB, JWT authentication, bcrypt password hashing, and AES-256-GCM vault encryption**.

This project was developed as a learning-by-building journey, progressing from JavaScript fundamentals to a modular full-stack application with authentication, encrypted password storage, REST APIs, database persistence, security testing, documentation, and deployment.

> **Live application:** https://secure-password-manager-080x.onrender.com

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
* Centralized frontend authentication token handling

### 🔐 Password Vault

* Add passwords
* View saved passwords
* Retrieve individual passwords
* Update passwords
* Delete passwords
* User-specific password isolation
* Encrypted password storage
* Password validation
* Duplicate password detection

### 🎲 Password Generator

* Generate secure passwords
* Customize password generation
* Password strength checking

### 🛡️ Security

* AES-256-GCM authenticated encryption for recoverable vault passwords
* bcrypt password hashing for master passwords
* JWT authentication
* Authorization middleware
* User ownership enforcement
* Input validation
* Environment-based secret management
* `.env` protection
* Protected API endpoints
* Restricted CORS configuration
* Dependency vulnerability auditing
* Security-focused testing including authorization and ciphertext-tampering tests

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
* Environment-based configuration

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

* AES-256-GCM
* bcrypt password hashing
* JWT authentication
* Authorization middleware
* Input validation
* Environment variables
* Secret management

### Development & Deployment

* Git
* GitHub
* npm
* Render

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
│   └── server.js
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
├── docs/
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   ├── SECURITY.md
│   └── USAGE.md
│
├── Project-Roadmap.md
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### Historical Files

The repository intentionally retains selected historical files to preserve the project's development and learning history:

* `backend/server.v28.backup.js` — historical V28 backend backup
* `frontend/script.js` — historical V26/V27 frontend implementation
* `password-strength-checker-v1.js` through `password-strength-checker-v25.js` — progressive JavaScript learning and project-development versions

These historical files are **not part of the active V31 application flow**.

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

Detailed architecture documentation:

* [Architecture Guide](docs/ARCHITECTURE.md)

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
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
          Validate Input   Find User   Verify bcrypt
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
                    │ Authentication Middleware   │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                           Authorized Controller
```

---

## 🔐 Password Storage Flow

Vault passwords are encrypted before being persisted.

### Storing a Password

```text
                         ┌──────────────────┐
                         │  User Password   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    Validation   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  AES-256-GCM     │
                         │    Encryption    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Encrypted Data   │
                         │ + IV + Auth Tag  │
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
                         │ AES-256-GCM      │
                         │    Decryption    │
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

Different security mechanisms are used for different types of sensitive information.

### Master Password

The user's master password is **hashed using bcrypt**.

The original master password is not stored directly.

```text
Master Password
       │
       ▼
     bcrypt
       │
       ▼
Password Hash
       │
       ▼
    MongoDB
```

### Stored Vault Passwords

Vault passwords need to be recovered when an authorized user requests them, so they are **encrypted rather than one-way hashed**.

The application uses AES-256-GCM authenticated encryption with a secret 256-bit key and per-record IV/authentication data.

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
* Initialization vector
* Authentication tag
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

Detailed API documentation:

* [API Documentation](docs/API.md)

---

## 💻 Running the Project Locally

For detailed setup instructions, see:

* [Installation Guide](docs/INSTALLATION.md)
* [Usage Guide](docs/USAGE.md)

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
MONGO_URI=your_mongodb_connection_string_here
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

## ☁️ Deployment

The application is deployed using **Render** with MongoDB Atlas as the production database.

### Production Application

**https://secure-password-manager-080x.onrender.com**

Production configuration uses environment variables for:

* MongoDB connection
* JWT secret
* General encryption configuration
* Vault encryption key

Secrets are not stored in the Git repository.

The deployment uses:

```text
Build Command: npm install
Start Command: npm start
```

Detailed deployment and configuration information is covered in the project documentation.

---

## 🧪 Testing & Security Validation

The project has been tested across major functional, authentication, authorization, security, and deployment flows.

### Functional Testing

* User registration
* User login
* Password creation
* Password retrieval
* Password update
* Password deletion
* Logout
* Frontend authentication flow
* Protected frontend pages
* Frontend navigation
* Password visibility controls
* MongoDB connectivity
* Environment configuration
* Local server startup
* Production deployment

### Authentication & Authorization Testing

* Missing JWT → `401 Unauthorized`
* Invalid JWT → `401 Unauthorized`
* Malformed JWT → `401 Unauthorized`
* Valid authenticated API access → `200 OK`
* Invalid password ID → `400 Bad Request`
* Cross-user GET access → `404 Not Found`
* Cross-user PUT access → `404 Not Found`
* Cross-user DELETE access → `404 Not Found`
* Duplicate registration → `409 Conflict`
* Duplicate vault password detection

### Encryption Testing

AES-256-GCM ciphertext tampering was tested by modifying stored encrypted data and attempting authorized retrieval.

The modified ciphertext failed authentication/decryption, demonstrating that tampered encrypted data is not accepted as valid plaintext.

The original database record was subsequently restored and successfully decrypted again.

### Dependency Security

The project was audited using npm:

```text
npm audit --audit-level=moderate
found 0 vulnerabilities
```

### CORS

Production CORS configuration was restricted to the intended local and deployed frontend origins and verified after deployment.

---

## 🛡️ Security Considerations

Implemented security measures include:

* bcrypt hashing for master passwords
* AES-256-GCM authenticated encryption for recoverable vault passwords
* JWT-based authentication
* Authorization middleware
* User-specific database queries
* Input validation
* Environment variables for secrets
* `.env` excluded from Git
* `.env.example` provided for configuration reference
* Generic authentication failure messages
* Protected password CRUD operations
* Restricted CORS configuration
* Dependency vulnerability auditing
* Cross-user authorization testing
* Ciphertext-tampering testing

### Important

This project is intended as an educational and portfolio project.

It should **not be treated as a production-grade replacement for established password managers** without further security auditing, threat modeling, penetration testing, key-management improvements, and independent security review.

Detailed security documentation:

* [Security Documentation](docs/SECURITY.md)

---

## 📚 Documentation

Additional V31 documentation:

* [Installation Guide](docs/INSTALLATION.md)
* [Usage Guide](docs/USAGE.md)
* [API Documentation](docs/API.md)
* [Architecture Documentation](docs/ARCHITECTURE.md)
* [Security Documentation](docs/SECURITY.md)

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
* **V31** — Refactoring, documentation, deployment, security validation, and portfolio preparation

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

**Version 31 — Finalized**

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
* Authentication flow verification
* Password CRUD verification
* Protected API verification
* Cross-user authorization testing
* AES-256-GCM tampering validation
* Dependency vulnerability audit
* CORS hardening
* MongoDB Atlas production configuration
* Render deployment
* Production smoke testing
* V31 documentation

### Final State

The application is deployed and operational as a portfolio project.

The repository is maintained on the `version-31` branch with the final V31 implementation and security fixes.

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
