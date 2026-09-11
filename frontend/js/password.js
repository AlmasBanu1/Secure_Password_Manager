// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// Password Module
// ----------------------------------------------------------
// Responsibilities:
// - Password generation
// - Password validation
// - Password strength detection
// - Password search helpers
// ==========================================================


// ==========================================================
// Generate Password
// ==========================================================

function generatePassword(length = 16) {

    const uppercase =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercase =
        "abcdefghijklmnopqrstuvwxyz";

    const numbers =
        "0123456789";

    const symbols =
        "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        symbols;


    let password = "";


    // Ensure password contains all important character types

    password +=
        uppercase[
            Math.floor(
                Math.random() *
                uppercase.length
            )
        ];

    password +=
        lowercase[
            Math.floor(
                Math.random() *
                lowercase.length
            )
        ];

    password +=
        numbers[
            Math.floor(
                Math.random() *
                numbers.length
            )
        ];

    password +=
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    // Fill remaining characters

    while (
        password.length < length
    ) {

        password +=
            allCharacters[
                Math.floor(
                    Math.random() *
                    allCharacters.length
                )
            ];

    }


    // Shuffle password characters

    return password
        .split("")
        .sort(
            () => Math.random() - 0.5
        )
        .join("");

}


// ==========================================================
// Validate Password
// ==========================================================

function validatePassword(password) {

    if (
        typeof password !==
        "string"
    ) {

        return {

            valid: false,

            message:
                "Password must be a string."

        };

    }


    if (
        password.trim() === ""
    ) {

        return {

            valid: false,

            message:
                "Password is required."

        };

    }


    return {

        valid: true,

        message: ""

    };

}


// ==========================================================
// Password Strength
// ==========================================================

function getPasswordStrength(password) {

    if (
        typeof password !==
        "string" ||
        password.length === 0
    ) {

        return "Weak";

    }


    let score = 0;


    // Length

    if (
        password.length >= 8
    ) {

        score++;

    }

    if (
        password.length >= 12
    ) {

        score++;

    }


    // Lowercase

    if (
        /[a-z]/.test(password)
    ) {

        score++;

    }


    // Uppercase

    if (
        /[A-Z]/.test(password)
    ) {

        score++;

    }


    // Number

    if (
        /[0-9]/.test(password)
    ) {

        score++;

    }


    // Symbol

    if (
        /[^A-Za-z0-9]/.test(password)
    ) {

        score++;

    }


    if (score >= 5) {

        return "Strong";

    }


    if (score >= 3) {

        return "Medium";

    }


    return "Weak";

}


// ==========================================================
// Search Passwords
// ==========================================================

function searchPasswords(
    passwords,
    searchTerm
) {

    if (
        !Array.isArray(passwords)
    ) {

        return [];

    }


    const term =
        String(
            searchTerm || ""
        )
            .toLowerCase()
            .trim();


    if (term === "") {

        return passwords;

    }


    return passwords.filter(

        function (record) {

            return String(
                record.password || ""
            )
                .toLowerCase()
                .includes(term);

        }

    );

}


// ==========================================================
// Check Duplicate Password
// ==========================================================

function isDuplicatePassword(
    passwords,
    password,
    excludeId = null
) {

    if (
        !Array.isArray(passwords)
    ) {

        return false;

    }


    return passwords.some(

        function (record) {

            if (
                excludeId &&
                String(record._id) ===
                String(excludeId)
            ) {

                return false;

            }


            return (
                record.password ===
                password
            );

        }

    );

}


// ==========================================================
// Export
// ==========================================================

export {

    generatePassword,

    validatePassword,

    getPasswordStrength,

    searchPasswords,

    isDuplicatePassword

};