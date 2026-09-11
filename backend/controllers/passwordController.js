// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Password Controller
// ----------------------------------------------------------
// Responsibilities:
// - Handle HTTP requests and responses
// - Validate password input
// - Handle password ownership
// - Encrypt / decrypt passwords
// - Check duplicate passwords
// - Communicate with password model
// ==========================================================


// ==========================================================
// Password Model
// ==========================================================

const {
    findAllByUserId,
    findByIdAndUserId,
    findOthersByUserId,
    insertPassword,
    updatePassword: updatePasswordRecord,
    deletePassword: deletePasswordRecord
} = require("../models/passwordModel");


// ==========================================================
// Encryption
// ==========================================================

const {
    encryptPassword,
    decryptPassword
} = require("../utils/vaultCrypto");


// ==========================================================
// Validation
// ==========================================================

const {
    validateVaultPassword,
    validateObjectId
} = require("../middleware/validation");


// ==========================================================
// DECRYPT PASSWORD RECORD
// ==========================================================

function decryptPasswordRecord(record) {

    return {
        _id:
            record._id,

        userId:
            record.userId,

        password:
            decryptPassword(
                record.encryptedPassword,
                record.iv,
                record.authTag
            ),

        createdAt:
            record.createdAt,

        updatedAt:
            record.updatedAt
    };

}


// ==========================================================
// CHECK DUPLICATE PASSWORD
// ==========================================================

async function isDuplicatePassword(
    password,
    records
) {

    for (
        const record
        of records
    ) {

        const decryptedPassword =
            decryptPassword(
                record.encryptedPassword,
                record.iv,
                record.authTag
            );

        if (
            decryptedPassword ===
            password
        ) {

            return true;

        }

    }

    return false;

}


// ==========================================================
// GET ALL PASSWORDS
// ==========================================================

async function getAllPasswords(req, res) {

    try {

        // --------------------------------------------------
        // Get passwords belonging to authenticated user
        // --------------------------------------------------

        const passwords =
            await findAllByUserId(
                req.user.userId
            );


        // --------------------------------------------------
        // Decrypt passwords
        // --------------------------------------------------

        const decryptedPasswords =
            passwords.map(
                decryptPasswordRecord
            );


        return res.json(
            decryptedPasswords
        );

    } catch (error) {

        console.error(
            "Get all passwords controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to fetch passwords."
        });

    }

}


// ==========================================================
// GET SINGLE PASSWORD
// ==========================================================

async function getSinglePassword(req, res) {

    try {

        const id =
            req.params.id;


        // --------------------------------------------------
        // Validate ObjectId
        // --------------------------------------------------

        if (!validateObjectId(id)) {

            return res.status(400).json({
                error:
                    "Invalid password ID."
            });

        }


        // --------------------------------------------------
        // Find password belonging to authenticated user
        // --------------------------------------------------

        const record =
            await findByIdAndUserId(
                id,
                req.user.userId
            );


        // --------------------------------------------------
        // Password not found
        // --------------------------------------------------

        if (!record) {

            return res.status(404).json({
                error:
                    "Password not found."
            });

        }


        // --------------------------------------------------
        // Decrypt password
        // --------------------------------------------------

        const decryptedPassword =
            decryptPasswordRecord(
                record
            );


        return res.json(
            decryptedPassword
        );

    } catch (error) {

        console.error(
            "Get single password controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to fetch password."
        });

    }

}


// ==========================================================
// ADD PASSWORD
// ==========================================================

async function addPassword(req, res) {

    try {

        const password =
            req.body.password;


        // --------------------------------------------------
        // Validate password
        // --------------------------------------------------

        const passwordError =
            validateVaultPassword(
                password
            );


        if (passwordError) {

            return res.status(400).json({
                error:
                    passwordError
            });

        }


        const cleanPassword =
            password.trim();


        // --------------------------------------------------
        // Get existing passwords for duplicate checking
        // --------------------------------------------------

        const existingPasswords =
            await findAllByUserId(
                req.user.userId
            );


        // --------------------------------------------------
        // Check duplicate within user's vault
        // --------------------------------------------------

        const duplicate =
            await isDuplicatePassword(
                cleanPassword,
                existingPasswords
            );


        if (duplicate) {

            return res.status(409).json({
                error:
                    "This password is already stored."
            });

        }


        // --------------------------------------------------
        // Encrypt password
        // --------------------------------------------------

        const encrypted =
            encryptPassword(
                cleanPassword
            );


        // --------------------------------------------------
        // Create password document
        // --------------------------------------------------

        const newPassword = {

            userId:
                req.user.userId,

            encryptedPassword:
                encrypted.encryptedPassword,

            iv:
                encrypted.iv,

            authTag:
                encrypted.authTag,

            createdAt:
                new Date()

        };


        // --------------------------------------------------
        // Store password through model
        // --------------------------------------------------

        const result =
            await insertPassword(
                newPassword
            );


        // --------------------------------------------------
        // Response
        // --------------------------------------------------

        return res.status(201).json({

            message:
                "Password added successfully.",

            password: {

                id:
                    result.insertedId.toString(),

                password:
                    cleanPassword,

                createdAt:
                    newPassword.createdAt

            }

        });

    } catch (error) {

        console.error(
            "Add password controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to add password."
        });

    }

}


