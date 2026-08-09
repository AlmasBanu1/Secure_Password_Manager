// ==========================================================
// Secure Password Manager - Version 24
// ----------------------------------------------------------
// This version introduces password encryption.
//
// Features:
// - Generate passwords
// - Display passwords
// - Search passwords
// - Update passwords
// - Delete passwords
// - Save passwords to a JSON file
// - Encrypt passwords before saving
// - Decrypt passwords when loading
// - Generate a random IV for every encryption
// - Store IV with encrypted password
// - Handle missing, empty, and invalid JSON files
// ==========================================================

// Node.js Modules

require("dotenv").config();

const readline = require("readline");
const fs = require("fs");
const crypto = require("crypto");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Encryption Configuration

const algorithm = "aes-256-cbc";

const encryptionKey =
    crypto.scryptSync(
        process.env.ENCRYPTION_KEY,
        "salt",
        32
    );

// Encryption Functions

// Encrypt Password

function encryptPassword(password) {

    // Generate a random IV for every encryption

    const initializationVector =
        crypto.randomBytes(16);

    const cipher =
        crypto.createCipheriv(
            algorithm,
            encryptionKey,
            initializationVector
        );

    let encrypted =
        cipher.update(
            password,
            "utf8",
            "hex"
        );

    encrypted +=
        cipher.final("hex");

    // Store IV together with encrypted password

    return (
        initializationVector.toString("hex") +
        ":" +
        encrypted
    );

}

// Decrypt Password

function decryptPassword(encryptedPassword) {

    // Separate IV and encrypted password

    let parts =
        encryptedPassword.split(":");

    let initializationVector =
        Buffer.from(
            parts[0],
            "hex"
        );

    let encrypted =
        parts[1];

    const decipher =
        crypto.createDecipheriv(
            algorithm,
            encryptionKey,
            initializationVector
        );

    let decrypted =
        decipher.update(
            encrypted,
            "hex",
            "utf8"
        );

    decrypted +=
        decipher.final("utf8");

    return decrypted;

}

// File Storage

// Load Passwords from JSON File

let storedPasswords = [];

if (fs.existsSync("passwords.json")) {

    let data =
        fs.readFileSync(
            "passwords.json",
            "utf8"
        );

    if (data.trim() !== "") {

        try {

            let encryptedPasswords =
                JSON.parse(data);

            storedPasswords =
                encryptedPasswords.map(
                    function(password) {

                        return decryptPassword(
                            password
                        );

                    }
                );

        } catch (error) {

            console.log(
                "Invalid or encrypted data. Starting with an empty password list."
            );

            storedPasswords = [];

        }

    }

}

// Save Passwords to JSON File

function savePasswords(passwords) {

    let encryptedPasswords =
        passwords.map(
            function(password) {

                return encryptPassword(
                    password
                );

            }
        );

    let data =
        JSON.stringify(
            encryptedPasswords,
            null,
            4
        );

    fs.writeFileSync(
        "passwords.json",
        data
    );

}

// Helper Functions

// Pick One Random Character

function pickOneRandomCharacter(characterSet) {

    let randomIndex =
        Math.floor(
            Math.random() *
            characterSet.length
        );

    return characterSet[randomIndex];

}

// Shuffle Password Characters

function shuffleArray(array) {

    for (
        let i = 0;
        i < array.length;
        i++
    ) {

        let randomIndex1 =
            Math.floor(
                Math.random() *
                array.length
            );

        let randomIndex2 =
            Math.floor(
                Math.random() *
                array.length
            );

        let temp =
            array[randomIndex1];

        array[randomIndex1] =
            array[randomIndex2];

        array[randomIndex2] =
            temp;

    }

}

// Build Final Password

function buildPassword(array) {

    let generatedPassword = "";

    for (
        let i = 0;
        i < array.length;
        i++
    ) {

        generatedPassword +=
            array[i];

    }

    return generatedPassword;

}

// Password Generation

// Generate Single Password

function generatePassword() {

    // Password Configuration

    let passwordLength = 10;

    // Input Validation

    if (passwordLength < 4) {

        console.log(
            "Invalid Password Length! Password must contain at least 4 characters."
        );

        return;

    }

    // Character Groups

    let uppercaseLetters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let lowercaseLetters =
        "abcdefghijklmnopqrstuvwxyz";

    let numbers =
        "0123456789";

    let specialCharacters =
        "!@#$%^&*";

    // Password Character Storage

    let passwordCharacters = [];

    // Generate Mandatory Characters

    passwordCharacters.push(
        pickOneRandomCharacter(
            uppercaseLetters
        )
    );

    passwordCharacters.push(
        pickOneRandomCharacter(
            lowercaseLetters
        )
    );

    passwordCharacters.push(
        pickOneRandomCharacter(
            numbers
        )
    );

    passwordCharacters.push(
        pickOneRandomCharacter(
            specialCharacters
        )
    );

    // Store All Character Groups

    let allCharacterGroups = [

        uppercaseLetters,
        lowercaseLetters,
        numbers,
        specialCharacters

    ];

    // Generate Remaining Characters

    let remainingCharacters =
        passwordLength - 4;

    for (
        let i = 0;
        i < remainingCharacters;
        i++
    ) {

        let randomGroupIndex =
            Math.floor(
                Math.random() *
                allCharacterGroups.length
            );

        let selectedGroup =
            allCharacterGroups[
                randomGroupIndex
            ];

        passwordCharacters.push(
            pickOneRandomCharacter(
                selectedGroup
            )
        );

    }

    // Shuffle Password Characters

    shuffleArray(
        passwordCharacters
    );

    // Build Final Password

    return buildPassword(
        passwordCharacters
    );

}

