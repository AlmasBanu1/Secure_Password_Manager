let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let specialCharacters = "!@#$%^&*";

let generatedPassword = "";

let randomIndexForUpper = Math.floor(Math.random() * uppercaseLetters.length);
let randomUppercase = uppercaseLetters[randomIndexForUpper];

let randomIndexForLower = Math.floor(Math.random() * lowercaseLetters.length);
let randomLowercase = lowercaseLetters[randomIndexForLower];

let randomIndexForNumber = Math.floor(Math.random() * numbers.length);
let randomNumber = numbers[randomIndexForNumber];

let randomIndexForSpecialChar = Math.floor(Math.random() * specialCharacters.length);
let randomSpecialChar = specialCharacters[randomIndexForSpecialChar];

let passwordCharacters = [
    randomUppercase,
    randomLowercase,
    randomNumber,
    randomSpecialChar
];
console.log("Password Characters:", passwordCharacters );

for (let i = 0; i < 10; i++) {
    let randomIndex1 = Math.floor(Math.random() * passwordCharacters.length);
    let randomIndex2 = Math.floor(Math.random() * passwordCharacters.length);
    console.log(randomIndex1, randomIndex2);

    let temp = passwordCharacters[randomIndex1];
    passwordCharacters[randomIndex1] = passwordCharacters[randomIndex2];
    passwordCharacters[randomIndex2] = temp;
}
console.log("Shuffled Password:", passwordCharacters);