// ==========================================================
// UPDATE PASSWORD
// ==========================================================

async function updatePassword(req, res) {

    try {

        const id =
            req.params.id;

        const newPassword =
            req.body.password;


        // --------------------------------------------------
        // Validate password
        // --------------------------------------------------

        const passwordError =
            validateVaultPassword(
                newPassword
            );


        if (passwordError) {

            return res.status(400).json({
                error:
                    passwordError
            });

        }


        // --------------------------------------------------
        // Validate ObjectId
        // --------------------------------------------------

        if (!validateObjectId(id)) {

            return res.status(400).json({
                error:
                    "Invalid password ID."
            });

        }


        const cleanPassword =
            newPassword.trim();


        // --------------------------------------------------
        // Check ownership
        // --------------------------------------------------

        const existingRecord =
            await findByIdAndUserId(
                id,
                req.user.userId
            );


        if (!existingRecord) {

            return res.status(404).json({
                error:
                    "Password not found."
            });

        }


        // --------------------------------------------------
        // Get other passwords for duplicate checking
        // --------------------------------------------------

        const otherPasswords =
            await findOthersByUserId(
                id,
                req.user.userId
            );


        // --------------------------------------------------
        // Check duplicate within user's vault
        // --------------------------------------------------

        const duplicate =
            await isDuplicatePassword(
                cleanPassword,
                otherPasswords
            );


        if (duplicate) {

            return res.status(409).json({
                error:
                    "This password is already stored."
            });

        }


        // --------------------------------------------------
        // Encrypt new password
        // --------------------------------------------------

        const encrypted =
            encryptPassword(
                cleanPassword
            );


        // --------------------------------------------------
        // Update password through model
        // --------------------------------------------------

        const result =
            await updatePasswordRecord(
                id,
                req.user.userId,
                {

                    encryptedPassword:
                        encrypted.encryptedPassword,

                    iv:
                        encrypted.iv,

                    authTag:
                        encrypted.authTag,

                    updatedAt:
                        new Date()

                }
            );


        if (!result) {

            return res.status(404).json({
                error:
                    "Password not found."
            });

        }


        // --------------------------------------------------
        // Response
        // --------------------------------------------------

        return res.json({

            message:
                "Password updated successfully.",

            password: {

                id:
                    result._id.toString(),

                password:
                    cleanPassword,

                createdAt:
                    result.createdAt,

                updatedAt:
                    result.updatedAt

            }

        });

    } catch (error) {

        console.error(
            "Update password controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to update password."
        });

    }

}


// ==========================================================
// DELETE PASSWORD
// ==========================================================

async function deletePassword(req, res) {

    try {

        const id =
            req.params.id;


        // --------------------------------------------------
        // Validate ObjectId
        // --------------------------------------------------

        if (!validateObjectId(id)) {

            return res.status(400).json({
                error:
                    "Invalid password ID."
            });

        }


        // --------------------------------------------------
        // Delete only authenticated user's password
        // --------------------------------------------------

        const result =
            await deletePasswordRecord(
                id,
                req.user.userId
            );


        // --------------------------------------------------
        // Password not found
        // --------------------------------------------------

        if (
            result.deletedCount === 0
        ) {

            return res.status(404).json({
                error:
                    "Password not found."
            });

        }


        return res.json({

            message:
                "Password deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete password controller error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to delete password."
        });

    }

}


// ==========================================================
// Export
// ==========================================================

module.exports = {

    getAllPasswords,
    getSinglePassword,
    addPassword,
    updatePassword,
    deletePassword

};