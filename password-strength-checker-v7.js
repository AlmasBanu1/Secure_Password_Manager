// Password Strength Checker - Version 7
// This version calculates a password score based on security rules
// and classifies the password as Weak, Medium, or Strong.

let password = "Secure123";

// Function to calculate the password score
function checkPasswordScore(password) {

    // Flags to track password requirements
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    // Loop through each character of the password
    for (let i = 0; i < password.length; i++) {

        // Check for uppercase letter
        if (password[i] >= 'A' && password[i] <= 'Z') {
            hasUppercase = true;
        }

        // Check for lowercase letter
        if (password[i] >= 'a' && password[i] <= 'z') {
            hasLowercase = true;
        }

        // Check for numeric digit
        if (password[i] >= '0' && password[i] <= '9') {
            hasNumber = true;
        }

        // Check for special character
        if (
            !(password[i] >= 'A' && password[i] <= 'Z') &&
            !(password[i] >= 'a' && password[i] <= 'z') &&
            !(password[i] >= '0' && password[i] <= '9')
        ) {
            hasSpecialCharacter = true;
        }
    }

    // Initialize password score
    let score = 0;

    // Add one point if password length is at least 8 characters
    if (password.length >= 8) {
        score += 1;
    }

    // Add one point for each security requirement met
    if (hasUppercase) {
        score += 1;
    }

    if (hasLowercase) {
        score += 1;
    }

    if (hasNumber) {
        score += 1;
    }

    if (hasSpecialCharacter) {
        score += 1;
    }

    // Return the final password score
    return score;
}

// Calculate the password score
let score = checkPasswordScore(password);

// Display the password score
console.log("Score:", score);

// Display the password strength based on the score
if (score === 5) {
    console.log("Strong Password");
} else if (score >= 3) {
    console.log("Medium Password");
} else {
    console.log("Weak Password");
}