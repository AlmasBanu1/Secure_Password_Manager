// Password Strength Checker - Version 8
// This version begins the password generation feature.
// It prepares the required character sets and initializes
// an empty password string for generating strong passwords.

let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let specialCharacters = "!@#$%^&*";

let generatedPassword = "";

console.log(uppercaseLetters);

let randomIndexForUpper = Math.floor(Math.random() * uppercaseLetters.length);
let randomUppercase = uppercaseLetters[randomIndexForUpper];
console.log("Index:", randomIndexForUpper);
console.log("Letter:", randomUppercase);

console.log(lowercaseLetters);

let randomIndexForLower = Math.floor(Math.random() * lowercaseLetters.length);
let randomLowercase = lowercaseLetters[randomIndexForLower];
console.log("Index:", randomIndexForLower);
console.log("Letter:", randomLowercase);

console.log(numbers);

let randomIndexForNumber = Math.floor(Math.random() * numbers.length);
let randomNumber = numbers[randomIndexForNumber];
console.log("Index:", randomIndexForNumber);
console.log("Number:", randomNumber);

console.log(specialCharacters);

let randomIndexForSpecialChar = Math.floor(Math.random() * specialCharacters.length);
let randomSpecialChar = specialCharacters[randomIndexForSpecialChar];
console.log("Index:", randomIndexForSpecialChar);
console.log("Special Character:", randomSpecialChar);

generatedPassword = randomUppercase + randomLowercase + randomNumber + randomSpecialChar;
console.log("generatedPassword:", generatedPassword );