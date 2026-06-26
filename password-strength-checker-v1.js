// Password Strength Checker - Version 1
// This version evaluates password strength using
// manually provided uppercase and number flags.

// Sample password data
let password = "Secure123";
let hasUppercase = true;
let hasNumber = true;

// Check password strength
function checkPasswordStrength(
    password,
    hasUppercase,
    hasNumber
) {
    // Determine whether the password is strong
    if (password.length >= 8 && hasUppercase && hasNumber) {
        return "Strong Password";
    }

    return "Weak Password";
}

// Test the function
console.log(
    checkPasswordStrength(
        password,
        hasUppercase,
        hasNumber
    )
);