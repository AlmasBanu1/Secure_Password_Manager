// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// MongoDB Database Connection
// ----------------------------------------------------------
// Responsibilities:
// - Connect to MongoDB
// - Provide database access
// - Provide controlled password-vault reset
// ==========================================================


// ==========================================================
// MongoDB
// ==========================================================

const {
    MongoClient
} = require("mongodb");


// ==========================================================
// MongoDB Configuration
// ==========================================================

const MONGO_URI =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017";

const DATABASE_NAME =
    "secure_password_manager";

const PASSWORD_COLLECTION =
    "passwords";


// ==========================================================
// MongoDB Client
// ==========================================================

const client =
    new MongoClient(MONGO_URI);


// ==========================================================
// Database Connection State
// ==========================================================

let database = null;


// ==========================================================
// Connect to MongoDB
// ==========================================================

async function connectDatabase() {

    // ------------------------------------------------------
    // Avoid reconnecting if already connected
    // ------------------------------------------------------

    if (database) {

        return database;

    }


    // ------------------------------------------------------
    // Connect
    // ------------------------------------------------------

    await client.connect();


    // ------------------------------------------------------
    // Select database
    // ------------------------------------------------------

    database =
        client.db(
            DATABASE_NAME
        );


    console.log(
        "MongoDB connected successfully."
    );


    return database;

}


// ==========================================================
// Get Database
// ==========================================================

function getDatabase() {

    if (!database) {

        throw new Error(
            "Database is not connected."
        );

    }


    return database;

}


// ==========================================================
// Clear Password Collection
// ----------------------------------------------------------
// IMPORTANT:
// This deletes ONLY records from the "passwords"
// collection.
//
// It does NOT delete:
// - users
// - authentication data
// - JWT configuration
// - any other collection
// ==========================================================

async function clearPasswordCollection() {

    const database =
        getDatabase();


    const result =
        await database
            .collection(
                PASSWORD_COLLECTION
            )
            .deleteMany({});


    console.log(
        `Password vault reset: ${result.deletedCount} password record(s) deleted.`
    );


    return result;

}


// ==========================================================
// Export
// ==========================================================

module.exports = {

    connectDatabase,

    getDatabase,

    clearPasswordCollection

};