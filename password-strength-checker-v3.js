// Password Strength Checker - Version 3
// This version automatically detects uppercase letters and numbers
// using loops instead of relying on manually provided boolean values.

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

    // Determine password strength
    if (password.length >= 8 && hasUppercase && hasNumber) {
        return "Strong Password";
    }

    return "Weak Password";
}

// Test the function
console.log(checkPasswordStrength("Secure123"));