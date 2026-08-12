// ==========================================================
// Secure Password Manager - Version 27
// ----------------------------------------------------------
// Backend / REST API
// ----------------------------------------------------------
// Features:
// - Express server
// - JSON request handling
// - GET all passwords
// - POST a password
// - PUT/update a password
// - DELETE a password
// - Basic input validation
// - Basic API error responses
// - Temporary in-memory storage
//
// Note:
// V27 uses temporary in-memory storage.
// V28 will introduce persistent database storage.
// V25 encryption will be integrated into the backend
// as part of the security layer.
// ==========================================================


// ==========================================================
// Imports
// ==========================================================

const express = require("express");
const cors = require("cors");

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

// Allow Express to read JSON request bodies

app.use(cors());
app.use(express.json());


// ==========================================================
// Temporary Password Storage
// ----------------------------------------------------------
// V27: Temporary in-memory storage
// V28: Will be replaced with database storage
// ==========================================================

let storedPasswords = [];

let nextId = 1;


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

app.get("/api/passwords", function (req, res) {

    res.json(storedPasswords);

});


// ==========================================================
// POST - Add Password
// ==========================================================

app.post("/api/passwords", function (req, res) {

    const password = req.body.password;


    // Validate request

    if (
        typeof password !== "string" ||
        password.trim() === ""
    ) {

        return res.status(400).json({
            error: "Password is required."
        });

    }


    // Create password record

    const newPassword = {

        id: nextId,

        password: password.trim()

    };


    // Increase ID for next password

    nextId++;


    // Store password

    storedPasswords.push(newPassword);


    // Send response

    res.status(201).json({

        message: "Password added successfully.",

        password: newPassword

    });

});


// ==========================================================
// PUT - Update Password
// ==========================================================

app.put("/api/passwords/:id", function (req, res) {

    const id = Number(req.params.id);

    const newPassword = req.body.password;


    // Validate password

    if (
        typeof newPassword !== "string" ||
        newPassword.trim() === ""
    ) {

        return res.status(400).json({
            error: "Password is required."
        });

    }


    // Find password

    const passwordIndex =
        storedPasswords.findIndex(
            function (item) {

                return item.id === id;

            }
        );


    // Password not found

    if (passwordIndex === -1) {

        return res.status(404).json({
            error: "Password not found."
        });

    }


    // Update password

    storedPasswords[passwordIndex].password =
        newPassword.trim();


    // Send response

    res.json({

        message: "Password updated successfully.",

        password:
            storedPasswords[passwordIndex]

    });

});


// ==========================================================
// DELETE - Delete Password
// ==========================================================

app.delete("/api/passwords/:id", function (req, res) {

    const id = Number(req.params.id);


    // Find password

    const passwordIndex =
        storedPasswords.findIndex(
            function (item) {

                return item.id === id;

            }
        );


    // Password not found

    if (passwordIndex === -1) {

        return res.status(404).json({
            error: "Password not found."
        });

    }


    // Delete password

    storedPasswords.splice(
        passwordIndex,
        1
    );


    // Send response

    res.json({

        message: "Password deleted successfully."

    });

});


// ==========================================================
// Start Server
// ==========================================================

app.listen(PORT, function () {

    console.log(
        `Secure Password Manager API running on http://localhost:${PORT}`
    );

});