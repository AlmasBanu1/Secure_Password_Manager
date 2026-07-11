// Password Strength Checker - Version 6
// This version automatically detects uppercase letters,
// lowercase letters, numeric digits, and special characters
// by scanning each character of the password.


function checkPasswordStrength(password) {

    // Flags to track password requirements
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    // Loop through each character of the password
    for (let i = 0; i < password.length; i++) {

        // Check whether the current character is an uppercase letter
        if (password[i] >= 'A' && password[i] <= 'Z') {
            hasUppercase = true;
        }

        // Check whether the current character is a lowercase letter
        if (password[i] >= 'a' && password[i] <= 'z') {
            hasLowercase = true;
        }

        // Check whether the current character is a numeric digit
        if (password[i] >= '0' && password[i] <= '9') {
            hasNumber = true;
        }
        
        // Check whether the current character is a special character
        if (
            !(password[i] >= 'A' && password[i] <= 'Z') &&
            !(password[i] >= 'a' && password[i] <= 'z') &&
            !(password[i] >= '0' && password[i] <= '9')
        ){
            hasSpecialCharacter = true;
        }
    }

    // Return password strength after checking all requirements
    if (
        password.length >= 8 &&
        hasUppercase &&
        hasLowercase &&
        hasNumber && hasSpecialCharacter
    ) {
        return "Strong Password";
    }

    return "Weak Password";
}

// Test the function with a sample password
console.log(checkPasswordStrength("Secure@123"));