// ======================================================
// Password Strength Checker - Version 8
// ------------------------------------------------------
// This version introduces the foundation of the password
// generation feature.
//
// Features:
// • Generates one random uppercase letter
// • Generates one random lowercase letter
// • Generates one random digit
// • Generates one random special character
// • Stores all generated characters inside an array
//
// Note:
// The password is NOT shuffled yet.
// Shuffling will be implemented in Version 9.
// ======================================================

let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let specialCharacters = "!@#$%^&*";

// Generate one random uppercase letter
let randomIndexForUpper = Math.floor(Math.random() * uppercaseLetters.length);
let randomUppercase = uppercaseLetters[randomIndexForUpper];

// Generate one random lowercase letter
let randomIndexForLower = Math.floor(Math.random() * lowercaseLetters.length);
let randomLowercase = lowercaseLetters[randomIndexForLower];

// Generate one random digit
let randomIndexForNumber = Math.floor(Math.random() * numbers.length);
let randomNumber = numbers[randomIndexForNumber];

// Generate one random special character
let randomIndexForSpecialChar = Math.floor(Math.random() * specialCharacters.length);
let randomSpecialChar = specialCharacters[randomIndexForSpecialChar];

// Store all generated characters in an array
let passwordCharacters = [
    randomUppercase,
    randomLowercase,
    randomNumber,
    randomSpecialChar
];

console.log("Password Characters:", passwordCharacters);