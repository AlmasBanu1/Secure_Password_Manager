# Secure Password Manager — Architecture Documentation

This document describes the architecture, project structure, request flow, authentication flow, and major components of the Secure Password Manager.

The project follows a modular client-server architecture designed to separate frontend presentation, API routing, business logic, database operations, authentication, validation, and encryption responsibilities.

---

# 1. Architecture Overview

The application consists of two primary layers:

* **Frontend**
* **Backend**

The backend provides REST APIs that communicate with MongoDB for persistent storage.

The overall architecture is:

```text
┌───────────────────────────────────────────────┐
│                  FRONTEND                     │
│                                               │
│  HTML Pages                                   │
│  JavaScript Modules                           │
│  Shared API Module                            │
│  Shared UI Module                             │
└───────────────────────┬───────────────────────┘
                        │
                        │ HTTP / REST API
                        ▼
┌───────────────────────────────────────────────┐
│                  EXPRESS.JS                   │
│                                               │
│  Routes                                       │
│      │                                        │
│      ▼                                        │
│  Authentication Middleware                    │
│      │                                        │
│      ▼                                        │
│  Controllers                                  │
│      │                                        │
│      ▼                                        │
│  Models                                       │
│      │                                        │
│      ▼                                        │
│  MongoDB                                      │
└───────────────────────────────────────────────┘
```

Security-related functionality such as password hashing, JWT authentication, validation, and vault encryption is handled within the appropriate backend modules.

---

# 2. Project Structure

The major V31 project structure is:

```text
Secure_Password_Manager/
│
├── backend/
│   │
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
│   ├── .env
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   │
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
│   └── pages/
│       ├── index.html
│       ├── dashboard.html
│       ├── password.html
│       └── vault.html
│
├── docs/
│   ├── INSTALLATION.md
│   ├── USAGE.md
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── SECURITY.md
│
├── package.json
├── package-lock.json
├── .gitignore
├── Project-Roadmap.md
│
├── server.v28.backup.js
├── frontend/script.js
│
└── password-strength-checker-v1.js
    ...
    password-strength-checker-v25.js
```

---

# 3. Frontend Architecture

The frontend uses a multi-page architecture.

Each major application function has its own HTML page and associated JavaScript module.

### Login / Registration

```text
frontend/pages/index.html
        │
        ▼
frontend/js/app.js
```

Responsible for:

* Registration
* Login
* Authentication state handling
* Redirecting authenticated users

---

### Dashboard

```text
frontend/pages/dashboard.html
        │
        ▼
frontend/js/dashboard.js
```

Responsible for:

* Dashboard interface
* Navigation to password creation
* Navigation to password vault
* Logout

---

### Password Creation

```text
frontend/pages/password.html
        │
        ▼
frontend/js/password-page.js
        │
        ▼
frontend/js/password.js
```

Responsible for password creation and generation functionality.

---

### Password Vault

```text
frontend/pages/vault.html
        │
        ▼
frontend/js/vault-page.js
        │
        ▼
frontend/js/password.js
```

Responsible for:

* Loading saved passwords
* Displaying vault entries
* Viewing passwords
* Updating passwords
* Deleting passwords

---

# 4. Shared Frontend Modules

## `frontend/js/api.js`

The API module centralizes communication between the frontend and backend.

Responsibilities include:

* API base URLs
* Authentication headers
* Registration requests
* Login requests
* Logout handling
* Password retrieval
* Password creation
* Password updates
* Password deletion
* JWT token management

This prevents individual pages from duplicating API request logic.

---

## `frontend/js/ui.js`

The UI module contains shared user-interface functionality.

Its purpose is to avoid duplicating common frontend behavior across multiple pages.

---

## `frontend/js/password.js`

This module contains shared password-related functionality used by password-related pages.

It supports reusable password-generation and password-interface behavior.

---

# 5. Backend Architecture

The backend is built using Node.js and Express.js.

The backend follows a modular structure:

```text
Request
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
MongoDB
```

This separation makes the backend easier to maintain and extend.

---

# 6. Server

## `backend/server.js`

The server is the main entry point of the backend application.

