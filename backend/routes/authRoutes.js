// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Authentication Routes
// ----------------------------------------------------------
// Responsibilities:
// - Define authentication endpoints
// - Forward requests to authentication controllers
// ==========================================================

const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");


// ==========================================================
// Router
// ==========================================================

const router = express.Router();


// ==========================================================
// REGISTER
// ==========================================================

router.post(
    "/register",
    registerUser
);


// ==========================================================
// LOGIN
// ==========================================================

router.post(
    "/login",
    loginUser
);


// ==========================================================
// Export
// ==========================================================

module.exports = router;