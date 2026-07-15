// ==========================================================
// Password Strength Checker - Version 10
// ----------------------------------------------------------
// This version allows generating passwords of custom length.
//
// Features:
// - Generates one mandatory uppercase letter
// - Generates one mandatory lowercase letter
// - Generates one mandatory number
// - Generates one mandatory special character
// - Generates remaining characters randomly
// - Shuffles all characters
// - Builds the final password string
// ==========================================================


// Password Configuration

let passwordLength = 1;
let remainingCharacters = passwordLength - 4;

// Input Validation

if (passwordLength < 4) {
    console.log("Invalid password length! Password length must be at least 4 characters.");
}
else {

    // Character Sets

    let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*";
    
    // Generate Mandatory Characters
    
    let randomUppercase =
        uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];

    let randomLowercase =
        lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];

    let randomNumber =
        numbers[Math.floor(Math.random() * numbers.length)];

    let randomSpecialCharacter =
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
        
        // Store Mandatory Characters
    
    let passwordCharacters = [
        randomUppercase,
        randomLowercase,
        randomNumber,
        randomSpecialCharacter
    ];
    
    // Store All Character Groups
    
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

        let randomCharacterIndex =
            Math.floor(Math.random() * selectedGroup.length);

        let randomCharacter =
            selectedGroup[randomCharacterIndex];

        passwordCharacters.push(randomCharacter);
    }
    console.log("Password Characters Before Shuffle:", passwordCharacters);

    // Shuffle Password Characters
    
    for (let i = 0; i < 10; i++) {

        let randomIndex1 =
            Math.floor(Math.random() * passwordCharacters.length);

        let randomIndex2 =
            Math.floor(Math.random() * passwordCharacters.length);

        let temp = passwordCharacters[randomIndex1];

        passwordCharacters[randomIndex1] =
            passwordCharacters[randomIndex2];

        passwordCharacters[randomIndex2] = temp;
    }
    console.log("Password Characters After Shuffle :", passwordCharacters);

    // Build Final Password
    
    let generatedPassword = "";

    for (let i = 0; i < passwordCharacters.length; i++) {
        generatedPassword =
            generatedPassword + passwordCharacters[i];
    }

    // Display Final Password
    
    console.log("Generated Password:", generatedPassword);

}