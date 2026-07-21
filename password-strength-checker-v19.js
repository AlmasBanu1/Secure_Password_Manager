// ==========================================================
// Secure Password Manager - Version 19
// ----------------------------------------------------------
// This version introduces a reusable password deletion module.
//
// Features:
// - Generate secure passwords
// - Store multiple passwords
// - Search passwords using a reusable function
// - Display passwords using a reusable function
// - Update passwords using a reusable function
// - Delete passwords using a reusable function
// ==========================================================

// Helper Function - Pick One Random Character

function pickOneRandomCharacter(characterSet) {

    let randomIndex =
        Math.floor(Math.random() * characterSet.length);

    return characterSet[randomIndex];

}

// Helper Function - Shuffle Password Characters

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

// Helper Function - Build Final Password

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

    // Character Groups

    let uppercaseLetters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let lowercaseLetters =
        "abcdefghijklmnopqrstuvwxyz";

    let numbers =
        "0123456789";

    let specialCharacters =
        "!@#$%^&*";

    // Password Storage

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

    // Search Password Using Linear Search

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

// Update Password

function updatePassword(passwords, target, newPassword) {

    let updated = false;

    // Search Password to Update

    for (let i = 0; i < passwords.length; i++) {

        if (passwords[i] === target) {

            // Replace Old Password

            passwords[i] = newPassword;

            updated = true;

            break;

        }

    }

    return updated;

}

// Delete Password

function deletePassword(passwords, target) {

    let deleted = false;

    // Search Password to Delete

    for (let i = 0; i < passwords.length; i++) {

        if (passwords[i] === target) {

            // Shift Remaining Passwords One Position Left

            for (let j = i; j < passwords.length - 1; j++) {

                passwords[j] = passwords[j + 1];

            }

            // Remove Duplicate Last Element

            passwords.pop();

            deleted = true;

            break;

        }

    }

    return deleted;

}

// Main Program
// Array to Store Multiple Passwords

let storedPasswords = [];

// Generate Five Passwords

for (let i = 0; i < 5; i++) {

    storedPasswords.push(
        generatePassword()
    );

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

console.log(
    "\nSearching For:",
    target
);

let found = searchPassword(
    storedPasswords,
    target
);

if (found) {

    console.log("Password Found.");

} else {

    console.log("Password Not Found.");

}

// Update Password

let targetToUpdate =
    storedPasswords[2];

let newPassword =
    "UpdatedPassword123!";

let updated = updatePassword(

    storedPasswords,
    targetToUpdate,
    newPassword

);

if (updated) {

    console.log(
        "\nPassword Updated Successfully."
    );

    displayPasswords(storedPasswords);

} else {

    console.log(
        "\nPassword Not Found."
    );

}

// Delete Password
// Delete the Updated Password

let targetToDelete =
    newPassword;

let deleted = deletePassword(

    storedPasswords,
    targetToDelete

);

if (deleted) {

    console.log(
        "\nPassword Deleted Successfully."
    );

    displayPasswords(storedPasswords);

} else {

    console.log(
        "\nPassword Not Found."
    );

    console.log(
        "No Changes Were Made."
    );

}
