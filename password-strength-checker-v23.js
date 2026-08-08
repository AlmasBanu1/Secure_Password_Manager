// ==========================================================
// Secure Password Manager - Version 23
// ----------------------------------------------------------
// This version introduces persistent password storage using
// a JSON file.
//
// Features:
// - Load passwords from a JSON file
// - Save passwords to a JSON file
// - Generate passwords
// - Display passwords
// - Search passwords
// - Update passwords
// - Delete passwords
// - Persist changes between program executions
// - Handle missing, empty, and invalid JSON files
// ==========================================================

// Node.js Modules

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// File Storage

// Load Passwords from JSON File

let storedPasswords = [];

if (fs.existsSync("passwords.json")) {

    let data = fs.readFileSync(
        "passwords.json",
        "utf8"
    );

    if (data.trim() !== "") {

        try {

            storedPasswords = JSON.parse(data);

        } catch (error) {

            console.log(
                "Invalid JSON data. Starting with an empty password list."
            );

            storedPasswords = [];

        }

    }

}

// Save Passwords to JSON File

function savePasswords(passwords) {

    let data =
        JSON.stringify(passwords, null, 4);

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
            Math.random() * characterSet.length
        );

    return characterSet[randomIndex];

}

// Shuffle Password Characters

function shuffleArray(array) {

    for (let i = 0; i < array.length; i++) {

        let randomIndex1 =
            Math.floor(
                Math.random() * array.length
            );

        let randomIndex2 =
            Math.floor(
                Math.random() * array.length
            );

        let temp = array[randomIndex1];

        array[randomIndex1] =
            array[randomIndex2];

        array[randomIndex2] =
            temp;

    }

}

// Build Final Password

function buildPassword(array) {

    let generatedPassword = "";

    for (let i = 0; i < array.length; i++) {

        generatedPassword += array[i];

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

    // Build and Return Final Password

    return buildPassword(
        passwordCharacters
    );

}

// Generate Multiple Passwords

function generatePasswords(count) {

    let passwords = [];

    for (let i = 0; i < count; i++) {

        passwords.push(
            generatePassword()
        );

    }

    return passwords;

}

// Password Search Operations

// Search Password Using includes()

function searchPassword(passwords, target) {

    return passwords.includes(target);

}

// Find Password Using find()

function findPassword(passwords, target) {

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

    console.log("\nStored Passwords:");

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

// Delete Password Using findIndex() and splice()

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

// Start CLI

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