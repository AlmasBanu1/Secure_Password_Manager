// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Password Routes
// ----------------------------------------------------------
// Responsibilities:
// - Define password API endpoints
// - Protect all password routes with authentication
// - Forward requests to password controllers
// ==========================================================

const express = require("express");

const {
    getAllPasswords,
    getSinglePassword,
    addPassword,
    updatePassword,
    deletePassword
} = require("../controllers/passwordController");

const {
    authenticateToken
} = require("../middleware/authMiddleware");


// ==========================================================
// Router
// ==========================================================

const router = express.Router();


// ==========================================================
// GET ALL PASSWORDS
// ==========================================================

router.get(
    "/",
    authenticateToken,
    getAllPasswords
);


// ==========================================================
// GET SINGLE PASSWORD
// ==========================================================

router.get(
    "/:id",
    authenticateToken,
    getSinglePassword
);


// ==========================================================
// ADD PASSWORD
// ==========================================================

router.post(
    "/",
    authenticateToken,
    addPassword
);


// ==========================================================
// UPDATE PASSWORD
// ==========================================================

router.put(
    "/:id",
    authenticateToken,
    updatePassword
);


// ==========================================================
// DELETE PASSWORD
// ==========================================================

router.delete(
    "/:id",
    authenticateToken,
    deletePassword
);


// ==========================================================
// Export
// ==========================================================

module.exports = router;