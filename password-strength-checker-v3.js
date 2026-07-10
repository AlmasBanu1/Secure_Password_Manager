// Password Strength Checker - Version 3
// Introduces character-by-character scanning using loops.
// This version demonstrates how to iterate through a password.

function checkPasswordStrength(password) {
    // Flags to track password requirements
    let hasUppercase = false;
    let hasNumber = false;

    // Check each character in the password
    for (let i = 0; i < password.length; i++) {

        // Check for uppercase letter (temporary implementation)
        if (password[i] === "S") {
            hasUppercase = true;
        }

        // Check for number (temporary implementation)
        if (password[i] === "1") {
            hasNumber = true;
        }
    }

    // Return the password strength based on the collected flags
    if (password.length >= 8 && hasUppercase && hasNumber) {
        return "Strong Password";
    }

    return "Weak Password";
}

// Test the function
console.log(checkPasswordStrength("Secure123"));