Responsibilities include:

* Loading environment variables
* Creating the Express application
* Configuring middleware
* Enabling CORS
* Parsing JSON requests
* Serving frontend files
* Registering API routes
* Starting the HTTP server
* Establishing the MongoDB connection

The server loads environment variables from:

```text
backend/.env
```

---

# 7. Routes

Routes define the application's API endpoints.

## `backend/routes/authRoutes.js`

Defines authentication-related endpoints under:

```text
/api/auth
```

Examples:

```text
POST /api/auth/register
POST /api/auth/login
```

---

## `backend/routes/passwordRoutes.js`

Defines password-management endpoints under:

```text
/api/passwords
```

Examples:

```text
GET    /api/passwords
GET    /api/passwords/:id
POST   /api/passwords
PUT    /api/passwords/:id
DELETE /api/passwords/:id
```

Protected password routes use authentication middleware.

---

# 8. Controllers

Controllers contain the application's request-handling and business logic.

## `backend/controllers/authController.js`

Responsible for:

* Validating authentication input
* Registering users
* Checking existing users
* Verifying master passwords
* Generating JWTs
* Returning safe user information
* Handling authentication errors

The controller communicates with the user model rather than directly performing database operations.

---

## `backend/controllers/passwordController.js`

Responsible for:

* Retrieving password records
* Creating password records
* Updating password records
* Deleting password records
* Validating password data
* Encrypting passwords before storage
* Decrypting passwords when authorized retrieval is requested
* Ensuring operations are associated with the authenticated user

The controller uses the password model for database operations.

---

# 9. Models

Models provide the database-access layer.

## `backend/models/userModel.js`

Responsible for user-related database operations.

Functions include:

* Creating users
* Finding users by username
* Verifying master passwords

Password hashing is performed using bcrypt before the user record is stored.

---

## `backend/models/passwordModel.js`

Responsible for password-record database operations.

Functions include:

* Finding all password records for a user
* Finding one password by ID and user ID
* Finding other password records for duplicate validation
* Inserting password records
* Updating password records
* Deleting password records

The model communicates with the MongoDB `passwords` collection.

---

# 10. Database Layer

## `backend/config/db.js`

This module manages the MongoDB connection.

It provides access to the application's database connection so that models do not need to duplicate connection-management logic.

The database layer is separated from controllers and models to improve maintainability.

---

# 11. Middleware

## `backend/middleware/authMiddleware.js`

This middleware protects authenticated API routes.

Its general process is:

```text
Request
   ↓
Read Authorization Header
   ↓
Extract Bearer Token
   ↓
Verify JWT
   ↓
Extract User Information
   ↓
Allow Request
```

If authentication fails, the request is rejected.

---

## `backend/middleware/validation.js`

This module contains reusable input-validation functions.

Validation is applied to data such as:

* Usernames
* Master passwords
* Vault passwords
* Password record IDs

Centralizing validation prevents the same validation logic from being duplicated throughout the controllers.

---

# 12. Encryption Layer

## `backend/utils/vaultCrypto.js`

This module handles encryption and decryption of vault passwords.

Its responsibility is to keep cryptographic operations separate from controller logic.

The general flow is:

```text
Password
   ↓
Vault Crypto Module
   ↓
Encryption
   ↓
Encrypted Data
   ↓
MongoDB
```

For retrieval:

```text
MongoDB
   ↓
Encrypted Data
   ↓
Vault Crypto Module
   ↓
Decryption
   ↓
Authorized User
```

The vault encryption key is supplied through environment configuration.

---

# 13. Authentication Architecture

The authentication architecture is:

```text
                 USER
                  │
                  ▼
          Login / Register
                  │
                  ▼
         Express Auth Route
                  │
                  ▼
          Auth Controller
                  │
          ┌───────┴────────┐
          ▼                ▼
    Validation          User Model
                           │
                           ▼
                       MongoDB
                           │
                           ▼
                  Password Verification
                           │
                           ▼
                      JWT Creation
                           │
                           ▼
                    Frontend Client
```

---

# 14. Password Management Architecture

Password operations follow this structure:

