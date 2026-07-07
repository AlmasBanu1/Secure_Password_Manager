// Password Strength Checker - Version 1
// Checks password strength using manually provided boolean values
// for uppercase letters and numbers.

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