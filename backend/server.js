// ==========================================================
// Secure Password Manager - Version 30.1
// ----------------------------------------------------------
// Backend / REST API + MongoDB
//
// V30 features retained:
// - User registration
// - Master password hashing
// - User login
// - JWT authentication
// - Protected password APIs
// - User-specific password ownership
// - AES encrypted vault passwords
// - Decryption only for authenticated owner
// - GET / POST / PUT / DELETE password operations
// - GET single password by ID
// - Authentication / authorization error handling
//
// V30.1:
// - Centralized input validation
// - Username validation
// - Master password validation
// - Vault password validation
// - MongoDB ObjectId validation
// ==========================================================


// ==========================================================
// Imports
// ==========================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const {
    connectDatabase,
    getDatabase
} = require("./db");

const {
    createUser,
    findUserByUsername,
    verifyMasterPassword
} = require("./userModel");

const {
    encryptPassword,
    decryptPassword
} = require("./vaultCrypto");

const {
    validateUsername,
    validateMasterPassword,
    validateVaultPassword,
    validateObjectId
} = require("./validation");


// ==========================================================
// Express App
// ==========================================================

const app = express();


// ==========================================================
// Configuration
// ==========================================================

const PORT = 3000;

const JWT_SECRET =
    process.env.JWT_SECRET;

const JWT_EXPIRES_IN =
    process.env.JWT_EXPIRES_IN || "1h";


// ==========================================================
// Validate JWT Configuration
// ==========================================================

if (!JWT_SECRET) {

    console.error(
        "JWT_SECRET is not configured in .env"
    );

    process.exit(1);
}


// ==========================================================
// Middleware
// ==========================================================

app.use(cors());

app.use(express.json());


// ==========================================================
// Database Configuration
// ==========================================================

const COLLECTION_NAME =
    "passwords";


// ==========================================================
// Authentication Middleware
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
        // Check Bearer format
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
        // Validate userId from JWT
        // --------------------------------------------------

        if (
            !validateObjectId(decoded.userId)
        ) {

            return res.status(401).json({

                error:
                    "Invalid or expired authentication token."

            });

        }


        // --------------------------------------------------
        // Store authenticated user
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
// ROOT ROUTE
// ==========================================================

app.get(
    "/",
    function (req, res) {

        res.json({

            message:
                "Secure Password Manager API is running.",

            version:
                "V30.1"

        });

    }
);


// ==========================================================
// REGISTER USER
// ==========================================================

app.post(
    "/api/auth/register",
    async function (req, res) {

        try {

            const username =
                req.body.username;

            const masterPassword =
                req.body.masterPassword;


            // --------------------------------------------------
            // Validate username
            // --------------------------------------------------

            const usernameError =
                validateUsername(username);

            if (usernameError) {

                return res.status(400).json({

                    error:
                        usernameError

                });

            }


            // --------------------------------------------------
            // Validate master password
            // --------------------------------------------------

            const masterPasswordError =
                validateMasterPassword(
                    masterPassword
                );

            if (masterPasswordError) {

                return res.status(400).json({

                    error:
                        masterPasswordError

                });

            }


            const cleanUsername =
                username.trim();


            // --------------------------------------------------
            // Check existing user
            // --------------------------------------------------

            const existingUser =
                await findUserByUsername(
                    cleanUsername
                );

            if (existingUser) {

                return res.status(409).json({

                    error:
                        "Username already exists."

                });

            }


            // --------------------------------------------------
            // Create user
            // --------------------------------------------------

            const user =
                await createUser(
                    cleanUsername,
                    masterPassword
                );


            // --------------------------------------------------
            // Safe response
            // --------------------------------------------------

            return res.status(201).json({

                message:
                    "User registered successfully.",

                user:
                    user

            });

        } catch (error) {

            console.error(
                "POST /api/auth/register error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to register user."

            });

        }

    }
);


// ==========================================================
// LOGIN USER
// ==========================================================

