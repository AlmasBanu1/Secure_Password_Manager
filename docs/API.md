# Secure Password Manager — API Documentation

This document describes the REST API provided by the Secure Password Manager backend.

The API is implemented using **Node.js** and **Express.js** and is divided into two main areas:

* Authentication API
* Password Management API

---

# 1. Base URL

When running the application locally:

```text
http://localhost:3000
```

The API base paths are:

```text
/api/auth
/api/passwords
```

---

# 2. Authentication

Authentication endpoints are available under:

```text
/api/auth
```

The authentication system uses:

* Username
* Master password
* bcrypt password hashing
* JSON Web Tokens (JWT)

---

## 2.1 Register a User

### Endpoint

```http
POST /api/auth/register
```

### Description

Creates a new user account.

The master password is validated and securely hashed before being stored.

### Request Body

```json
{
  "username": "example_user",
  "masterPassword": "StrongPassword123!"
}
```

### Headers

```http
Content-Type: application/json
```

### Successful Response

**Status:** `201 Created`

The response contains the newly created user's safe public information.

Example:

```json
{
  "message": "User registered successfully.",
  "user": {
    "id": "USER_ID",
    "username": "example_user",
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

The password hash is never returned to the client.

### Possible Errors

**400 Bad Request**

Returned when the supplied username or master password does not satisfy validation requirements.

**409 Conflict**

Returned when the username already exists.

**500 Internal Server Error**

Returned when an unexpected server-side error occurs.

---

# 3. Login

## 3.1 Authenticate a User

### Endpoint

```http
POST /api/auth/login
```

### Description

Authenticates an existing user.

The backend:

1. Validates the request.
2. Finds the user.
3. Verifies the master password using bcrypt.
4. Generates a JWT.
5. Returns the token and safe user information.

### Request Body

```json
{
  "username": "example_user",
  "masterPassword": "StrongPassword123!"
}
```

### Headers

```http
Content-Type: application/json
```

### Successful Response

**Status:** `200 OK`

Example:

```json
{
  "message": "Login successful.",
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "username": "example_user"
  }
}
```

The frontend stores the returned JWT in the browser session and uses it for authenticated API requests.

### Possible Errors

**400 Bad Request**

Invalid request data.

**401 Unauthorized**

Returned when the username or master password is incorrect.

The API intentionally uses a generic authentication error rather than revealing whether the username exists.

**500 Internal Server Error**

Unexpected server-side error.

---

# 4. Authentication Header

Protected endpoints require a valid JWT.

The token is sent using the HTTP `Authorization` header.

### Format

```http
Authorization: Bearer JWT_TOKEN
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

The authentication middleware verifies the token before allowing access to protected password-management routes.

---

# 5. Password Management

Password-management endpoints are available under:

```text
/api/passwords
```

All password-management operations require authentication.

---

# 6. Get All Passwords

### Endpoint

```http
GET /api/passwords
```

### Description

Retrieves all password records belonging to the currently authenticated user.

The records are ordered by creation time, with the newest records returned first.

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Successful Response

**Status:** `200 OK`

Example structure:

```json
[
  {
    "id": "PASSWORD_ID",
    "website": "example.com",
    "username": "example_user",
    "password": "decrypted_password"
  }
]
```

The exact fields returned depend on the current password record structure.

### Possible Errors

**401 Unauthorized**

Missing or invalid authentication token.

**500 Internal Server Error**

Unexpected server-side error.

---

# 7. Get a Single Password

### Endpoint

```http
GET /api/passwords/:id
```

### Description

Retrieves a specific password record belonging to the authenticated user.

### URL Parameter

```text
:id
```

Example:

