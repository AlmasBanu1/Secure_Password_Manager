// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Authentication Middleware
// ----------------------------------------------------------
// Responsibilities:
// - Read JWT from Authorization header
// - Verify JWT
// - Validate authenticated user ID
// - Attach authenticated user to request
// ==========================================================


// ==========================================================
// JWT
// ==========================================================

const jwt = require("jsonwebtoken");


// ==========================================================
// Validation
// ==========================================================

const {
    validateObjectId
} = require("./validation");


// ==========================================================
// Configuration
// ==========================================================

const JWT_SECRET =
    process.env.JWT_SECRET;


// ==========================================================
// Authenticate Token
// ==========================================================

function authenticateToken(req, res, next) {

    try {

        const authHeader =
            req.headers.authorization;


        // --------------------------------------------------
        // Authorization header missing
        // --------------------------------------------------

        if (!authHeader) {

            return res.status(401).json({

                error:
                    "Authentication required."

            });

        }


        // --------------------------------------------------
        // Check Bearer token format
        // --------------------------------------------------

        const parts =
            authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer" ||
            !parts[1]
        ) {

            return res.status(401).json({

                error:
                    "Authentication required."

            });

        }


        const token =
            parts[1];


        // --------------------------------------------------
        // Verify JWT
        // --------------------------------------------------

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );


        // --------------------------------------------------
        // Validate user ID
        // --------------------------------------------------

        if (
            !validateObjectId(
                decoded.userId
            )
        ) {

            return res.status(401).json({

                error:
                    "Invalid or expired authentication token."

            });

        }


        // --------------------------------------------------
        // Attach authenticated user to request
        // --------------------------------------------------

        req.user =
            decoded;


        next();

    } catch (error) {

        console.error(
            "Authentication error:",
            error.message
        );


        return res.status(401).json({

            error:
                "Invalid or expired authentication token."

        });

    }

}


// ==========================================================
// Export
// ==========================================================

module.exports = {

    authenticateToken

};