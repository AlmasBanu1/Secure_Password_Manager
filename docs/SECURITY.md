# Secure Password Manager — Security Documentation

This document describes the security mechanisms implemented in the Secure Password Manager, the threats they address, and important security limitations.

The application is designed as a learning and portfolio project demonstrating practical security concepts including password hashing, authentication, authorization, encryption, input validation, environment-based secret management, and user data isolation.

---

# 1. Security Overview

The application uses multiple layers of security:

```text
┌──────────────────────────────────────────┐
│              User Input                  │
└─────────────────────┬────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────┐
│          Input Validation                │
└─────────────────────┬────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────┐
│       Authentication / Authorization     │
│                  JWT                     │
└─────────────────────┬────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────┐
│       Controller-Level Validation        │
└─────────────────────┬────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────┐
│        Password Encryption Layer         │
└─────────────────────┬────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────┐
│               MongoDB                    │
└──────────────────────────────────────────┘
```

Security is implemented across multiple application layers rather than relying on a single mechanism.

---

# 2. Master Password Protection

Master passwords are not stored as plaintext.

During registration, the master password is processed using **bcrypt** before the user record is stored.

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

During login, the supplied master password is compared against the stored bcrypt hash.

The original master password is not retrieved from the database.

---

# 3. Password Hashing

The application uses bcrypt for master-password hashing.

The backend uses a configured bcrypt work factor to make password-hash computation intentionally expensive.

This provides protection against directly recovering the original master password from the stored hash.

Hashing is used for **authentication credentials**.

It is different from encryption because a hash is not intended to be decrypted.

---

# 4. Vault Password Encryption

Passwords stored in the password vault require reversible protection because they must eventually be displayed to the authenticated user.

Therefore, vault passwords are encrypted rather than hashed.

The application uses an AES-based encryption mechanism through:

```text
backend/utils/vaultCrypto.js
```

The storage process is:

```text
Plaintext Vault Password
          │
          ▼
   Vault Encryption
          │
          ▼
   Encrypted Password
          │
          ▼
        MongoDB
```

During authorized retrieval:

```text
MongoDB
   │
   ▼
Encrypted Password
   │
   ▼
Vault Decryption
   │
   ▼
Plaintext Password
```

This provides a fundamental distinction:

| Data            | Protection           |
| --------------- | -------------------- |
| Master password | bcrypt hashing       |
| Vault passwords | AES-based encryption |

---

# 5. Encryption Key Management

The vault encryption key is not hard-coded into the application source code.

It is supplied through an environment variable:

```text
VAULT_ENCRYPTION_KEY
```

The key is stored locally in:

```text
backend/.env
```

The repository contains only the template:

```text
backend/.env.example
```

Actual secret values should never be committed to GitHub.

---

# 6. JWT Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

After successful login, the backend generates a JWT containing authenticated-user information.

The frontend stores the token in the browser's session storage.

Protected requests send the token using:

```http
Authorization: Bearer JWT_TOKEN
```

The authentication middleware verifies the token before allowing access to protected password-management routes.

---

# 7. Authorization

Authentication answers:

> Who is the user?

Authorization answers:

> What is the authenticated user allowed to access?

The password-management API requires authentication.

Password records are queried using both:

```text
Password Record ID
+
Authenticated User ID
```

This prevents a user from simply changing a password ID in a request to access another user's password record.

---

# 8. User Data Isolation

Each password record is associated with its owning user.

The backend uses the authenticated user's identity when performing password operations.

For example, retrieving a password is conceptually performed using:

```text
Find password where:

Password ID = requested ID
AND
User ID = authenticated user's ID
```

The same ownership check is applied to password updates and deletions.

This provides an important authorization boundary between users.

---

# 9. Input Validation

The application contains centralized validation functionality in:

```text
backend/middleware/validation.js
```

Validation is used for important user-controlled input, including:

* Usernames
* Master passwords
* Vault password data
* Password record IDs

Validation helps prevent malformed data from reaching deeper application layers.

---

# 10. Object ID Validation

Password record IDs originate from the client and therefore cannot be blindly trusted.

The application validates password IDs before using them in MongoDB queries.

This helps prevent invalid identifiers from causing database-query errors.

---

# 11. Authentication Error Handling

The login process avoids unnecessarily revealing whether a particular username exists.

For example, invalid authentication attempts use a generic authentication failure rather than explicitly telling the client:

```text
Username does not exist.
```

or:

```text
Password is incorrect.
```

This reduces unnecessary account-enumeration information.

---

# 12. Protected API Routes

Password-management routes are protected by authentication middleware.

The general request flow is:

```text
Client
  │
  ▼
Protected API Request
  │
  ▼
JWT Authentication Middleware
  │
  ├── Valid Token ──────► Continue
  │
  └── Invalid/Missing ──► Reject
```

This ensures password-management operations are not available to unauthenticated API clients.

---

# 13. Session Token Handling

The frontend stores the authentication token in:

```text
sessionStorage
```

The shared API module handles token management.

The relevant frontend module is:

```text
frontend/js/api.js
```

It provides functionality for:

* Retrieving the authentication token
* Saving the authentication token
* Removing the authentication token
* Creating authorization headers
* Detecting authentication state

Logging out removes the stored authentication token.

---

# 14. Frontend Route Protection

The frontend also checks authentication state before allowing access to protected pages.

Protected pages include:

```text
/pages/dashboard.html
/pages/password.html
/pages/vault.html
```

If the frontend does not have an authentication token, the user is redirected to the Login/Register page.

