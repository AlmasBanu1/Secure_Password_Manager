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
// Imports
// ==========================================================

const path =
    require("path");


// ==========================================================
// Environment Configuration
// ==========================================================
//
// .env is stored inside the backend/ folder.
//
// server.js is also inside backend/.
//
// Therefore we explicitly load:
// backend/.env
//
// This allows the application to be started from the
// project root using:
//
// npm start
//
// ==========================================================

require("dotenv").config({
    path: path.join(
        __dirname,
        ".env"
    )
});


// ==========================================================
// Express and Middleware Imports
// ==========================================================

const express =
    require("express");

const cors =
    require("cors");


// ==========================================================
// Application Imports
// ==========================================================

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

const NODE_ENV =
    process.env.NODE_ENV || "development";


// ==========================================================
// Middleware
// ==========================================================


// ----------------------------------------------------------
// CORS
// ----------------------------------------------------------
//
// Allow requests only from the application's known origins.
//
// Local development:
// http://localhost:3000
//
// Production:
// https://secure-password-manager-080x.onrender.com
//
// ==========================================================

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://secure-password-manager-080x.onrender.com"
        ]
    })
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
//     │   ├── password.html
//     │   └── vault.html
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

            "0.0.0.0",

            function () {

                console.log(
                    `Secure Password Manager server running on port ${PORT}`
                );

                console.log(
                    `Environment: ${NODE_ENV}`
                );

                console.log(
                    `Login/Register: /pages/index.html`
                );

                console.log(
                    `Dashboard: /pages/dashboard.html`
                );

                console.log(
                    `Password Page: /pages/password.html`
                );

                console.log(
                    `Vault: /pages/vault.html`
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