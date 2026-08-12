// ==========================================================
// Secure Password Manager - Version 29
// ----------------------------------------------------------
// Vault Encryption / Decryption
// ----------------------------------------------------------
// Uses AES-256-GCM to encrypt stored vault passwords.
// ==========================================================

require("dotenv").config();

const crypto = require("crypto");

// ==========================================================
// Configuration
// ==========================================================

const ALGORITHM = "aes-256-gcm";

const KEY_HEX =
    process.env.VAULT_ENCRYPTION_KEY;

// ==========================================================
// Validate Encryption Key
// ==========================================================

if (
    typeof KEY_HEX !== "string" ||
    !/^[0-9a-fA-F]{64}$/.test(KEY_HEX)
) {

    throw new Error(
        "VAULT_ENCRYPTION_KEY must be a 64-character hexadecimal key."
    );

}

const ENCRYPTION_KEY =
    Buffer.from(KEY_HEX, "hex");

// ==========================================================
// Encrypt Password
// ==========================================================

function encryptPassword(password) {

    const iv =
        crypto.randomBytes(12);

    const cipher =
        crypto.createCipheriv(
            ALGORITHM,
            ENCRYPTION_KEY,
            iv
        );

    let encrypted =
        cipher.update(
            password,
            "utf8",
            "hex"
        );

    encrypted +=
        cipher.final("hex");

    const authTag =
        cipher.getAuthTag();

    return {

        encryptedPassword:
            encrypted,

        iv:
            iv.toString("hex"),

        authTag:
            authTag.toString("hex")

    };

}

// ==========================================================
// Decrypt Password
// ==========================================================

function decryptPassword(
    encryptedPassword,
    iv,
    authTag
) {

    const decipher =
        crypto.createDecipheriv(
            ALGORITHM,
            ENCRYPTION_KEY,
            Buffer.from(iv, "hex")
        );

    decipher.setAuthTag(
        Buffer.from(authTag, "hex")
    );

    let decrypted =
        decipher.update(
            encryptedPassword,
            "hex",
            "utf8"
        );

    decrypted +=
        decipher.final("utf8");

    return decrypted;

}

// ==========================================================
// Export
// ==========================================================

module.exports = {

    encryptPassword,

    decryptPassword

};