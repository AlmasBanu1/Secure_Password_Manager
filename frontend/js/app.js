// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Authentication Controller
// ----------------------------------------------------------
// Responsibilities:
// - Register user
// - Login user
// - Handle master password visibility
// - Handle logout if required
// - Redirect authenticated users to dashboard
//
// IMPORTANT:
// This file is ONLY responsible for authentication.
// Password generation, password storage, search, edit,
// delete and password-list functionality are handled by:
//
// - dashboard.js
// - password-page.js
// ==========================================================


// ==========================================================
// API Module
// ==========================================================

import {
    isAuthenticated,
    registerUser,
    loginUser,
    logoutUser
} from "./api.js";


// ==========================================================
// UI Module
// ==========================================================

import {
    getElement,
    showMessage,
    clearMessage,
    togglePasswordVisibility
} from "./ui.js";


// ==========================================================
// DOM Elements
// ==========================================================


// ----------------------------------------------------------
// Authentication Inputs
// ----------------------------------------------------------

const usernameInput =
    getElement("usernameInput");

const masterPasswordInput =
    getElement("masterPasswordInput");


// ----------------------------------------------------------
// Authentication Buttons
// ----------------------------------------------------------

const registerButton =
    getElement("registerButton");

const loginButton =
    getElement("loginButton");


// ----------------------------------------------------------
// Master Password Visibility Button
// ----------------------------------------------------------

const masterPasswordVisibilityButton =
    getElement(
        "masterPasswordVisibilityButton"
    );


// ==========================================================
// Get Authentication Input
// ==========================================================

function getAuthenticationInput() {

    const username =
        usernameInput
            ? usernameInput.value.trim()
            : "";


    const masterPassword =
        masterPasswordInput
            ? masterPasswordInput.value
            : "";


    return {

        username,

        masterPassword

    };

}


// ==========================================================
// Register User
// ==========================================================

async function handleRegister() {

    clearMessage();


    // ------------------------------------------------------
    // Get Input
    // ------------------------------------------------------

    const {
        username,
        masterPassword
    } =
        getAuthenticationInput();


    // ------------------------------------------------------
    // Validate Username
    // ------------------------------------------------------

    if (
        username === ""
    ) {

        showMessage(
            "Username is required.",
            "error"
        );

        return;

    }


    // ------------------------------------------------------
    // Validate Master Password
    // ------------------------------------------------------

    if (
        masterPassword.trim() === ""
    ) {

        showMessage(
            "Master password is required.",
            "error"
        );

        return;

    }


    // ------------------------------------------------------
    // Register User
    // ------------------------------------------------------

    try {

        const result =
            await registerUser(
                username,
                masterPassword
            );


        // --------------------------------------------------
        // Registration Success
        // --------------------------------------------------

        showMessage(
            result?.message ||
            "Registration successful. You can now login.",
            "success"
        );


        // --------------------------------------------------
        // Clear Master Password
        // --------------------------------------------------

        if (masterPasswordInput) {

            masterPasswordInput.value =
                "";

        }


        console.log(
            "User registration successful."
        );

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        showMessage(
            error.message ||
            "Registration failed.",
            "error"
        );

    }

}


// ==========================================================
// Login User
// ==========================================================

async function handleLogin() {

    clearMessage();


    // ------------------------------------------------------
    // Get Input
    // ------------------------------------------------------

    const {
        username,
        masterPassword
    } =
        getAuthenticationInput();


    // ------------------------------------------------------
    // Validate Username
    // ------------------------------------------------------

    if (
        username === ""
    ) {

        showMessage(
            "Username is required.",
            "error"
        );

        return;

    }


    // ------------------------------------------------------
    // Validate Master Password
    // ------------------------------------------------------

    if (
        masterPassword.trim() === ""
    ) {

        showMessage(
            "Master password is required.",
            "error"
        );

        return;

    }


    // ------------------------------------------------------
    // Login User
    // ------------------------------------------------------

    try {

        const result =
            await loginUser(
                username,
                masterPassword
            );


        console.log(
            "Login successful."
        );


        // --------------------------------------------------
        // Clear Master Password
        // --------------------------------------------------

        if (masterPasswordInput) {

            masterPasswordInput.value =
                "";

        }


        // --------------------------------------------------
        // Redirect to Dashboard
        // --------------------------------------------------

        showMessage(
            result?.message ||
            "Login successful.",
            "success"
        );


        /*
         * Small delay allows the success message to be
         * displayed before navigation.
         */

        setTimeout(
            function () {

                window.location.href =
                    "/pages/dashboard.html";

            },
            400
        );


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        showMessage(
            error.message ||
            "Login failed.",
            "error"
        );

    }

}


// ==========================================================
// Master Password Visibility
// ==========================================================

function handleMasterPasswordVisibility() {

    if (
        !masterPasswordInput ||
        !masterPasswordVisibilityButton
    ) {

        return;

    }


    togglePasswordVisibility(
        masterPasswordInput,
        masterPasswordVisibilityButton
    );

}


// ==========================================================
// Register Event Listeners
// ==========================================================

function registerEventListeners() {


    // ------------------------------------------------------
    // Register Button
    // ------------------------------------------------------

    if (registerButton) {

        registerButton.addEventListener(
            "click",
            handleRegister
        );

    }


    // ------------------------------------------------------
    // Login Button
    // ------------------------------------------------------

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            handleLogin
        );

    }


    // ------------------------------------------------------
    // Master Password Visibility
    // ------------------------------------------------------

    if (
        masterPasswordInput &&
        masterPasswordVisibilityButton
    ) {

        masterPasswordVisibilityButton.addEventListener(
            "click",
            handleMasterPasswordVisibility
        );

    }

}


// ==========================================================
// Protect Login Page
// ==========================================================

function protectLoginPage() {

    /*
     * If the user is already authenticated and manually
     * opens index.html, send them directly to dashboard.
     */

    if (
        isAuthenticated()
    ) {

        console.log(
            "Authenticated session found."
        );


        window.location.href =
            "/pages/dashboard.html";


        return false;

    }


    return true;

}


// ==========================================================
// Initialize Application
// ==========================================================

function initializeApplication() {

    console.log(
        "Secure Password Manager authentication initialized."
    );


    // ------------------------------------------------------
    // Protect Login Page
    // ------------------------------------------------------

    if (
        !protectLoginPage()
    ) {

        return;

    }


    // ------------------------------------------------------
    // Register Authentication Events
    // ------------------------------------------------------

    registerEventListeners();

}


// ==========================================================
// Start Application
// ==========================================================

initializeApplication();


// ==========================================================
// Export
// ==========================================================

export {

    initializeApplication,

    handleRegister,

    handleLogin,

    handleMasterPasswordVisibility

};