This provides a better user experience.

However, frontend protection is **not considered a replacement for backend authorization**.

The backend independently protects the actual API resources.

---

# 15. Environment Secret Management

Sensitive configuration values are stored outside the source code.

The backend uses:

```text
backend/.env
```

for local secrets.

The repository contains:

```text
backend/.env.example
```

with placeholders instead of real secrets.

The `.gitignore` configuration prevents `.env` files from being committed.

Sensitive values include:

* JWT signing secret
* Vault encryption key
* Other private configuration values

---

# 16. Separation of Security Responsibilities

Security-related functionality is separated into appropriate modules.

```text
Authentication
      │
      ▼
authController.js
      │
      ▼
authMiddleware.js
      │
      ▼
JWT

Password Validation
      │
      ▼
validation.js

Vault Encryption
      │
      ▼
vaultCrypto.js

Master Password Hashing
      │
      ▼
userModel.js
      │
      ▼
bcrypt
```

This separation makes the security logic easier to inspect, test, and maintain.

---

# 17. Threats Addressed

The current implementation provides protection against several common application-level risks.

### Plaintext Master-Password Storage

**Mitigation:** bcrypt hashing.

---

### Plaintext Vault-Password Storage

**Mitigation:** AES-based encryption before database storage.

---

### Unauthenticated Password API Access

**Mitigation:** JWT authentication middleware.

---

### Cross-User Password Access

**Mitigation:** password queries are scoped to the authenticated user ID.

---

### Invalid User Input

**Mitigation:** centralized validation.

---

### Invalid Password Record IDs

**Mitigation:** ObjectId validation.

---

### Excessive Authentication Information

**Mitigation:** generic login failure responses.

---

### Accidental Secret Exposure Through Git

**Mitigation:** `.env` excluded through `.gitignore` and `.env.example` used as a safe template.

---

# 18. Security Architecture

The application's security architecture can be summarized as:

```text
                       USER
                        │
                        ▼
                ┌───────────────┐
                │ Input         │
                │ Validation    │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Authentication│
                │    JWT        │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Authorization │
                │ User Isolation│
                └───────┬───────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
       Master Password       Vault Password
              │                   │
              ▼                   ▼
          bcrypt Hash        AES Encryption
              │                   │
              └─────────┬─────────┘
                        ▼
                    MongoDB
```

---

# 19. Security Limitations

Although the project implements several important security mechanisms, it should **not be considered a fully production-hardened password manager**.

Important limitations include:

* The application is currently designed primarily for local development and portfolio demonstration.
* Production deployment security has not yet been completed.
* HTTPS/TLS configuration depends on the eventual deployment environment.
* Production-grade secret management has not yet been implemented.
* Rate limiting and brute-force protection may require additional implementation.
* Additional security headers should be considered for production deployment.
* Comprehensive automated security testing should be added.
* A professional production password manager would require significantly more extensive security review and testing.

These limitations are important when evaluating the application realistically.

---

# 20. Future Security Improvements

Potential future improvements include:

### Rate Limiting

Limit repeated authentication attempts to reduce brute-force attacks.

### Stronger Session Management

Implement more advanced token/session management appropriate for production deployment.

### HTTPS

Ensure all communication is encrypted using HTTPS in production.

### Security Headers

Add appropriate HTTP security headers.

### Automated Security Testing

Add automated tests for:

* Authentication
* Authorization
* Input validation
* Encryption/decryption
* Access-control boundaries
* Invalid requests

### Dependency Auditing

Regularly inspect project dependencies for known security vulnerabilities.

### Security Logging

Introduce carefully designed security-event logging without recording sensitive credentials or secrets.

### Secret Management

Use a dedicated production secret-management solution rather than local `.env` files for deployed environments.

---

# 21. Secure Development Practices

The project follows several secure-development practices:

* Do not store master passwords as plaintext.
* Do not store vault passwords as plaintext.
* Do not hard-code encryption keys.
* Do not hard-code JWT secrets.
* Validate user-controlled input.
* Authenticate protected API requests.
* Authorize access using user ownership.
* Avoid unnecessary authentication error details.
* Keep secrets outside version control.
* Separate security functionality into dedicated modules.
* Test authentication and authorization behavior before deployment.

---

# 22. Security Checklist

Before considering a production deployment, verify:

* [ ] Master passwords are hashed.
* [ ] Vault passwords are encrypted.
* [ ] JWT authentication works.
* [ ] Protected API routes reject unauthenticated requests.
* [ ] User ownership is enforced.
* [ ] Input validation is applied.
* [ ] Password IDs are validated.
* [ ] `.env` is excluded from Git.
* [ ] No real secrets exist in the repository.
* [ ] HTTPS is configured.
* [ ] Rate limiting is configured.
* [ ] Security headers are configured.
* [ ] Production secrets are securely managed.
* [ ] Security tests pass.
* [ ] Production deployment has been tested.
* [ ] Dependencies have been audited.

---

# 23. Security Disclaimer

This project is an educational and portfolio application.

It demonstrates practical security concepts but should not be treated as a replacement for a professionally audited password-management product.

Users should not rely on the current implementation to protect highly sensitive real-world credentials without additional security review, hardening, testing, and production deployment controls.

---

# Related Documentation

* Installation Guide — `docs/INSTALLATION.md`
* Usage Guide — `docs/USAGE.md`
* API Documentation — `docs/API.md`
* Architecture Documentation — `docs/ARCHITECTURE.md`
* Project Roadmap — `Project-Roadmap.md`
