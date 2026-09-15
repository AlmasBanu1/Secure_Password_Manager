// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// API Module
// ----------------------------------------------------------
// Responsibilities:
// - Backend API communication
// - User registration
// - User login
// - JWT token management
// - Password CRUD operations
// - Centralized API error handling
//
// Deployment:
// - Uses the current application origin for API requests.
// - Works in local development and deployed environments.
// - Does not contain a hardcoded localhost API address.
// ==========================================================


// ==========================================================
// API Configuration
// ==========================================================
//
// The frontend and backend are served from the same origin.
//
// Local development:
// http://localhost:3000
//
// Deployed application:
// https://your-deployed-domain
//
// window.location.origin automatically provides the correct
// origin in both environments.
//
// This keeps the frontend deployment-safe without requiring
// a separate frontend environment configuration.
//

const API_BASE_URL =
    window.location.origin;


const AUTH_API_URL =
    `${API_BASE_URL}/api/auth`;


const PASSWORD_API_URL =
    `${API_BASE_URL}/api/passwords`;


// ==========================================================
// Token Storage
// ==========================================================
//
// Authentication tokens are stored only for the current
// browser session.
//
// sessionStorage automatically removes the token when the
// browser tab/session is closed.
//

const TOKEN_KEY =
    "secure_password_manager_token";


// ==========================================================
// Get Authentication Token
// ==========================================================

function getAuthToken() {

    return sessionStorage.getItem(
        TOKEN_KEY
    );

}


// ==========================================================
// Save Authentication Token
// ==========================================================

function saveAuthToken(token) {

    sessionStorage.setItem(
        TOKEN_KEY,
        token
    );

}


// ==========================================================
// Remove Authentication Token
// ==========================================================

function removeAuthToken() {

    sessionStorage.removeItem(
        TOKEN_KEY
    );

}


// ==========================================================
// Build Authentication Headers
// ==========================================================
//
// Adds the JWT token to API requests when an authenticated
// session exists.
//

function getAuthHeaders() {

    const token =
        getAuthToken();


    if (!token) {

        return {};

    }


    return {

        Authorization:
            `Bearer ${token}`

    };

}


// ==========================================================
// Generic API Request
// ==========================================================
//
// Centralizes:
// - Authentication headers
// - HTTP requests
// - JSON response handling
// - API error handling
//

async function apiRequest(
    url,
    options = {}
) {

    const headers = {

        ...getAuthHeaders(),

        ...(options.headers || {})

    };


    const response =
        await fetch(
            url,
            {
                ...options,
                headers
            }
        );


    let data = null;


    try {

        data =
            await response.json();

    } catch (error) {

        data = null;

    }


    if (!response.ok) {

        throw new Error(

            data?.error ||
            "Unable to communicate with the server."

        );

    }


    return data;

}


// ==========================================================
// Register User
// ==========================================================

async function registerUser(
    username,
    masterPassword
) {

    return await apiRequest(

        `${AUTH_API_URL}/register`,

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify({

                    username,
                    masterPassword

                })

        }

    );

}


// ==========================================================
// Login User
// ==========================================================

async function loginUser(
    username,
    masterPassword
) {

    const data =
        await apiRequest(

            `${AUTH_API_URL}/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify({

                        username,
                        masterPassword

                    })

            }

        );


    saveAuthToken(
        data.token
    );


    return data;

}


// ==========================================================
// Logout User
// ==========================================================

function logoutUser() {

    removeAuthToken();

}


// ==========================================================
// Check Authentication
// ==========================================================

function isAuthenticated() {

    return Boolean(
        getAuthToken()
    );

}


// ==========================================================
// GET All Passwords
// ==========================================================

async function getPasswords() {

    return await apiRequest(

        PASSWORD_API_URL

    );

}


// ==========================================================
// GET Single Password
// ==========================================================

async function getPassword(
    passwordId
) {

    return await apiRequest(

        `${PASSWORD_API_URL}/${passwordId}`

    );

}


// ==========================================================
// POST Password
// ==========================================================

async function addPassword(
    password
) {

    return await apiRequest(

        PASSWORD_API_URL,

        {

            method: "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify({

                    password

                })

        }

    );

}


// ==========================================================
// PUT Password
// ==========================================================

async function updatePassword(
    passwordId,
    password
) {

    return await apiRequest(

        `${PASSWORD_API_URL}/${passwordId}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify({

                    password

                })

        }

    );

}


// ==========================================================
// DELETE Password
// ==========================================================

async function deletePassword(
    passwordId
) {

    return await apiRequest(

        `${PASSWORD_API_URL}/${passwordId}`,

        {

            method: "DELETE"

        }

    );

}


// ==========================================================
// Export
// ==========================================================

export {

    registerUser,

    loginUser,

    logoutUser,

    isAuthenticated,

    getAuthToken,

    getPasswords,

    getPassword,

    addPassword,

    updatePassword,

    deletePassword

};