app.post(
    "/api/auth/login",
    async function (req, res) {

        try {

            const username =
                req.body.username;

            const masterPassword =
                req.body.masterPassword;


            // --------------------------------------------------
            // Validate username
            // --------------------------------------------------

            const usernameError =
                validateUsername(username);

            if (usernameError) {

                return res.status(400).json({

                    error:
                        usernameError

                });

            }


            // --------------------------------------------------
            // Validate master password
            // --------------------------------------------------

            const masterPasswordError =
                validateMasterPassword(
                    masterPassword
                );

            if (masterPasswordError) {

                return res.status(400).json({

                    error:
                        masterPasswordError

                });

            }


            const cleanUsername =
                username.trim();


            // --------------------------------------------------
            // Find user
            // --------------------------------------------------

            const user =
                await findUserByUsername(
                    cleanUsername
                );


            // --------------------------------------------------
            // Prevent username enumeration
            // --------------------------------------------------

            if (!user) {

                return res.status(401).json({

                    error:
                        "Invalid username or master password."

                });

            }


            // --------------------------------------------------
            // Verify master password
            // --------------------------------------------------

            const passwordCorrect =
                await verifyMasterPassword(
                    masterPassword,
                    user.passwordHash
                );

            if (!passwordCorrect) {

                return res.status(401).json({

                    error:
                        "Invalid username or master password."

                });

            }


            // --------------------------------------------------
            // Create JWT
            // --------------------------------------------------

            const token =
                jwt.sign(

                    {
                        userId:
                            user._id.toString(),

                        username:
                            user.username
                    },

                    JWT_SECRET,

                    {
                        expiresIn:
                            JWT_EXPIRES_IN
                    }

                );


            // --------------------------------------------------
            // Login response
            // --------------------------------------------------

            return res.json({

                message:
                    "Login successful.",

                token:
                    token,

                user: {

                    id:
                        user._id.toString(),

                    username:
                        user.username

                }

            });

        } catch (error) {

            console.error(
                "POST /api/auth/login error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to login."

            });

        }

    }
);


// ==========================================================
// GET ALL PASSWORDS
// ==========================================================

app.get(
    "/api/passwords",
    authenticateToken,
    async function (req, res) {

        try {

            const database =
                getDatabase();

            const passwords =
                await database
                    .collection(COLLECTION_NAME)
                    .find({

                        userId:
                            req.user.userId

                    })
                    .sort({

                        createdAt:
                            -1

                    })
                    .toArray();


            // --------------------------------------------------
            // Decrypt passwords
            // --------------------------------------------------

            const decryptedPasswords =
                passwords.map(
                    function (record) {

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
                );


            return res.json(
                decryptedPasswords
            );

        } catch (error) {

            console.error(
                "GET /api/passwords error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to fetch passwords."

            });

        }

    }
);


// ==========================================================
// GET SINGLE PASSWORD
// ==========================================================

app.get(
    "/api/passwords/:id",
    authenticateToken,
    async function (req, res) {

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


            const database =
                getDatabase();


            // --------------------------------------------------
            // Find password belonging to user
            // --------------------------------------------------

            const record =
                await database
                    .collection(COLLECTION_NAME)
                    .findOne({

                        _id:
                            new ObjectId(id),

                        userId:
                            req.user.userId

                    });


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
                decryptPassword(

                    record.encryptedPassword,

                    record.iv,

                    record.authTag

                );


            return res.json({

                _id:
                    record._id,

                userId:
                    record.userId,

                password:
                    decryptedPassword,

                createdAt:
                    record.createdAt,

                updatedAt:
                    record.updatedAt

            });

        } catch (error) {

            console.error(
                "GET /api/passwords/:id error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to fetch password."

            });

        }

    }
);


// ==========================================================
// POST - ADD PASSWORD
// ==========================================================

