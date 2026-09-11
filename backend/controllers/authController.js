// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Authentication Controller
// ----------------------------------------------------------
// Responsibilities:
// - Handle HTTP requests and responses
// - Validate registration/login input
// - Coordinate authentication operations
// - Generate JWT tokens
// ==========================================================

// ==========================================================
// JWT
// ==========================================================

const jwt =
    require("jsonwebtoken");

// ==========================================================
// User Model
// ==========================================================

const {
    createUser,
    findUserByUsername,
    verifyMasterPassword
} = require("../models/userModel");

// ==========================================================
// Validation
// ==========================================================

const {
    validateUsername,
    validateMasterPassword
} = require("../middleware/validation");

// ==========================================================
// Configuration
// ==========================================================

const JWT_SECRET =
    process.env.JWT_SECRET;

const JWT_EXPIRES_IN =
    process.env.JWT_EXPIRES_IN || "1h";

// ==========================================================
// GET AND VALIDATE CREDENTIALS
// ==========================================================

function getValidatedCredentials(req) {

    const username =
        req.body.username;

    const masterPassword =
        req.body.masterPassword;

    // ------------------------------------------------------
    // Validate username
    // ------------------------------------------------------

    const usernameError =
        validateUsername(username);

    if (usernameError) {

        return {
            error: usernameError
        };

    }

    // ------------------------------------------------------
    // Validate master password
    // ------------------------------------------------------

    const masterPasswordError =
        validateMasterPassword(
            masterPassword
        );

    if (masterPasswordError) {

        return {
            error: masterPasswordError
        };

    }

    // ------------------------------------------------------
    // Clean username
    // ------------------------------------------------------

    const cleanUsername =
        username.trim();

    return {
        username: cleanUsername,
        masterPassword: masterPassword
    };

}

// ==========================================================
// REGISTER USER
// ==========================================================

async function registerUser(req, res) {

    try {

        const credentials =
            getValidatedCredentials(req);

        // --------------------------------------------------
        // Return validation error
        // --------------------------------------------------

        if (credentials.error) {

            return res.status(400).json({
                error:
                    credentials.error
            });

        }

        // --------------------------------------------------
        // Check for existing user
        // --------------------------------------------------

        const existingUser =
            await findUserByUsername(
                credentials.username
            );

        if (existingUser) {

            return res.status(409).json({
                error:
                    "Username already exists."
            });

        }

        // --------------------------------------------------
        // Create user
        // --------------------------------------------------

        const user =
            await createUser(
                credentials.username,
                credentials.masterPassword
            );

        // --------------------------------------------------
        // Send safe response
        // --------------------------------------------------

        return res.status(201).json({

            message:
                "User registered successfully.",

            user:
                user

        });

    } catch (error) {

        console.error(
            "Register controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to register user."
        });

    }

}

// ==========================================================
// LOGIN USER
// ==========================================================

async function loginUser(req, res) {

    try {

        const credentials =
            getValidatedCredentials(req);

        // --------------------------------------------------
        // Return validation error
        // --------------------------------------------------

        if (credentials.error) {

            return res.status(400).json({
                error:
                    credentials.error
            });

        }

        // --------------------------------------------------
        // Find user
        // --------------------------------------------------

        const user =
            await findUserByUsername(
                credentials.username
            );

        // --------------------------------------------------
        // Prevent username enumeration
        // --------------------------------------------------

        if (!user) {

            return res.status(401).json({
                error:
                    "Invalid username or master password."
            });

        }

        // --------------------------------------------------
        // Verify master password
        // --------------------------------------------------

        const passwordCorrect =
            await verifyMasterPassword(
                credentials.masterPassword,
                user.passwordHash
            );

        if (!passwordCorrect) {

            return res.status(401).json({
                error:
                    "Invalid username or master password."
            });

        }

        // --------------------------------------------------
        // Generate JWT
        // --------------------------------------------------

        const token =
            jwt.sign(

                {
                    userId:
                        user._id.toString(),

                    username:
                        user.username
                },

                JWT_SECRET,

                {
                    expiresIn:
                        JWT_EXPIRES_IN
                }

            );

        // --------------------------------------------------
        // Send login response
        // --------------------------------------------------

        return res.json({

            message:
                "Login successful.",

            token:
                token,

            user: {

                id:
                    user._id.toString(),

                username:
                    user.username

            }

        });

    } catch (error) {

        console.error(
            "Login controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to login."
        });

    }

}

// ==========================================================
// Export
// ==========================================================

module.exports = {

    registerUser,
    loginUser

};