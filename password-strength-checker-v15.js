// ==========================================================
// Secure Password Manager - Version 15
// ----------------------------------------------------------
// This version introduces manual password deletion.
//
// Features:
// - Generate secure passwords
// - Store multiple passwords
// - Search for an existing password
// - Delete a password using manual left shifting
// - Remove the duplicate last element
// - Display the updated password list
// ==========================================================

// Helper Function - Pick One Random Character

function pickOneRandomCharacter(characterSet) {

    let randomIndex = Math.floor(Math.random() * characterSet.length);

    let randomCharacter = characterSet[randomIndex];

    return randomCharacter;

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

    // Password Configuration

    let passwordLength = 10;

    // Input Validation

    if (passwordLength < 4) {

        console.log(
            "Invalid Password Length! Password must contain at least 4 characters."
        );

        return;

    }

    // Preparation

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
    
    // Shuffle Password Characters

    shuffleArray(passwordCharacters);
    
    // Build Final Password

    let generatedPassword =
        buildPassword(passwordCharacters);

    return generatedPassword;

}

// Main Program
// Array to Store Multiple Passwords

let storedPasswords = [];

// Generate Five Passwords

for (let i = 0; i < 5; i++) {

    let password = generatePassword();

    storedPasswords.push(password);

}

// Display Password Information
// Display Last Generated Password

console.log(
    "Last Generated Password:",
    storedPasswords[storedPasswords.length - 1]
);

// Display All Stored Passwords

console.log("\nStored Passwords:");

for (let i = 0; i < storedPasswords.length; i++) {

    console.log(
        (i + 1) + ". " + storedPasswords[i]
    );

}

// Display Total Passwords

console.log(
    "\nTotal Stored Passwords:",
    storedPasswords.length
);

// Search Password

// Password to Search

let target = storedPasswords[2];

// Display Search Target

console.log("\nSearching For:", target);

// Variable to Track Search Status

let found = false;

// Search Password

for (let i = 0; i < storedPasswords.length; i++) {

    if (storedPasswords[i] === target) {

        found = true;

        break;

    }

}

// Display Search Result

if (found) {

    console.log("Password Found.");

} else {

    console.log("Password Not Found.");

}

// Delete Password
// Password to Delete

let targetToDelete = storedPasswords[2];

// Variable to Track Delete Status

let deleted = false;

// Search for the Password to Delete

for (let i = 0; i < storedPasswords.length; i++) {

    if (storedPasswords[i] === targetToDelete) {

        // Shift Remaining Passwords Left

        for (let j = i; j < storedPasswords.length - 1; j++) {

            storedPasswords[j] = storedPasswords[j + 1];

        }

        // Remove Duplicate Last Password

        storedPasswords.pop();

        // Mark Password as Deleted

        deleted = true;

        // Stop Searching

        break;

    }

}

// Display Delete Result

if (deleted) {

    console.log("\nStored Passwords After Delete:");

    for (let i = 0; i < storedPasswords.length; i++) {

        console.log(
            (i + 1) + ". " + storedPasswords[i]
        );

    }

    console.log("\nPassword Deletion Successful.");

} else {

    console.log("\nPassword Not Found.");

    console.log("No Changes Were Made.");

}