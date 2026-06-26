// Password Strength Checker - Version 2
// This version introduces three password strength levels:
// Strong, Medium, and Weak.
// Uppercase and number values are still provided manually.

// Sample password data
let password = "SecurePassword123";
let hasUppercase = true;
let hasNumber = true;

// Check password strength
function checkPasswordStrength(
    password,
    hasUppercase,
    hasNumber
) {

    // Strong password
    if (password.length >= 12 && hasUppercase && hasNumber) {
        return "Strong Password";
    }

    // Medium password
    if (password.length >= 8) {
        return "Medium Strength Password";
    }

    // Weak password
    return "Weak Strength Password";
}

// Test the function
console.log(
    checkPasswordStrength(
        password,
        hasUppercase,
        hasNumber
    )
);