```text
/api/passwords/65abc123...
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Successful Response

**Status:** `200 OK`

The requested password record is returned.

### Possible Errors

**400 Bad Request**

Invalid password record ID.

**401 Unauthorized**

Missing or invalid authentication token.

**404 Not Found**

The requested password record does not exist or does not belong to the authenticated user.

**500 Internal Server Error**

Unexpected server-side error.

---

# 8. Add a Password

### Endpoint

```http
POST /api/passwords
```

### Description

Creates a new password record for the authenticated user.

The password is validated and encrypted before being stored in MongoDB.

### Headers

```http
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "password": {
    "website": "example.com",
    "username": "example_user",
    "password": "StrongPassword123!"
  }
}
```

The exact password object fields correspond to the application's current password model and frontend implementation.

### Successful Response

**Status:** `201 Created`

The newly created password record is returned.

### Possible Errors

**400 Bad Request**

Invalid password data.

**401 Unauthorized**

Missing or invalid authentication token.

**409 Conflict**

Returned when the submitted password record conflicts with an existing record according to the application's duplicate validation.

**500 Internal Server Error**

Unexpected server-side error.

---

# 9. Update a Password

### Endpoint

```http
PUT /api/passwords/:id
```

### Description

Updates an existing password record belonging to the authenticated user.

### URL Parameter

```text
:id
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "password": {
    "website": "example.com",
    "username": "updated_user",
    "password": "NewStrongPassword123!"
  }
}
```

### Successful Response

**Status:** `200 OK`

The updated password record is returned.

### Possible Errors

**400 Bad Request**

Invalid password ID or password data.

**401 Unauthorized**

Missing or invalid authentication token.

**404 Not Found**

The requested password record does not exist or does not belong to the authenticated user.

**409 Conflict**

Returned when the updated record conflicts with another password record belonging to the same user.

**500 Internal Server Error**

Unexpected server-side error.

---

# 10. Delete a Password

### Endpoint

```http
DELETE /api/passwords/:id
```

### Description

Deletes a password record belonging to the authenticated user.

### URL Parameter

```text
:id
```

### Headers

```http
Authorization: Bearer JWT_TOKEN
```

### Successful Response

**Status:** `200 OK`

The API confirms that the password record was deleted.

### Possible Errors

**400 Bad Request**

Invalid password record ID.

**401 Unauthorized**

Missing or invalid authentication token.

**404 Not Found**

The requested password record does not exist or does not belong to the authenticated user.

**500 Internal Server Error**

Unexpected server-side error.

---

# 11. API Summary

| Method   | Endpoint             | Authentication | Purpose                  |
| -------- | -------------------- | -------------- | ------------------------ |
| `POST`   | `/api/auth/register` | No             | Register a user          |
| `POST`   | `/api/auth/login`    | No             | Authenticate a user      |
| `GET`    | `/api/passwords`     | Yes            | Get all user's passwords |
| `GET`    | `/api/passwords/:id` | Yes            | Get one password         |
| `POST`   | `/api/passwords`     | Yes            | Add a password           |
| `PUT`    | `/api/passwords/:id` | Yes            | Update a password        |
| `DELETE` | `/api/passwords/:id` | Yes            | Delete a password        |

---

# 12. Authentication Flow

```text
Client
  │
  │ POST /api/auth/login
  ▼
Express Auth Route
  │
  ▼
Auth Controller
  │
  ├── Validate credentials
  │
  ├── Find user
  │
  ├── Verify bcrypt password
  │
  └── Generate JWT
  │
  ▼
JWT returned to client
  │
  ▼
Client sends JWT with protected requests
```

---

# 13. Protected Request Flow

```text
Client
  │
  │ Authorization: Bearer JWT
  ▼
Express Password Route
  │
  ▼
Authentication Middleware
  │
  ├── Verify JWT
  │
  └── Extract authenticated user ID
  │
  ▼
Password Controller
  │
  ▼
Password Model
  │
  ▼
MongoDB
```

---

# 14. User Data Isolation

Password records are associated with the authenticated user's ID.

Protected password operations verify both:

```text
Password ID
+
Authenticated User ID
```

This ensures that a user cannot retrieve, modify, or delete another user's password record simply by changing the password record ID in the request.

---

# 15. Password Encryption

Before password data is stored:

```text
Plaintext Password
       ↓
Validation
       ↓
Encryption
       ↓
MongoDB
```

When an authorized user retrieves a password:

```text
MongoDB
   ↓
Encrypted Password
   ↓
Decryption
   ↓
Authorized Client
```

The vault encryption key is supplied through the backend environment configuration.

---

# 16. Error Handling

The API uses HTTP status codes to communicate the result of an operation.

Common status codes include:

| Status | Meaning                               |
| ------ | ------------------------------------- |
| `200`  | Request completed successfully        |
| `201`  | Resource created successfully         |
| `400`  | Invalid request or validation failure |
| `401`  | Authentication required or failed     |
| `404`  | Requested resource not found          |
| `409`  | Resource conflict                     |
| `500`  | Unexpected server error               |

Error responses contain an appropriate error message for the client.

---

# 17. Security Considerations

The API implements several security mechanisms:

* Master passwords are hashed using bcrypt.
* Authentication uses JWT.
* Protected routes require authentication.
* Password records are associated with users.
* Passwords stored in the vault are encrypted.
* Input validation is applied to authentication and password operations.
* Sensitive environment variables are kept outside source control.
* Authentication failures use generic responses to avoid unnecessary account-enumeration information.

The application should still undergo additional security hardening before being used for highly sensitive production credentials.

---

# 18. Frontend API Communication

The frontend uses the shared API module:

```text
frontend/js/api.js
```

This module centralizes:

* API base URLs
* Authentication headers
* Login
* Registration
* Password retrieval
* Password creation
* Password updates
* Password deletion
* Authentication-token handling

This prevents individual frontend pages from duplicating API communication logic.

---

# 19. Related Documentation

* Installation Guide — `docs/INSTALLATION.md`
* Usage Guide — `docs/USAGE.md`
* Architecture Documentation — `docs/ARCHITECTURE.md`
* Security Documentation — `docs/SECURITY.md`
* Project Roadmap — `Project-Roadmap.md`
