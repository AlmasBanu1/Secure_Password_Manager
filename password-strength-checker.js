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
    if (password.length >= 8 && hasUppercase && hasNumber) {
        return "Strong Password";
    }

    return "Weak Password";
}

// Display result
console.log(
    checkPasswordStrength(
        password,
        hasUppercase,
        hasNumber
    )
);