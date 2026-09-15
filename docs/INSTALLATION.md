# Secure Password Manager — Installation Guide

This guide explains how to set up and run the Secure Password Manager locally for development and testing.

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB
* Git

### Verify Node.js and npm

```bash
node --version
npm --version
```

### Verify Git

```bash
git --version
```

A recent LTS version of Node.js is recommended.

---

## 1. Clone the Repository

Clone the repository:

```bash
git clone https://github.com/AlmasBanu1/Secure_Password_Manager.git
```

Navigate to the project directory:

```bash
cd Secure_Password_Manager
```

---

## 2. Install Dependencies

Install the project dependencies:

```bash
npm install
```

The project uses the following major packages:

* Express
* MongoDB
* bcrypt
* JSON Web Token
* dotenv
* CORS

---

## 3. Set Up MongoDB

The application uses MongoDB for persistent data storage.

Make sure MongoDB is running before starting the application.

The database connection is configured in:

```text
backend/config/db.js
```

When the connection is successful, the server displays:

```text
MongoDB connected successfully.
```

---

## 4. Configure Environment Variables

The application uses environment variables to store sensitive configuration values.

Create the following file:

```text
backend/.env
```

A template is provided in:

```text
backend/.env.example
```

Add the required environment variables to `backend/.env`:

```env
ENCRYPTION_KEY=your_encryption_key_here
JWT_SECRET=your_jwt_secret_here
VAULT_ENCRYPTION_KEY=your_64_character_vault_key_here
```

Replace the placeholder values with your own secure secrets.

### Environment Variables

#### ENCRYPTION_KEY

Used by the application's encryption-related configuration.

Use a strong, private value.

#### JWT_SECRET

Used to sign and verify JSON Web Tokens used for authentication.

Use a long and unpredictable secret.

#### VAULT_ENCRYPTION_KEY

Used for AES-based encryption of passwords stored in the vault.

The application requires this value to be a 64-character hexadecimal key.

---

## 5. Protect Your Secrets

Never commit the following file to GitHub:

```text
backend/.env
```

The `.gitignore` file is configured to prevent environment files from being tracked.

Only the following file should be included in the repository:

```text
backend/.env.example
```

The `.env.example` file contains placeholders and does not contain actual secrets.

Never share:

* JWT secrets
* Encryption keys
* Master passwords
* Database credentials
* Other sensitive environment variables

---

## 6. Start the Application

From the project root, run:

```bash
npm start
```

The `start` script runs:

```bash
node backend/server.js
```

A successful startup should display messages similar to:

```text
MongoDB connected successfully.
Secure Password Manager server running on http://localhost:3000
```

---

## 7. Open the Application

After the server starts, open the following page in your browser.

### Login / Register

http://localhost:3000/pages/index.html

### Dashboard

http://localhost:3000/pages/dashboard.html

### Password Generator / Creation

http://localhost:3000/pages/password.html

### Password Vault

http://localhost:3000/pages/vault.html

---

## 8. Verify the Installation

After starting the application, verify the following.

### Server

The terminal should display:

```text
Secure Password Manager server running on http://localhost:3000
```

### Database

The terminal should display:

```text
MongoDB connected successfully.
```

### Frontend

Open:

http://localhost:3000/pages/index.html

The Login/Register page should load successfully.

### Authentication

Test the authentication flow:

1. Register a new account.
2. Log in with the account.
3. Confirm that the dashboard opens.
4. Log out.
5. Confirm that protected pages require authentication.

### Password Vault

After logging in:

1. Create a password.
2. Open the password vault.
3. Verify the saved password.
4. Update the password.
5. Delete the password.

---

## 9. Stop the Server

To stop the development server, press:

```text
Ctrl + C
```

in the terminal running the application.

---

## 10. Restart the Application

If the server has been stopped, start it again from the project root:

```bash
npm start
```

There is no need to run `npm install` every time.

Run `npm install` again only when:

* Dependencies have changed.
* `package.json` has been modified.
* `node_modules` needs to be recreated.

---

## Troubleshooting

### `npm start` Does Not Work

Make sure the dependencies are installed:

```bash
npm install
```

Then start the application:

```bash
npm start
```

---

### MongoDB Connection Fails

Check that:

* MongoDB is running.
* The database configuration is correct.
* The required environment variables are available.

Then restart the application.

---

### Vault Encryption Key Error

If the application displays:

```text
VAULT_ENCRYPTION_KEY must be a 64-character hexadecimal key.
```

check the value in:

```text
backend/.env
```

The key must contain exactly 64 hexadecimal characters.

---

### Environment Variables Are Not Loaded

Make sure the environment file is located at:

```text
backend/.env
```

The backend explicitly loads the environment configuration from the `backend` directory.

---

### Port 3000 Is Already in Use

If another application is already using port `3000`, stop that application before starting the Secure Password Manager.

---

## Relevant Configuration Files

```text
Secure_Password_Manager/
│
├── backend/
│   ├── .env
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   └── server.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

---

## Installation Complete

The local installation is complete when:

1. Dependencies are installed successfully.
2. MongoDB connects successfully.
3. `npm start` starts the backend server.
4. The Login/Register page loads at:

http://localhost:3000/pages/index.html

5. Registration and login work successfully.
6. Protected pages and password vault operations work correctly.
