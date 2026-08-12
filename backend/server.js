// ==========================================================
// Secure Password Manager - Version 28
// ----------------------------------------------------------
// Backend / REST API + MongoDB
// ==========================================================

// ==========================================================
// Imports
// ==========================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
    connectDatabase,
    getDatabase
} = require("./db");

// ==========================================================
// Express App
// ==========================================================

const app = express();

// ==========================================================
// Configuration
// ==========================================================

const PORT = 3000;

// ==========================================================
// Middleware
// ==========================================================

app.use(cors());
app.use(express.json());

// ==========================================================
// Database Collection
// ==========================================================

const COLLECTION_NAME = "passwords";

// ==========================================================
// Root Route
// ==========================================================

app.get("/", function (req, res) {

    res.json({
        message: "Secure Password Manager API is running."
    });

});

// ==========================================================
// GET - Get All Passwords
// ==========================================================

app.get("/api/passwords", async function (req, res) {

    try {

        const database = getDatabase();

        const passwords =
            await database
                .collection(COLLECTION_NAME)
                .find({})
                .toArray();

        res.json(passwords);

    } catch (error) {

        console.error(
            "GET /api/passwords error:",
            error
        );

        res.status(500).json({
            error: "Unable to fetch passwords."
        });

    }

});

// ==========================================================
// POST - Add Password
// ==========================================================

app.post("/api/passwords", async function (req, res) {

    try {

        const password = req.body.password;

        // Validate password

        if (
            typeof password !== "string" ||
            password.trim() === ""
        ) {

            return res.status(400).json({
                error: "Password is required."
            });

        }

        const database = getDatabase();

        const collection =
            database.collection(COLLECTION_NAME);

        // Check for duplicate password

        const existingPassword =
            await collection.findOne({
                password: password.trim()
            });

        if (existingPassword) {

            return res.status(409).json({
                error: "This password is already stored."
            });

        }

        // Create password record

        const newPassword = {
            password: password.trim(),
            createdAt: new Date()
        };

        // Store password

        const result =
            await collection.insertOne(
                newPassword
            );

        // Create frontend-friendly response

        const savedPassword = {
            id: result.insertedId.toString(),
            password: newPassword.password,
            createdAt: newPassword.createdAt
        };

        res.status(201).json({

            message: "Password added successfully.",

            password: savedPassword

        });

    } catch (error) {

        console.error(
            "POST /api/passwords error:",
            error
        );

        res.status(500).json({
            error: "Unable to add password."
        });

    }

});

// ==========================================================
// PUT - Update Password
// ==========================================================

app.put("/api/passwords/:id", async function (req, res) {

    try {

        const id = req.params.id;

        const newPassword =
            req.body.password;

        // Validate password

        if (
            typeof newPassword !== "string" ||
            newPassword.trim() === ""
        ) {

            return res.status(400).json({
                error: "Password is required."
            });

        }

        const database = getDatabase();

        const collection =
            database.collection(COLLECTION_NAME);

        // Import ObjectId

        const { ObjectId } =
            require("mongodb");

        // Validate ID

        if (!ObjectId.isValid(id)) {

            return res.status(400).json({
                error: "Invalid password ID."
            });

        }

        // Check duplicate password

        const duplicate =
            await collection.findOne({

                password: newPassword.trim(),

                _id: {
                    $ne: new ObjectId(id)
                }

            });

        if (duplicate) {

            return res.status(409).json({
                error: "This password is already stored."
            });

        }

        // Update password

        const result =
            await collection.findOneAndUpdate(

                {
                    _id: new ObjectId(id)
                },

                {
                    $set: {
                        password:
                            newPassword.trim(),
                        updatedAt:
                            new Date()
                    }
                },

                {
                    returnDocument: "after"
                }

            );

        // Password not found

        if (!result) {

            return res.status(404).json({
                error: "Password not found."
            });

        }

        const updatedPassword = {

            id: result._id.toString(),

            password:
                result.password,

            createdAt:
                result.createdAt,

            updatedAt:
                result.updatedAt

        };

        res.json({

            message:
                "Password updated successfully.",

            password:
                updatedPassword

        });

    } catch (error) {

        console.error(
            "PUT /api/passwords error:",
            error
        );

        res.status(500).json({
            error: "Unable to update password."
        });

    }

});

// ==========================================================
// DELETE - Delete Password
// ==========================================================

app.delete("/api/passwords/:id", async function (req, res) {

    try {

        const id = req.params.id;

        const { ObjectId } =
            require("mongodb");

        // Validate ID

        if (!ObjectId.isValid(id)) {

            return res.status(400).json({
                error: "Invalid password ID."
            });

        }

        const database = getDatabase();

        const collection =
            database.collection(COLLECTION_NAME);

        // Delete password

        const result =
            await collection.deleteOne({

                _id:
                    new ObjectId(id)

            });

        // Password not found

        if (result.deletedCount === 0) {

            return res.status(404).json({
                error: "Password not found."
            });

        }

        res.json({

            message:
                "Password deleted successfully."

        });

    } catch (error) {

        console.error(
            "DELETE /api/passwords error:",
            error
        );

        res.status(500).json({
            error: "Unable to delete password."
        });

    }

});

// ==========================================================
// Start Server
// ==========================================================

async function startServer() {

    try {

        // Connect to MongoDB

        await connectDatabase();

        // Start Express server

        app.listen(
            PORT,
            function () {

                console.log(
                    `Secure Password Manager API running on http://localhost:${PORT}`
                );

            }
        );

    } catch (error) {

        console.error(
            "Unable to start server:",
            error.message
        );

        process.exit(1);

    }

}

// ==========================================================
// Start Application
// ==========================================================

startServer();