// Generate Multiple Passwords

function generatePasswords(count) {

    let passwords = [];

    for (
        let i = 0;
        i < count;
        i++
    ) {

        passwords.push(
            generatePassword()
        );

    }

    return passwords;

}


// Password Search Operations

// Search Password Using includes()

function searchPassword(
    passwords,
    target
) {

    return passwords.includes(
        target
    );

}

// Find Password Using find()

function findPassword(
    passwords,
    target
) {

    return passwords.find(
        function(password) {

            return password === target;

        }
    );

}

// Find Password Index Using findIndex()

function findPasswordIndex(
    passwords,
    target
) {

    return passwords.findIndex(
        function(password) {

            return password === target;

        }
    );

}

// Password Display & Modification

// Display Passwords Using forEach()

function displayPasswords(passwords) {

    console.log(
        "\nStored Passwords:"
    );

    if (passwords.length === 0) {

        console.log(
            "No passwords stored."
        );

        return;

    }

    passwords.forEach(
        function(password, index) {

            console.log(
                (index + 1) +
                ". " +
                password
            );

        }
    );

}

// Update Password Using findIndex()

function updatePassword(
    passwords,
    target,
    newPassword
) {

    let index =
        findPasswordIndex(
            passwords,
            target
        );

    if (index !== -1) {

        passwords[index] =
            newPassword;

        return true;

    }

    return false;

}

// Delete Password Using splice()

function deletePassword(
    passwords,
    target
) {

    let index =
        findPasswordIndex(
            passwords,
            target
        );

    if (index !== -1) {

        passwords.splice(
            index,
            1
        );

        return true;

    }

    return false;

}

// Command Line Interface

// Display CLI Menu

function showMenu() {

    console.log(
        "\n================================"
    );

    console.log(
        "     SECURE PASSWORD MANAGER"
    );

    console.log(
        "================================"
    );

    console.log(
        "1. Generate Password"
    );

    console.log(
        "2. Display Passwords"
    );

    console.log(
        "3. Search Password"
    );

    console.log(
        "4. Update Password"
    );

    console.log(
        "5. Delete Password"
    );

    console.log(
        "6. Exit"
    );

}

// CLI Program Flow

function startCLI() {

    showMenu();

    rl.question(
        "\nEnter your choice: ",
        function(choice) {

            // Generate Password

            if (choice === "1") {

                let newPassword =
                    generatePassword();

                storedPasswords.push(
                    newPassword
                );

                savePasswords(
                    storedPasswords
                );

                console.log(
                    "\nNew Password Generated:",
                    newPassword
                );

                startCLI();

            }

            // Display Passwords

            else if (choice === "2") {

                displayPasswords(
                    storedPasswords
                );

                startCLI();

            }

            // Search Password

            else if (choice === "3") {

                rl.question(
                    "\nEnter password to search: ",
                    function(target) {

                        let found =
                            searchPassword(
                                storedPasswords,
                                target
                            );

                        if (found) {

                            console.log(
                                "Password Found."
                            );

                        } else {

                            console.log(
                                "Password Not Found."
                            );

                        }

                        startCLI();

                    }
                );

            }

            // Update Password

            else if (choice === "4") {

                rl.question(
                    "\nEnter password to update: ",
                    function(target) {

                        rl.question(
                            "Enter new password: ",
                            function(newPassword) {

                                let updated =
                                    updatePassword(
                                        storedPasswords,
                                        target,
                                        newPassword
                                    );

                                if (updated) {

                                    savePasswords(
                                        storedPasswords
                                    );

                                    console.log(
                                        "Password Updated Successfully."
                                    );

                                } else {

                                    console.log(
                                        "Password Not Found."
                                    );

                                }

                                startCLI();

                            }
                        );

                    }
                );

            }

            // Delete Password

            else if (choice === "5") {

                rl.question(
                    "\nEnter password to delete: ",
                    function(target) {

                        let deleted =
                            deletePassword(
                                storedPasswords,
                                target
                            );

                        if (deleted) {

                            savePasswords(
                                storedPasswords
                            );

                            console.log(
                                "Password Deleted Successfully."
                            );

                        } else {

                            console.log(
                                "Password Not Found."
                            );

                        }

                        startCLI();

                    }
                );

            }

            // Exit Program

            else if (choice === "6") {

                console.log(
                    "\nExiting Secure Password Manager."
                );

                rl.close();

            }

            // Invalid Choice

            else {

                console.log(
                    "\nInvalid Choice."
                );

                startCLI();

            }

        }
    );

}

// Start Application

startCLI();