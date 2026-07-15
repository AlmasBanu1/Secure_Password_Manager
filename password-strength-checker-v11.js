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

let passwordLength = 10;
let remainingCharacters = passwordLength - 4;

// Input Validation

if (passwordLength < 4) {

    console.log(
        "Invalid password length! Password length must be at least 4 characters."
    );

} else {

    // Character Sets
    
    let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@#$%^&*";

    // Functions
    // Returns one random character from a given character set
    function pickOneRandomCharacter(characterSet) {

        let randomIndex =
            Math.floor(Math.random() * characterSet.length);

        let randomCharacter =
            characterSet[randomIndex];

        return randomCharacter;

    }

    // Randomly shuffles the elements of an array
    function shuffleArray(array) {

        for (let i = 0; i < 10; i++) {

            let randomIndex1 =
                Math.floor(Math.random() * array.length);

            let randomIndex2 =
                Math.floor(Math.random() * array.length);

            let temp = array[randomIndex1];

            array[randomIndex1] = array[randomIndex2];

            array[randomIndex2] = temp;
        }

    }

    // Builds the final password string from an array
    function buildPassword(array) {

        let generatedPassword = "";

        for (let i = 0; i < array.length; i++) {

            generatedPassword += array[i];

        }

        return generatedPassword;

    }

    // Generate Mandatory Characters
    
    let randomUppercase =
        pickOneRandomCharacter(uppercaseLetters);

    let randomLowercase =
        pickOneRandomCharacter(lowercaseLetters);

    let randomNumber =
        pickOneRandomCharacter(numbers);

    let randomSpecialCharacter =
        pickOneRandomCharacter(specialCharacters);

    // Create Password Character Array
    
    let passwordCharacters = [
        randomUppercase,
        randomLowercase,
        randomNumber,
        randomSpecialCharacter
    ];

    // Create Character Group Collection
    
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

    console.log(
        "Password Characters Before Shuffle:",
        passwordCharacters
    );

    // Shuffle Password Characters

    shuffleArray(passwordCharacters);

    console.log(
        "Password Characters After Shuffle:",
        passwordCharacters
    );

    // Build Final Password
    
    let generatedPassword =
        buildPassword(passwordCharacters);

    // Display Generated Password

    console.log(
        "Generated Password:",
        generatedPassword
    );

}