```text
Frontend
   │
   ▼
API Module
   │
   ▼
Express Route
   │
   ▼
Authentication Middleware
   │
   ▼
Password Controller
   │
   ├── Validation
   │
   ├── Encryption / Decryption
   │
   ▼
Password Model
   │
   ▼
MongoDB
```

This separation keeps API routing, authentication, business logic, cryptography, and database operations independent.

---

# 15. Data Flow — Adding a Password

When a user saves a password:

```text
User
 │
 ▼
Password Page
 │
 ▼
Frontend API Module
 │
 ▼
POST /api/passwords
 │
 ▼
Authentication Middleware
 │
 ▼
Password Controller
 │
 ├── Validate Input
 │
 ├── Check Duplicate Records
 │
 ├── Encrypt Password
 │
 ▼
Password Model
 │
 ▼
MongoDB
```

---

# 16. Data Flow — Retrieving a Password

```text
User
 │
 ▼
Password Vault
 │
 ▼
Frontend API Module
 │
 ▼
GET /api/passwords
 │
 ▼
Authentication Middleware
 │
 ▼
Password Controller
 │
 ▼
Password Model
 │
 ▼
MongoDB
 │
 ▼
Encrypted Password
 │
 ▼
Password Controller
 │
 ▼
Decrypt Password
 │
 ▼
Frontend
```

---

# 17. User Isolation

Password records contain information identifying their owner.

Protected operations use the authenticated user's identity when querying password records.

Conceptually:

```text
Authenticated User ID
        +
Password Record ID
        ↓
Database Query
```

This ensures password operations are scoped to the authenticated user.

---

# 18. Separation of Responsibilities

The architecture intentionally separates responsibilities.

| Layer           | Responsibility                      |
| --------------- | ----------------------------------- |
| HTML            | Page structure                      |
| Frontend JS     | Page behavior                       |
| API Module      | Backend communication               |
| UI Module       | Shared UI behavior                  |
| Routes          | API endpoint definitions            |
| Middleware      | Authentication and validation       |
| Controllers     | Request handling and business logic |
| Models          | Database operations                 |
| Database Module | MongoDB connection                  |
| Crypto Utility  | Vault encryption/decryption         |
| MongoDB         | Persistent data storage             |

This separation reduces coupling between components.

---

# 19. Why This Architecture Is Used

The modular architecture provides several advantages.

### Maintainability

Individual components can be modified without rewriting the entire application.

### Reusability

Common functionality such as API requests and validation can be reused.

### Separation of Concerns

Each module has a specific responsibility.

### Security

Authentication, validation, password hashing, and encryption are separated into dedicated components.

### Scalability

New features can be added without turning the application into one large controller or frontend script.

### Debugging

Errors can be isolated to a specific architectural layer.

---

# 20. Historical Files

The repository also contains files from earlier development stages.

These are retained as project history and are not part of the current V31 runtime architecture.

### `backend/server.v28.backup.js`

Historical V28 backend implementation.

### `frontend/script.js`

Historical V26/V27 frontend implementation.

### `password-strength-checker-v1.js` → `password-strength-checker-v25.js`

Progressive JavaScript learning versions created during the development journey.

These files demonstrate the project's evolution from JavaScript fundamentals to a modular full-stack application.

---

# 21. Architecture Summary

The current architecture can be summarized as:

```text
                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Frontend    │
                    │ HTML + JS     │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   API Module  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Express Routes│
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Middleware   │
                    │ Auth/Validate │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Controllers   │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
          ┌───────────────┐    ┌───────────────┐
          │ Crypto Utility│    │    Models     │
          └───────────────┘    └───────┬───────┘
                                       │
                                       ▼
                                ┌───────────────┐
                                │    MongoDB    │
                                └───────────────┘
```

The architecture provides a clear separation between presentation, API communication, authentication, business logic, cryptography, and persistence.

---

# Related Documentation

* Installation Guide — `docs/INSTALLATION.md`
* Usage Guide — `docs/USAGE.md`
* API Documentation — `docs/API.md`
* Security Documentation — `docs/SECURITY.md`
* Project Roadmap — `Project-Roadmap.md`
