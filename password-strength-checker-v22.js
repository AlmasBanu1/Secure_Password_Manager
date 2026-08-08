// ==========================================================
// Secure Password Manager - Version 22
// ----------------------------------------------------------
// This version introduces a Command Line Interface (CLI)
// for interactive password management.
//
// Features:
// - Generate multiple secure passwords
// - Search passwords using built-in methods
// - Display passwords using forEach()
// - Update passwords using findIndex()
// - Delete passwords using findIndex() and splice()
// - Interactive command-line menu
// - User input using Node.js readline
// - Menu-driven program flow
// ==========================================================

// Node.js Readline Setup

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper Functions

// Pick One Random Character

function pickOneRandomCharacter(characterSet) {

    let randomIndex =
        Math.floor(Math.random() * characterSet.length);

    return characterSet[randomIndex];

}

// Shuffle Password Characters

function shuffleArray(array) {

    for (let i = 0; i < array.length; i++) {

        let randomIndex1 =
            Math.floor(Math.random() * array.length);

        let randomIndex2 =
            Math.floor(Math.random() * array.length);

        let temp = array[randomIndex1];

        array[randomIndex1] = array[randomIndex2];

        array[randomIndex2] = temp;

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
        pickOneRandomCharacter(uppercaseLetters)
    );

    passwordCharacters.push(
        pickOneRandomCharacter(lowercaseLetters)
    );

    passwordCharacters.push(
        pickOneRandomCharacter(numbers)
    );

    passwordCharacters.push(
        pickOneRandomCharacter(specialCharacters)
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

    for (let i = 0; i < remainingCharacters; i++) {

        let randomGroupIndex =
            Math.floor(
                Math.random() * allCharacterGroups.length
            );

        let selectedGroup =
            allCharacterGroups[randomGroupIndex];

        passwordCharacters.push(
            pickOneRandomCharacter(selectedGroup)
        );

    }

    // Shuffle Password Characters

    shuffleArray(passwordCharacters);

    // Build and Return Final Password

    return buildPassword(passwordCharacters);

}

// Generate Multiple Passwords

function generatePasswords(count) {

    // Store Generated Passwords

    let passwords = [];

    // Generate Required Number of Passwords

    for (let i = 0; i < count; i++) {

        passwords.push(
            generatePassword()
        );

    }

    // Return Generated Password Array

    return passwords;

}

// Password Search Operations

// Search Password Using Built-in includes()

function searchPassword(passwords, target) {

    return passwords.includes(target);

}

// Find Password Using Built-in find()

function findPassword(passwords, target) {

    return passwords.find(function(password) {

        return password === target;

    });

}

// Find Password Index Using Built-in findIndex()

function findPasswordIndex(passwords, target) {

    return passwords.findIndex(function(password) {

        return password === target;

    });

}

// Password Display & Modification Operations

// Display Passwords Using Built-in forEach()

function displayPasswords(passwords) {

    console.log("\nStored Passwords:");

    passwords.forEach(function(password, index) {

        console.log(
            (index + 1) + ". " + password
        );

    });

}

// Update Password Using findIndex()

function updatePassword(passwords, target, newPassword) {

    let index =
        findPasswordIndex(passwords, target);

    if (index !== -1) {

        passwords[index] = newPassword;

        return true;

    }

    return false;

}

// Delete Password Using findIndex() and splice()

function deletePassword(passwords, target) {

    let index =
        findPasswordIndex(passwords, target);

    if (index !== -1) {

        passwords.splice(index, 1);

        return true;

    }

    return false;

}

// Command Line Interface (CLI)

// Display CLI Menu

function showMenu() {

    console.log("\n================================");
    console.log("     SECURE PASSWORD MANAGER");
    console.log("================================");

    console.log("1. Generate Password");
    console.log("2. Display Passwords");
    console.log("3. Search Password");
    console.log("4. Update Password");
    console.log("5. Delete Password");
    console.log("6. Exit");

}

// Store Initial Generated Passwords

let storedPasswords =
    generatePasswords(5);

// Start CLI

function startCLI() {

    // Display Menu

    showMenu();

    // Get User Choice

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