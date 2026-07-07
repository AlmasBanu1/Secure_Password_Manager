// Password Strength Checker - Version 4
// This version dynamically detects any uppercase letter (A-Z)
// and any digit (0-9) by checking the range of each character.
// Password strength is determined based on length, uppercase letters,
// and numeric digits.

function checkPasswordStrength(password) {

    // Flags to track password requirements
    let hasUppercase = false;
    let hasNumber = false;

    // Loop through each character of the password
    for (let i = 0; i < password.length; i++) {

        // Check whether the current character is an uppercase letter
        if (password[i] >= 'A' && password[i] <= 'Z') {
            hasUppercase = true;
        }

        // Check whether the current character is a numeric digit
        if (password[i] >= '0' && password[i] <= '9') {
            hasNumber = true;
        }
    }

    // Return password strength after checking all characters
    if (password.length >= 8 && hasUppercase && hasNumber) {
        return "Strong Password";
    }

    return "Weak Password";
}

// Test the function with a sample password
console.log(checkPasswordStrength("Secure123"));