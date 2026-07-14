// ==============================================
// Password Strength Checker - Version 9
// ----------------------------------------------
// Features:
// 1. Generate one random uppercase letter
// 2. Generate one random lowercase letter
// 3. Generate one random number
// 4. Generate one random special character
// 5. Store all characters in an array
// 6. Shuffle the array using random swaps
// 7. Build the final password string
// ==============================================

// Character Sets
let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let specialCharacters = "!@#$%^&*";

// Generate Random Characters
let randomUppercase =
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];

let randomLowercase =
    lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];

let randomNumber =
    numbers[Math.floor(Math.random() * numbers.length)];

let randomSpecialCharacter =
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

// Store Generated Characters
let passwordCharacters = [
    randomUppercase,
    randomLowercase,
    randomNumber,
    randomSpecialCharacter
];

console.log("Generated Characters:", passwordCharacters);

// Shuffle Password Characters
for (let i = 0; i < 10; i++) {

    let randomIndex1 = Math.floor(Math.random() * passwordCharacters.length);
    let randomIndex2 = Math.floor(Math.random() * passwordCharacters.length);

    let temp = passwordCharacters[randomIndex1];
    passwordCharacters[randomIndex1] = passwordCharacters[randomIndex2];
    passwordCharacters[randomIndex2] = temp;

}

// Build Final Password
let generatedPassword = "";

for (let i = 0; i < passwordCharacters.length; i++) {
    generatedPassword = generatedPassword + passwordCharacters[i];
}

// Display Final Password
console.log("Generated Password:", generatedPassword);