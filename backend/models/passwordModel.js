// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Password Model
// ----------------------------------------------------------
// Responsibilities:
// - Access passwords collection
// - Find all passwords for a user
// - Find a single password for a user
// - Find existing passwords for duplicate checks
// - Insert password records
// - Update password records
// - Delete password records
// ==========================================================

const { ObjectId } = require("mongodb");

const {
    getDatabase
} = require("../config/db");

const COLLECTION_NAME = "passwords";

// ==========================================================
// Get Password Collection
// ==========================================================

function getPasswordCollection() {
    const database = getDatabase();

    return database.collection(
        COLLECTION_NAME
    );
}

// ==========================================================
// Find All Passwords For User
// ==========================================================

async function findAllByUserId(userId) {
    const collection =
        getPasswordCollection();

    return await collection
        .find({
            userId: userId
        })
        .sort({
            createdAt: -1
        })
        .toArray();
}

// ==========================================================
// Find Single Password For User
// ==========================================================

async function findByIdAndUserId(
    passwordId,
    userId
) {
    const collection =
        getPasswordCollection();

    return await collection.findOne({
        _id: new ObjectId(passwordId),
        userId: userId
    });
}

// ==========================================================
// Find All Other Passwords For User
// ----------------------------------------------------------
// Used when checking whether a password already exists.
// ==========================================================

async function findOthersByUserId(
    passwordId,
    userId
) {
    const collection =
        getPasswordCollection();

    return await collection
        .find({
            userId: userId,
            _id: {
                $ne: new ObjectId(passwordId)
            }
        })
        .toArray();
}

// ==========================================================
// Insert Password
// ==========================================================

async function insertPassword(
    passwordDocument
) {
    const collection =
        getPasswordCollection();

    return await collection.insertOne(
        passwordDocument
    );
}

// ==========================================================
// Update Password
// ==========================================================

async function updatePassword(
    passwordId,
    userId,
    updateData
) {
    const collection =
        getPasswordCollection();

    const result =
        await collection.findOneAndUpdate(
            {
                _id: new ObjectId(passwordId),
                userId: userId
            },
            {
                $set: updateData
            },
            {
                returnDocument: "after"
            }
        );

    return result;
}

// ==========================================================
// Delete Password
// ==========================================================

async function deletePassword(
    passwordId,
    userId
) {
    const collection =
        getPasswordCollection();

    return await collection.deleteOne({
        _id: new ObjectId(passwordId),
        userId: userId
    });
}

// ==========================================================
// Export
// ==========================================================

module.exports = {
    findAllByUserId,
    findByIdAndUserId,
    findOthersByUserId,
    insertPassword,
    updatePassword,
    deletePassword
};