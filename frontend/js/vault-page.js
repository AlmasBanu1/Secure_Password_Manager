// ==========================================================
// Secure Password Manager - Password Vault
// ----------------------------------------------------------
// Responsibilities:
// - Protect vault from unauthenticated users
// - Load stored passwords
// - Display stored passwords
// - Search passwords
// - Show / hide passwords
// - Copy passwords
// - Edit passwords
// - Delete passwords
// - Navigate between dashboard and password page
// - Logout
// ==========================================================

import {
    isAuthenticated,
    logoutUser,
    getPasswords,
    updatePassword,
    deletePassword
} from "./api.js";

import {
    validatePassword,
    searchPasswords,
    isDuplicatePassword
} from "./password.js";

import {
    getElement,
    renderPasswordList,
    showMessage,
    clearMessage,
    getInputValue,
    highlightText
} from "./ui.js";

const searchInput = getElement("searchInput");
const searchButton = getElement("searchButton");
const passwordList = getElement("passwordList");
const passwordCount = getElement("passwordCount");
const dashboardButton = getElement("dashboardButton");
const createPasswordButton = getElement("createPasswordButton");
const logoutButton = getElement("logoutButton");

// Button positions created by ui.js.
// Keeping these names here makes the existing UI contract explicit.
const SHOW_BUTTON_INDEX = 0;
const COPY_BUTTON_INDEX = 1;
const EDIT_BUTTON_INDEX = 2;
const DELETE_BUTTON_INDEX = 3;

let storedPasswords = [];

// ==========================================================
// Render Passwords
// ==========================================================

function renderPasswords(list = storedPasswords, searchTerm = "") {
    renderPasswordList(
        passwordList,
        list,
        passwordCount
    );

    if (searchTerm && searchTerm.trim() !== "") {
        const passwordItems =
            passwordList.querySelectorAll(
                ".stored-password-text"
            );

        passwordItems.forEach(function (element) {
            highlightText(element, searchTerm);
        });
    }

    const passwordItems =
        passwordList.querySelectorAll(
            ".password-item"
        );

    passwordItems.forEach(function (item, index) {
        const record = list[index];

        if (!record) {
            return;
        }

        const buttons =
            item.querySelectorAll("button");

        const editButton =
            buttons[EDIT_BUTTON_INDEX];

        const deleteButton =
            buttons[DELETE_BUTTON_INDEX];

        if (editButton) {
            editButton.addEventListener(
                "click",
                function () {
                    handleEditPassword(record);
                }
            );
        }

        if (deleteButton) {
            deleteButton.addEventListener(
                "click",
                function () {
                    handleDeletePassword(record);
                }
            );
        }
    });
}

// ==========================================================
// Load Passwords
// ==========================================================

async function loadPasswords() {
    try {
        clearMessage();

        if (!isAuthenticated()) {
            window.location.href = "./index.html";
            return;
        }

        storedPasswords = await getPasswords();

        renderPasswords();

        console.log(
            "Vault passwords loaded:",
            storedPasswords.length
        );
    } catch (error) {
        console.error(
            "Load vault passwords error:",
            error
        );

        showMessage(
            error.message ||
            "Unable to load passwords.",
            "error"
        );
    }
}

// ==========================================================
// Search
// ==========================================================

function handleSearch() {
    const searchTerm = getInputValue(searchInput);

    const results = searchPasswords(
        storedPasswords,
        searchTerm
    );

    renderPasswords(
        results,
        searchTerm
    );
}

// ==========================================================
// Edit Password
// ==========================================================

async function handleEditPassword(record) {
    if (!isAuthenticated()) {
        showMessage(
            "Please login first.",
            "error"
        );
        return;
    }

    const newPassword = window.prompt(
        "Enter the new password:",
        record.password
    );

    if (newPassword === null) {
        return;
    }

    const validation = validatePassword(
        newPassword
    );

    if (!validation.valid) {
        showMessage(
            validation.message,
            "error"
        );
        return;
    }

    if (
        isDuplicatePassword(
            storedPasswords,
            newPassword,
            record._id
        )
    ) {
        showMessage(
            "This password is already stored.",
            "error"
        );
        return;
    }

    try {
        const result = await updatePassword(
            record._id,
            newPassword
        );

        showMessage(
            result.message ||
            "Password updated successfully.",
            "success"
        );

        await loadPasswords();
    } catch (error) {
        console.error(
            "Update password error:",
            error
        );

        showMessage(
            error.message ||
            "Unable to update password.",
            "error"
        );
    }
}

// ==========================================================
// Delete Password
// ==========================================================

async function handleDeletePassword(record) {
    if (!isAuthenticated()) {
        showMessage(
            "Please login first.",
            "error"
        );
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to delete this password?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const result = await deletePassword(
            record._id
        );

        showMessage(
            result.message ||
            "Password deleted successfully.",
            "success"
        );

        await loadPasswords();
    } catch (error) {
        console.error(
            "Delete password error:",
            error
        );

        showMessage(
            error.message ||
            "Unable to delete password.",
            "error"
        );
    }
}

// ==========================================================
// Navigation
// ==========================================================

function handleDashboardNavigation() {
    window.location.href = "./dashboard.html";
}

function handleCreatePassword() {
    window.location.href = "./password.html";
}

// ==========================================================
// Logout
// ==========================================================

function handleLogout() {
    try {
        logoutUser();

        window.location.href = "./index.html";
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
// Event Listeners
// ==========================================================

function registerEventListeners() {
    if (searchButton) {
        searchButton.addEventListener(
            "click",
            handleSearch
        );
    }

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            handleSearch
        );
    }

    if (dashboardButton) {
        dashboardButton.addEventListener(
            "click",
            handleDashboardNavigation
        );
    }

    if (createPasswordButton) {
        createPasswordButton.addEventListener(
            "click",
            handleCreatePassword
        );
    }

    if (logoutButton) {
        logoutButton.addEventListener(
            "click",
            handleLogout
        );
    }
}

// ==========================================================
// Authentication Protection
// ==========================================================

function protectVault() {
    if (!isAuthenticated()) {
        window.location.href = "./index.html";
        return false;
    }

    return true;
}

// ==========================================================
// Initialization
// ==========================================================

async function initializeVault() {
    console.log(
        "Secure Password Manager vault initialized."
    );

    if (!protectVault()) {
        return;
    }

    registerEventListeners();

    await loadPasswords();
}

initializeVault();

// ==========================================================
// Exports
// ==========================================================

export {
    initializeVault,
    loadPasswords,
    handleSearch,
    handleEditPassword,
    handleDeletePassword,
    handleDashboardNavigation,
    handleCreatePassword,
    handleLogout
};