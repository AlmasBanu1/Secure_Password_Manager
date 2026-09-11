// ==========================================================
// Secure Password Manager - Password Page
// ----------------------------------------------------------
// Responsibilities:
// - Handle password generation
// - Handle password input
// - Validate password
// - Add password to the account
// - Handle password visibility
// - Protect the page from unauthenticated users
// - Handle navigation
// - Handle logout
// - Coordinate API, Password and UI modules
// ==========================================================


// ==========================================================
// API Module
// ==========================================================

import {
    isAuthenticated,
    addPassword,
    logoutUser
} from "./api.js";


// ==========================================================
// Password Module
// ==========================================================

import {
    generatePassword,
    validatePassword,
    getPasswordStrength
} from "./password.js";


// ==========================================================
// UI Module
// ==========================================================

import {
    getElement,
    showMessage,
    clearMessage,
    setInputValue,
    getInputValue
} from "./ui.js";


// ==========================================================
// DOM Elements
// ==========================================================

const passwordInput =
    getElement("passwordInput");

const generateButton =
    getElement("generateButton");

const addButton =
    getElement("addButton");

const passwordVisibilityButton =
    getElement("passwordVisibilityButton");

const backToDashboardButton =
    getElement("backToDashboardButton");

const logoutButton =
    getElement("logoutButton");


// ==========================================================
// Generate Password
// ==========================================================

function handleGeneratePassword() {

    clearMessage();


    const password =
        generatePassword(12);


    setInputValue(
        passwordInput,
        password
    );


    showMessage(
        `Generated ${getPasswordStrength(password)} password.`,
        "success"
    );

}


// ==========================================================
// Add Password
// ==========================================================

async function handleAddPassword() {

    clearMessage();


    // ------------------------------------------------------
    // Authentication check
    // ------------------------------------------------------

    if (!isAuthenticated()) {

        showMessage(
            "Please login before adding a password.",
            "error"
        );

        return;

    }


    // ------------------------------------------------------
    // Get password
    // ------------------------------------------------------

    const password =
        getInputValue(
            passwordInput
        ).trim();


    // ------------------------------------------------------
    // Validate password
    // ------------------------------------------------------

    const validation =
        validatePassword(
            password
        );


    if (!validation.valid) {

        showMessage(
            validation.message,
            "error"
        );

        return;

    }


    // ------------------------------------------------------
    // Add password through API
    // ------------------------------------------------------

    try {

        const result =
            await addPassword(
                password
            );


        showMessage(
            result.message ||
            "Password added successfully.",
            "success"
        );


        // --------------------------------------------------
        // Clear input after successful addition
        // --------------------------------------------------

        setInputValue(
            passwordInput,
            ""
        );

    } catch (error) {

        console.error(
            "Add password error:",
            error
        );


        showMessage(
            error.message ||
            "Unable to add password.",
            "error"
        );

    }

}


// ==========================================================
// Password Visibility
// ==========================================================

function handlePasswordVisibility() {

    if (
        !passwordInput ||
        !passwordVisibilityButton
    ) {

        return;

    }


    // ------------------------------------------------------
    // Show password
    // ------------------------------------------------------

    if (
        passwordInput.type ===
        "password"
    ) {

        passwordInput.type =
            "text";


        passwordVisibilityButton.setAttribute(
            "aria-label",
            "Hide password"
        );


        passwordVisibilityButton.setAttribute(
            "title",
            "Hide password"
        );

    }


    // ------------------------------------------------------
    // Hide password
    // ------------------------------------------------------

    else {

        passwordInput.type =
            "password";


        passwordVisibilityButton.setAttribute(
            "aria-label",
            "Show password"
        );


        passwordVisibilityButton.setAttribute(
            "title",
            "Show password"
        );

    }

}


// ==========================================================
// Back to Dashboard
// ==========================================================

function handleBackToDashboard() {

    if (!isAuthenticated()) {

        window.location.href =
            "./index.html";

        return;

    }


    window.location.href =
        "./dashboard.html";

}


// ==========================================================
// Logout
// ==========================================================

function handleLogout() {

    try {

        logoutUser();


        window.location.href =
            "./index.html";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );


        showMessage(
            "Unable to logout.",
            "error"
        );

    }

}


// ==========================================================
// Register Event Listeners
// ==========================================================

function registerEventListeners() {


    // ------------------------------------------------------
    // Generate Password
    // ------------------------------------------------------

    if (generateButton) {

        generateButton.addEventListener(
            "click",
            handleGeneratePassword
        );

    }


    // ------------------------------------------------------
    // Add Password
    // ------------------------------------------------------

    if (addButton) {

        addButton.addEventListener(
            "click",
            handleAddPassword
        );

    }


    // ------------------------------------------------------
    // Password Visibility
    // ------------------------------------------------------

    if (passwordVisibilityButton) {

        passwordVisibilityButton.addEventListener(
            "click",
            handlePasswordVisibility
        );

    }


    // ------------------------------------------------------
    // Back to Dashboard
    // ------------------------------------------------------

    if (backToDashboardButton) {

        backToDashboardButton.addEventListener(
            "click",
            handleBackToDashboard
        );

    }


    // ------------------------------------------------------
    // Logout
    // ------------------------------------------------------

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            handleLogout
        );

    }

}


// ==========================================================
// Protect Password Page
// ==========================================================

function protectPasswordPage() {

    if (!isAuthenticated()) {

        window.location.href =
            "./index.html";

        return false;

    }


    return true;

}


// ==========================================================
// Initialize Password Page
// ==========================================================

function initializePasswordPage() {

    console.log(
        "Secure Password Manager password page initialized."
    );


    // ------------------------------------------------------
    // Authentication protection
    // ------------------------------------------------------

    if (!protectPasswordPage()) {

        return;

    }


    // ------------------------------------------------------
    // Register events
    // ------------------------------------------------------

    registerEventListeners();

}


// ==========================================================
// Start Password Page
// ==========================================================

initializePasswordPage();


// ==========================================================
// Export
// ==========================================================

export {

    initializePasswordPage,

    handleGeneratePassword,

    handleAddPassword,

    handlePasswordVisibility,

    handleBackToDashboard,

    handleLogout

};