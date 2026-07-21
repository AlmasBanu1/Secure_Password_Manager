// ==========================================================
// Secure Password Manager - Version 17
// ----------------------------------------------------------
// This version introduces a reusable display module.
//
// Features:
// - Generate secure passwords
// - Store multiple passwords
// - Search passwords using a reusable function
// - Display passwords using a reusable function
// ==========================================================

// Helper Function - Pick One Random Character

function pickOneRandomCharacter(characterSet) {

    let randomIndex = Math.floor(Math.random() * characterSet.length);

    return characterSet[randomIndex];

}

// Helper Function - Shuffle Array

function shuffleArray(array) {

    for (let i = 0; i < array.length; i++) {

        let randomIndex1 = Math.floor(Math.random() * array.length);

        let randomIndex2 = Math.floor(Math.random() * array.length);

        let temp = array[randomIndex1];

        array[randomIndex1] = array[randomIndex2];

        array[randomIndex2] = temp;

    }

}

// Helper Function - Build Password

function buildPassword(array) {

    let generatedPassword = "";

    for (let i = 0; i < array.length; i++) {

        generatedPassword += array[i];

    }

    return generatedPassword;

}

// Generate Password

function generatePassword() {

    let passwordLength = 10;

    if (passwordLength < 4) {

        console.log("Invalid Password Length!");

        return;

    }

    let remainingCharacters = passwordLength - 4;

    let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";

    let numbers = "0123456789";

    let specialCharacters = "!@#$%^&*";

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

    // Store Character Groups

    let allCharacterGroups = [

        uppercaseLetters,
        lowercaseLetters,
        numbers,
        specialCharacters

    ];

    // Generate Remaining Characters

    for (let i = 0; i < remainingCharacters; i++) {

        let randomGroupIndex =
            Math.floor(Math.random() * allCharacterGroups.length);

        let selectedGroup =
            allCharacterGroups[randomGroupIndex];

        passwordCharacters.push(
            pickOneRandomCharacter(selectedGroup)
        );

    }

    // Shuffle Password

    shuffleArray(passwordCharacters);

    // Build Final Password

    return buildPassword(passwordCharacters);

}

// Search Password

function searchPassword(passwords, target) {

    let found = false;

    for (let i = 0; i < passwords.length; i++) {

        if (passwords[i] === target) {

            found = true;

            break;

        }

    }

    return found;

}

// Display Passwords

function displayPasswords(passwords) {

    console.log("\nStored Passwords:");

    for (let i = 0; i < passwords.length; i++) {

        console.log(
            (i + 1) + ". " + passwords[i]
        );

    }

}

// Main Program
// Store Passwords

let storedPasswords = [];

// Generate Five Passwords

for (let i = 0; i < 5; i++) {

    storedPasswords.push(generatePassword());

}

// Display Password Information
// Display Last Generated Password

console.log(
    "Last Generated Password:",
    storedPasswords[storedPasswords.length - 1]
);

// Display All Stored Passwords

displayPasswords(storedPasswords);

// Display Total Passwords

console.log(
    "\nTotal Stored Passwords:",
    storedPasswords.length
);

// Search Password

let target = storedPasswords[2];

console.log("\nSearching For:", target);

let found = searchPassword(storedPasswords, target);

if (found) {

    console.log("Password Found.");

} else {

    console.log("Password Not Found.");

}