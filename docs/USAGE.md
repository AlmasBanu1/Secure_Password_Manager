# Secure Password Manager — Usage Guide

This guide explains how to use the Secure Password Manager after completing the local installation.

---

## 1. Start the Application

From the project root directory, start the backend server:

```bash
npm start
```

The application should start on:

```text
http://localhost:3000
```

A successful startup should show messages similar to:

```text
MongoDB connected successfully.
Secure Password Manager server running on http://localhost:3000
```

---

## 2. Open the Application

Open the Login/Register page in your browser:

```text
http://localhost:3000/pages/index.html
```

This is the main entry point of the application.

---

## 3. Register a New Account

If you do not already have an account:

1. Open the Login/Register page.
2. Select the registration option.
3. Enter a username.
4. Enter a master password.
5. Submit the registration form.
6. After successful registration, log in using the newly created credentials.

The master password is not stored as plain text. It is processed by the backend authentication system using password hashing.

---

## 4. Log In

To access the password manager:

1. Enter your username.
2. Enter your master password.
3. Submit the login form.

After successful authentication, the application provides access to the protected dashboard.

Authentication is handled using a JSON Web Token (JWT).

---

## 5. Dashboard

After logging in, the dashboard provides access to the main application features.

The dashboard allows you to:

* Create a new password.
* Open the password vault.
* Log out of the application.

Protected pages require an authenticated session.

---

## 6. Create a Password

From the dashboard, select the option to create a password.

The password page allows you to enter or generate a password.

A generated password can be used for an online account or other service.

After creating the password, save it to the vault if you want to store it securely.

---

## 7. Password Vault

The password vault displays the passwords associated with the authenticated user.

Open the vault from the dashboard:

```text
http://localhost:3000/pages/vault.html
```

Only passwords belonging to the authenticated user are accessible through the application's protected API.

---

## 8. View a Saved Password

From the password vault:

1. Locate the required password entry.
2. Use the available password visibility control to reveal or hide the password.
3. Review the saved information.

Password visibility is controlled through the frontend interface.

---

## 9. Update a Password

To update an existing password:

1. Open the password vault.
2. Select the password entry you want to modify.
3. Choose the update/edit option.
4. Enter the new password.
5. Submit the change.

The backend validates the request and updates the corresponding database record.

---

## 10. Delete a Password

To remove a saved password:

1. Open the password vault.
2. Locate the password entry.
3. Select the delete option.
4. Confirm the deletion if prompted.

The password record is removed from the database.

---

## 11. Logout

When you finish using the application, use the logout option from the dashboard.

Logging out removes the authentication token stored for the current browser session.

After logout, protected pages should no longer be accessible without logging in again.

---

## 12. Protected Pages

The application contains protected pages that require authentication.

Examples include:

```text
/pages/dashboard.html
/pages/password.html
/pages/vault.html
```

If a user attempts to access a protected page without a valid authentication token, the frontend redirects the user to the Login/Register page.

---

## 13. Authentication Session

The frontend stores the JWT authentication token in browser `sessionStorage`.

The token is automatically included in requests to protected password-management API endpoints.

The general flow is:

```text
Login
  ↓
Backend verifies credentials
  ↓
JWT generated
  ↓
JWT stored in browser session
  ↓
Protected API requests include JWT
  ↓
Backend verifies JWT
  ↓
Request is processed
```

The authentication token is removed when the user logs out.

---

## 14. Password Storage

Passwords stored in the vault are encrypted before being stored in MongoDB.

The general storage process is:

```text
User enters password
        ↓
Backend receives password
        ↓
Password is validated
        ↓
Password is encrypted
        ↓
Encrypted password stored in MongoDB
```

When a password is retrieved:

```text
Encrypted password
        ↓
Backend retrieves vault record
        ↓
Password is decrypted
        ↓
Password returned to authorized user
```

The encryption key is stored in the backend environment configuration and should never be committed to GitHub.

---

## 15. User Isolation

Each password record is associated with a specific authenticated user.

Password operations are performed using both:

* Password record ID
* Authenticated user ID

This prevents an authenticated user from intentionally requesting password records belonging to another user through the protected API.

---

## 16. Typical User Workflow

A normal session follows this workflow:

```text
Open Application
       ↓
Register / Login
       ↓
Dashboard
       ↓
Create or Generate Password
       ↓
Save Password
       ↓
Password Vault
       ↓
View / Update / Delete Password
       ↓
Logout
```

---

## 17. API Interaction

The frontend communicates with the backend through REST API endpoints.

The main API areas are:

```text
/api/auth
/api/passwords
```

Authentication endpoints handle:

* User registration
* User login

Password endpoints handle:

* Retrieving passwords
* Retrieving an individual password
* Adding passwords
* Updating passwords
* Deleting passwords

Detailed endpoint information is documented separately in:

```text
docs/API.md
```

---

## 18. Error Handling

The application provides error responses when an operation cannot be completed.

Examples include:

* Invalid username or password input
* Failed authentication
* Unauthorized API requests
* Invalid password data
* Invalid password record ID
* Password record not found
* Duplicate password entries
* Server or database errors

When an error occurs, the frontend displays an appropriate message to the user where applicable.

---

## 19. Security Recommendations

For safe usage:

* Use a strong master password.
* Do not share your master password.
* Do not share JWT or encryption secrets.
* Do not commit `backend/.env` to Git.
* Do not expose encryption keys publicly.
* Use the application only through trusted environments.
* Log out after using the application on a shared computer.

The project is intended primarily as a learning and portfolio application and should be further hardened before handling highly sensitive real-world credentials.

---

## 20. Stopping the Application

To stop the backend server, return to the terminal running the application and press:

```text
Ctrl + C
```

---

## 21. Restarting the Application

To restart the application:

```bash
npm start
```

The application will again be available at:

```text
http://localhost:3000/pages/index.html
```

---

## Usage Checklist

A successful user session should allow you to:

* [ ] Register an account
* [ ] Log in
* [ ] Access the dashboard
* [ ] Create or generate a password
* [ ] Save a password
* [ ] Open the password vault
* [ ] View a saved password
* [ ] Update a saved password
* [ ] Delete a saved password
* [ ] Log out
* [ ] Confirm protected pages require authentication

---

## Related Documentation

* Installation Guide — `docs/INSTALLATION.md`
* API Documentation — `docs/API.md`
* Architecture Documentation — `docs/ARCHITECTURE.md`
* Security Documentation — `docs/SECURITY.md`
* Project Roadmap — `Project-Roadmap.md`
