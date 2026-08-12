// ==========================================================
// Secure Password Manager - Version 29
// ----------------------------------------------------------
// User Model
// ----------------------------------------------------------
// Responsibilities:
// - Create users
// - Hash master passwords
// - Find users
// - Check whether a user exists
// - Never store the original master password
// ==========================================================

// ==========================================================
// Imports
// ==========================================================

const bcrypt = require("bcrypt");

const {
    getDatabase
} = require("./db");

// ==========================================================
// Configuration
// ==========================================================

const USERS_COLLECTION = "users";

const SALT_ROUNDS = 12;

// ==========================================================
// Create User
// ==========================================================

async function createUser(
    username,
    masterPassword
) {

    const database =
        getDatabase();

    const users =
        database.collection(
            USERS_COLLECTION
        );

    // Check whether username already exists

    const existingUser =
        await users.findOne({
            username: username
        });

    if (existingUser) {

        throw new Error(
            "User already exists."
        );

    }

    // Hash master password

    const passwordHash =
        await bcrypt.hash(
            masterPassword,
            SALT_ROUNDS
        );

    // Create user record

    const newUser = {

        username: username,

        passwordHash: passwordHash,

        createdAt: new Date()

    };

    // Store user

    const result =
        await users.insertOne(
            newUser
        );

    // Return safe user information

    return {

        id:
            result.insertedId.toString(),

        username:
            newUser.username,

        createdAt:
            newUser.createdAt

    };

}

// ==========================================================
// Find User By Username
// ==========================================================

async function findUserByUsername(
    username
) {

    const database =
        getDatabase();

    const users =
        database.collection(
            USERS_COLLECTION
        );

    return await users.findOne({
        username: username
    });

}

// ==========================================================
// Verify Master Password
// ==========================================================

async function verifyMasterPassword(
    masterPassword,
    passwordHash
) {

    return await bcrypt.compare(
        masterPassword,
        passwordHash
    );

}

// ==========================================================
// Export
// ==========================================================

module.exports = {

    createUser,

    findUserByUsername,

    verifyMasterPassword

};