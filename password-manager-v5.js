// Secure Password Manager - Version 5
// This version introduces an array to store multiple passwords.
// It displays all stored passwords and the total number of saved passwords.

// Array to store multiple passwords
let passwords = [
    "Google123",
    "Amazon456",
    "GitHub789",
    "Netflix999"
];

// Display the heading
console.log("Stored Passwords:");

// Loop through the array and display each password
for (let i = 0; i < passwords.length; i++) {
    console.log(passwords[i]);
}

// Display the total number of stored passwords
console.log("Total Passwords: " + passwords.length);