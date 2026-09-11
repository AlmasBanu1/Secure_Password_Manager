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
// ==========================================================


// ==========================================================
// API Configuration
// ==========================================================

const API_BASE_URL =
    "http://127.0.0.1:3000"; 
 
const AUTH_API_URL = 
    `${API_BASE_URL}/api/auth`; 
 
const PASSWORD_API_URL = 
    `${API_BASE_URL}/api/passwords`; 
 
 
// ========================================================== 
// Token Storage 
// ========================================================== 
 
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