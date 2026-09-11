// ==========================================================
// Secure Password Manager - Dashboard
// ----------------------------------------------------------
// Responsibilities:
// - Protect dashboard from unauthenticated access
// - Navigate to Password Creation page
// - Navigate to Password Vault page
// - Handle logout
// - Coordinate authentication state
// ==========================================================


// ==========================================================
// API Module
// ==========================================================

import {
    isAuthenticated,
    logoutUser
} from "./api.js";


// ==========================================================
// UI Module
// ==========================================================

import {
    getElement,
    showMessage,
    clearMessage
} from "./ui.js";


// ==========================================================
// DOM Elements
// ==========================================================

const createPasswordButton =
    getElement(
        "createPasswordButton"
    );


const vaultButton =
    getElement(
        "vaultButton"
    );


const logoutButton =
    getElement(
        "logoutButton"
    );


// ==========================================================
// Protect Dashboard
// ==========================================================

function protectDashboard() {

    if (!isAuthenticated()) {

        window.location.href =
            "./index.html";

        return false;

    }


    return true;

}


// ==========================================================
// Navigate to Password Creation Page
// ==========================================================

function handleCreatePassword() {

    clearMessage();


    window.location.href =
        "./password.html";

}


// ==========================================================
// Navigate to Password Vault
// ==========================================================

function handleOpenVault() {

    clearMessage();


    window.location.href =
        "./vault.html";

}


// ==========================================================
// Logout
// ==========================================================

function handleLogout() {

    try {

        logoutUser();


        showMessage(
            "Logged out successfully.",
            "success"
        );


        // --------------------------------------------------
        // Return to login page
        // --------------------------------------------------

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
    // Create Password
    // ------------------------------------------------------

    if (createPasswordButton) {

        createPasswordButton.addEventListener(
            "click",
            handleCreatePassword
        );

    }


    // ------------------------------------------------------
    // Password Vault
    // ------------------------------------------------------

    if (vaultButton) {

        vaultButton.addEventListener(
            "click",
            handleOpenVault
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
// Initialize Dashboard
// ==========================================================

function initializeDashboard() {

    console.log(
        "Secure Password Manager dashboard initialized."
    );


    // ------------------------------------------------------
    // Authentication protection
    // ------------------------------------------------------

    if (!protectDashboard()) {

        return;

    }


    // ------------------------------------------------------
    // Register events
    // ------------------------------------------------------

    registerEventListeners();

}


// ==========================================================
// Start Dashboard
// ==========================================================

initializeDashboard();


// ==========================================================
// Export
// ==========================================================

export {

    initializeDashboard,

    handleCreatePassword,

    handleOpenVault,

    handleLogout

};