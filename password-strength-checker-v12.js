// ==========================================================
// Secure Password Manager - Version 12
// ----------------------------------------------------------
// This version refactors password generation using functions
// and stores multiple generated passwords in an array.
//
// Features:
// - Generates passwords of custom length
// - Uses reusable helper functions
// - Generates one mandatory uppercase letter
// - Generates one mandatory lowercase letter
// - Generates one mandatory number
// - Generates one mandatory special character
// - Generates remaining characters randomly
// - Shuffles all generated characters
// - Builds the final password string
// - Stores multiple generated passwords
// - Displays all stored passwords
// - Displays total number of stored passwords
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
            "Invalid password length! Password length must be at least 4 characters."
        );
        return;
    }

    // Preparation

    let remainingCharacters =
        passwordLength - 4;

    let uppercaseLetters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let lowercaseLetters =
        "abcdefghijklmnopqrstuvwxyz";

    let numbers =
        "0123456789";

    let specialCharacters =
        "!@#$%^&*";

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

// Generate 5 Passwords

for (let i = 0; i < 5; i++) {

    let password =
        generatePassword();

    storedPasswords.push(password);

}

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