app.post(
    "/api/passwords",
    authenticateToken,
    async function (req, res) {

        try {

            const password =
                req.body.password;


            // --------------------------------------------------
            // Validate vault password
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


            const database =
                getDatabase();

            const collection =
                database.collection(
                    COLLECTION_NAME
                );


            // --------------------------------------------------
            // Check duplicate within user's vault
            // --------------------------------------------------

            const existingPasswords =
                await collection
                    .find({

                        userId:
                            req.user.userId

                    })
                    .toArray();


            for (
                const record
                of existingPasswords
            ) {

                const decrypted =
                    decryptPassword(

                        record.encryptedPassword,

                        record.iv,

                        record.authTag

                    );


                if (
                    decrypted ===
                    cleanPassword
                ) {

                    return res.status(409).json({

                        error:
                            "This password is already stored."

                    });

                }

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
            // Store encrypted password
            // --------------------------------------------------

            const result =
                await collection.insertOne(
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
                "POST /api/passwords error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to add password."

            });

        }

    }
);


// ==========================================================
// PUT - UPDATE PASSWORD
// ==========================================================

app.put(
    "/api/passwords/:id",
    authenticateToken,
    async function (req, res) {

        try {

            const id =
                req.params.id;

            const newPassword =
                req.body.password;


            // --------------------------------------------------
            // Validate vault password
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

            const objectId =
                new ObjectId(id);

            const database =
                getDatabase();

            const collection =
                database.collection(
                    COLLECTION_NAME
                );


            // --------------------------------------------------
            // Check ownership
            // --------------------------------------------------

            const existingRecord =
                await collection.findOne({

                    _id:
                        objectId,

                    userId:
                        req.user.userId

                });


            if (!existingRecord) {

                return res.status(404).json({

                    error:
                        "Password not found."

                });

            }


            // --------------------------------------------------
            // Check duplicate within user's vault
            // --------------------------------------------------

            const otherPasswords =
                await collection
                    .find({

                        userId:
                            req.user.userId,

                        _id: {

                            $ne:
                                objectId

                        }

                    })
                    .toArray();


            for (
                const record
                of otherPasswords
            ) {

                const decrypted =
                    decryptPassword(

                        record.encryptedPassword,

                        record.iv,

                        record.authTag

                    );


                if (
                    decrypted ===
                    cleanPassword
                ) {

                    return res.status(409).json({

                        error:
                            "This password is already stored."

                    });

                }

            }


            // --------------------------------------------------
            // Encrypt new password
            // --------------------------------------------------

            const encrypted =
                encryptPassword(
                    cleanPassword
                );


            // --------------------------------------------------
            // Update password
            // --------------------------------------------------

            const result =
                await collection.findOneAndUpdate(

                    {

                        _id:
                            objectId,

                        userId:
                            req.user.userId

                    },

                    {

                        $set: {

                            encryptedPassword:
                                encrypted.encryptedPassword,

                            iv:
                                encrypted.iv,

                            authTag:
                                encrypted.authTag,

                            updatedAt:
                                new Date()

                        }

                    },

                    {

                        returnDocument:
                            "after"

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
                "PUT /api/passwords error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to update password."

            });

        }

    }
);


// ==========================================================
// DELETE - DELETE PASSWORD
// ==========================================================

app.delete(
    "/api/passwords/:id",
    authenticateToken,
    async function (req, res) {

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


            const database =
                getDatabase();

            const collection =
                database.collection(
                    COLLECTION_NAME
                );


            // --------------------------------------------------
            // Delete only user's own password
            // --------------------------------------------------

            const result =
                await collection.deleteOne({

                    _id:
                        new ObjectId(id),

                    userId:
                        req.user.userId

                });


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
                "DELETE /api/passwords error:",
                error
            );

            return res.status(500).json({

                error:
                    "Unable to delete password."

            });

        }

    }
);


// ==========================================================
// START SERVER
// ==========================================================

async function startServer() {

    try {

        await connectDatabase();


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
// START APPLICATION
// ==========================================================

startServer();