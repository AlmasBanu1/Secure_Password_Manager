// ==========================================================
// Secure Password Manager - Version 30.1
// ----------------------------------------------------------
// Input Validation
// ----------------------------------------------------------

// ==========================================================
// Username Validation
// ==========================================================

function validateUsername(username) {

    if (typeof username !== "string") {
        return "Username must be a string.";
    }

    const cleanUsername = username.trim();

    if (cleanUsername === "") {
        return "Username is required.";
    }

    if (cleanUsername.length < 3) {
        return "Username must contain at least 3 characters.";
    }

    if (cleanUsername.length > 30) {
        return "Username must not exceed 30 characters.";
    }

    // Allow letters, numbers, underscore and dot
    if (!/^[A-Za-z0-9_.]+$/.test(cleanUsername)) {
        return "Username contains invalid characters.";
    }

    return null;
}

// ==========================================================
// Master Password Validation
// ==========================================================

function validateMasterPassword(masterPassword) {

    if (typeof masterPassword !== "string") {
        return "Master password must be a string.";
    }

    if (masterPassword === "") {
        return "Master password is required.";
    }

    if (masterPassword.length < 8) {
        return "Master password must contain at least 8 characters.";
    }

    if (masterPassword.length > 128) {
        return "Master password must not exceed 128 characters.";
    }

    return null;
}

// ==========================================================
// Vault Password Validation
// ==========================================================

function validateVaultPassword(password) {

    if (typeof password !== "string") {
        return "Password must be a string.";
    }

    if (password.trim() === "") {
        return "Password is required.";
    }

    if (password.length > 1000) {
        return "Password must not exceed 1000 characters.";
    }

    return null;
}

// ==========================================================
// MongoDB ID Validation
// ==========================================================

function validateObjectId(id) {

    if (typeof id !== "string") {
        return false;
    }

    return /^[a-fA-F0-9]{24}$/.test(id);
}

// ==========================================================
// Export
// ==========================================================

module.exports = {
    validateUsername,
    validateMasterPassword,
    validateVaultPassword,
    validateObjectId
};