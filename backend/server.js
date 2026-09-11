// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Main Server
// ----------------------------------------------------------
// Responsibilities:
// - Load environment variables
// - Configure Express
// - Configure middleware
// - Serve frontend files
// - Mount API routes
// - Start MongoDB connection
// - Start HTTP server
//
// Business logic is handled by:
// - routes/
// - controllers/
// - middleware/
// - models/
// - utils/
// - config/
// ==========================================================


// ==========================================================
// Environment Configuration
// ==========================================================

require("dotenv").config();


// ==========================================================
// Imports
// ==========================================================

const express =
    require("express");

const cors =
    require("cors");

const path =
    require("path");


const {
    connectDatabase
} = require("./config/db");


const authRoutes =
    require("./routes/authRoutes");


const passwordRoutes =
    require("./routes/passwordRoutes");


// ==========================================================
// Express Application
// ==========================================================

const app =
    express();


// ==========================================================
// Configuration
// ==========================================================

const PORT =
    process.env.PORT || 3000;


// ==========================================================
// Middleware
// ==========================================================


// ----------------------------------------------------------
// CORS
// ----------------------------------------------------------

app.use(
    cors()
);


// ----------------------------------------------------------
// JSON Request Body
// ----------------------------------------------------------

app.use(
    express.json()
);


// ==========================================================
// FRONTEND STATIC FILES
// ==========================================================
//
// Project structure:
//
// Secure_Password_Manager/
// │
// ├── backend/
// │   ├── server.js
// │   ├── routes/
// │   ├── controllers/
// │   ├── middleware/
// │   ├── models/
// │   ├── utils/
// │   └── config/
// │
// └── frontend/
//     ├── pages/
//     │   ├── index.html
//     │   ├── dashboard.html
//     │   └── password.html
//     │
//     ├── css/
//     └── js/
//
// IMPORTANT:
// server.js is inside backend/.
// frontend/ is outside backend/.
//
// Therefore we go one level up using "..".
//
// ==========================================================

const FRONTEND_PATH =
    path.join(
        __dirname,
        "..",
        "frontend"
    );


app.use(
    express.static(
        FRONTEND_PATH
    )
);


// ==========================================================
// ROOT ROUTE
// ==========================================================
//
// Opening:
//
// http://localhost:3000/
//
// will load:
//
// frontend/pages/index.html
//
// ==========================================================

app.get(
    "/",
    function (req, res) {

        res.sendFile(
            path.join(
                FRONTEND_PATH,
                "pages",
                "index.html"
            )
        );

    }
);


// ==========================================================
// API ROUTES
// ==========================================================


// ----------------------------------------------------------
// Authentication
// ----------------------------------------------------------

app.use(
    "/api/auth",
    authRoutes
);


// ----------------------------------------------------------
// Password Vault
// ----------------------------------------------------------

app.use(
    "/api/passwords",
    passwordRoutes
);


// ==========================================================
// START SERVER
// ==========================================================

async function startServer() {

    try {

        // --------------------------------------------------
        // Connect to MongoDB
        // --------------------------------------------------

        await connectDatabase();


        // --------------------------------------------------
        // Start Express server
        // --------------------------------------------------

        app.listen(

            PORT,

            function () {

                console.log(
                    `Secure Password Manager server running on http://localhost:${PORT}`
                );

                console.log(
                    `Login/Register: http://localhost:${PORT}/pages/index.html`
                );

                console.log(
                    `Dashboard: http://localhost:${PORT}/pages/dashboard.html`
                );

                console.log(
                    `Password Page: http://localhost:${PORT}/pages/password.html`
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
// START APPLICATION
// ==========================================================

startServer();