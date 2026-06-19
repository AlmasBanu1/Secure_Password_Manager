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
    // Strong condition
    if(password.length >= 12 && hasUppercase && hasNumber){
        return "Strong Password";
    }
    // Medium condition
    else if(password.length >= 8){
        return "Medium Strength Password";
    }
    // Weak condition
    else{
        return "Weak Strength Password";
    }

}

// Display result
console.log(checkPasswordStrength(
    password,
    hasUppercase,
    hasNumber
));