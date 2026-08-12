// ==========================================================
// Secure Password Manager - Version 27
// ----------------------------------------------------------
// Frontend JavaScript
// ----------------------------------------------------------
// V27 Changes:
// - Connect frontend to Express REST API
// - GET passwords from backend
// - POST new passwords
// - PUT updated passwords
// - DELETE passwords
// - Keep V26 UI functionality
// - Basic API error handling
//
// V26 Features Preserved:
// - Generate passwords
// - Show / hide main password
// - Show / hide stored passwords
// - Copy passwords
// - Search passwords
// - Highlight search results
// - Update passwords
// - Delete passwords
// - Password strength detection
// - Input validation
// - Duplicate password prevention
// ==========================================================


// ==========================================================
// API Configuration
// ==========================================================

const API_URL =
    "http://localhost:3000/api/passwords";


// ==========================================================
// DOM Elements
// ==========================================================

// Password Input

const passwordInput =
    document.getElementById("passwordInput");


// Visibility Button

const visibilityButton =
    document.getElementById("visibilityButton");


// Generate Button

const generateButton =
    document.getElementById("generateButton");


// Add Button

const addButton =
    document.getElementById("addButton");


// Search Input

const searchInput =
    document.getElementById("searchInput");


// Search Button

const searchButton =
    document.getElementById("searchButton");


// Password List

const passwordList =
    document.getElementById("passwordList");


// Password Count

const passwordCount =
    document.getElementById("passwordCount");


// ==========================================================
// Password Storage
// ==========================================================

// V27:
// Passwords are now loaded from the backend API.

let storedPasswords = [];


// ==========================================================
// Input Validation
// ==========================================================

const MIN_PASSWORD_LENGTH = 4;


// Validate Password

function validatePassword(password) {

    // Check for empty password

    if (password === "") {

        return "Password cannot be empty.";

    }


    // Check minimum password length

    if (
        password.length <
        MIN_PASSWORD_LENGTH
    ) {

        return (
            "Password must contain at least " +
            MIN_PASSWORD_LENGTH +
            " characters."
        );

    }


    // Password is valid

    return null;
}


// ==========================================================
// Password Strength
// ==========================================================

function getPasswordStrength(password) {

    let score = 0;


    // Length check

    if (password.length >= 8) {

        score++;

    }


    // Uppercase check

    if (/[A-Z]/.test(password)) {

        score++;

    }


    // Lowercase check

    if (/[a-z]/.test(password)) {

        score++;

    }


    // Number check

    if (/[0-9]/.test(password)) {

        score++;

    }


    // Special character check

    if (/[^A-Za-z0-9]/.test(password)) {

        score++;

    }


    // Return strength

    if (score >= 4) {

        return "Strong";

    }


    if (score >= 3) {

        return "Medium";

    }


    return "Weak";
}


// ==========================================================
// Password Generation
// ==========================================================

// Character Groups

const uppercaseLetters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercaseLetters =
    "abcdefghijklmnopqrstuvwxyz";

const numbers =
    "0123456789";

const specialCharacters =
    "!@#$%^&*";


// Pick One Random Character

function pickRandomCharacter(characterSet) {

    let randomIndex =
        Math.floor(
            Math.random() *
            characterSet.length
        );

    return characterSet[randomIndex];
}


// Generate Password

function generatePassword() {

    const passwordLength = 10;

    let passwordCharacters = [];


    // Add mandatory uppercase character

    passwordCharacters.push(
        pickRandomCharacter(
            uppercaseLetters
        )
    );


    // Add mandatory lowercase character

    passwordCharacters.push(
        pickRandomCharacter(
            lowercaseLetters
        )
    );


    // Add mandatory number

    passwordCharacters.push(
        pickRandomCharacter(
            numbers
        )
    );


    // Add mandatory special character

    passwordCharacters.push(
        pickRandomCharacter(
            specialCharacters
        )
    );


    // Store character groups

    const allCharacterGroups = [

        uppercaseLetters,
        lowercaseLetters,
        numbers,
        specialCharacters

    ];


    // Generate remaining characters

    const remainingCharacters =
        passwordLength - 4;


    for (
        let i = 0;
        i < remainingCharacters;
        i++
    ) {

        let randomGroupIndex =
            Math.floor(
                Math.random() *
                allCharacterGroups.length
            );


        let selectedGroup =
            allCharacterGroups[
                randomGroupIndex
            ];


        passwordCharacters.push(
            pickRandomCharacter(
                selectedGroup
            )
        );

    }


    // Shuffle password characters

    for (
        let i =
            passwordCharacters.length - 1;

        i > 0;

        i--
    ) {

        let randomIndex =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        let temp =
            passwordCharacters[i];


        passwordCharacters[i] =
            passwordCharacters[randomIndex];


        passwordCharacters[randomIndex] =
            temp;

    }


    // Convert array to string

    return passwordCharacters.join("");
}


// ==========================================================
// Update Password Count
// ==========================================================

function updatePasswordCount() {

    passwordCount.textContent =
        storedPasswords.length;

}


// ==========================================================
// API - GET All Passwords
// ==========================================================

async function loadPasswords() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Unable to load passwords."
            );

        }


        const data =
            await response.json();


        // Store backend data locally
        // for displaying/searching.

        storedPasswords =
            Array.isArray(data)
                ? data
                : [];


        // Display passwords

        displayPasswords();

    } catch (error) {

        console.error(
            "GET /api/passwords error:",
            error
        );


        passwordList.innerHTML = "";


        let errorMessage =
            document.createElement("li");


        errorMessage.className =
            "empty-message";


        errorMessage.textContent =
            "Unable to connect to the backend server.";


        passwordList.appendChild(
            errorMessage
        );

    }

}


// ==========================================================
// Show / Hide Main Password
// ==========================================================

visibilityButton.addEventListener(
    "click",
    function() {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";


            visibilityButton.textContent =
                "Hide";

        } else {

            passwordInput.type =
                "password";


            visibilityButton.textContent =
                "Show";

        }

    }
);


// ==========================================================
// Display Passwords
// ==========================================================

function displayPasswords(
    searchTarget = null
) {

    // Clear existing password list

    passwordList.innerHTML = "";


    // Update total password count

    updatePasswordCount();


    // Display message when no passwords exist

    if (storedPasswords.length === 0) {

        let emptyMessage =
            document.createElement("li");


        emptyMessage.className =
            "empty-message";


        let title =
            document.createElement(
                "strong"
            );


        title.textContent =
            "No passwords stored.";


        let message =
            document.createElement(
                "span"
            );


        message.textContent =
            "Generate or add a password to get started.";


        emptyMessage.appendChild(
            title
        );


        emptyMessage.appendChild(
            message
        );


        passwordList.appendChild(
            emptyMessage
        );


        return;

    }


    // ======================================================
    // Display ALL stored passwords
    // ======================================================

    storedPasswords.forEach(
        function(item, index) {

            // Backend record contains:
            // item.id
            // item.password

            let password =
                item.password;


            // ==================================================
            // Create list item
            // ==================================================

            let listItem =
                document.createElement("li");


            // ==================================================
            // Highlight matching password
            // ==================================================

            if (
                searchTarget !== null &&
                password === searchTarget
            ) {

                listItem.classList.add(
                    "search-match"
                );

            }


            // ==================================================
            // Password Text
            // ==================================================

            let passwordText =
                document.createElement("span");


            passwordText.className =
                "password-text";


            // Initially hide password

            passwordText.textContent =
                "•".repeat(
                    password.length
                );


            // Track visibility

            let isVisible = false;


            // ==================================================
            // Controls Container
            // ==================================================

            let controls =
                document.createElement("div");


            controls.className =
                "password-actions";


            // ==================================================
            // Strength Label
            // ==================================================

            let strengthLabel =
                document.createElement("span");


            strengthLabel.className =
                "password-strength";


            let strength =
                getPasswordStrength(
                    password
                );


            strengthLabel.textContent =
                strength;


            strengthLabel.classList.add(
                strength.toLowerCase()
            );


            // ==================================================
            // Show / Hide Button
            // ==================================================

            let storedVisibilityButton =
                document.createElement(
                    "button"
                );


            storedVisibilityButton.type =
                "button";


            storedVisibilityButton.textContent =
                "Show";


            storedVisibilityButton.className =
                "visibility-button";


            storedVisibilityButton.addEventListener(
                "click",
                function() {

                    isVisible =
                        !isVisible;


                    if (isVisible) {

                        passwordText.textContent =
                            password;


                        storedVisibilityButton.textContent =
                            "Hide";

                    } else {

                        passwordText.textContent =
                            "•".repeat(
                                password.length
                            );


                        storedVisibilityButton.textContent =
                            "Show";

                    }

                }
            );


            // ==================================================
            // Copy Button
            // ==================================================

            let copyButton =
                document.createElement(
                    "button"
                );


            copyButton.type =
                "button";


            copyButton.textContent =
                "Copy";


            copyButton.className =
                "copy-button";


            copyButton.addEventListener(
                "click",
                async function() {

                    try {

                        await navigator.clipboard.writeText(
                            password
                        );


                        copyButton.textContent =
                            "Copied!";


                        setTimeout(
                            function() {

                                copyButton.textContent =
                                    "Copy";

                            },
                            1500
                        );

                    } catch (error) {

                        // Fallback for browsers

                        let temporaryInput =
                            document.createElement(
                                "textarea"
                            );


                        temporaryInput.value =
                            password;


                        document.body.appendChild(
                            temporaryInput
                        );


                        temporaryInput.select();


                        try {

                            document.execCommand(
                                "copy"
                            );


                            copyButton.textContent =
                                "Copied!";

                        } catch (copyError) {

                            alert(
                                "Unable to copy password."
                            );

                        }


                        document.body.removeChild(
                            temporaryInput
                        );


                        setTimeout(
                            function() {

                                copyButton.textContent =
                                    "Copy";

                            },
                            1500
                        );

                    }

                }
            );


            // ==================================================
            // Update Button
            // ==================================================

            let updateButton =
                document.createElement(
                    "button"
                );


            updateButton.type =
                "button";


            updateButton.textContent =
                "Update";


            updateButton.className =
                "update-button";


            updateButton.addEventListener(
                "click",
                async function() {

                    let newPassword =
                        prompt(
                            "Enter new password:",
                            password
                        );


                    // User cancelled

                    if (
                        newPassword ===
                        null
                    ) {

                        return;

                    }


                    // Remove unnecessary spaces

                    newPassword =
                        newPassword.trim();


                    // Validate new password

                    let validationError =
                        validatePassword(
                            newPassword
                        );


                    if (
                        validationError !==
                        null
                    ) {

                        alert(
                            validationError
                        );

                        return;

                    }


                    // Prevent duplicate passwords

                    const duplicate =
                        storedPasswords.some(
                            function(item) {

                                return (
                                    item.password ===
                                    newPassword &&
                                    item.id !==
                                    item.id
                                );

                            }
                        );


                    // Send update request

                    try {

                        const response =
                            await fetch(
                                API_URL +
                                "/" +
                                item.id,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body:
                                        JSON.stringify({
                                            password:
                                                newPassword
                                        })
                                }
                            );


                        const data =
                            await response.json();


                        if (!response.ok) {

                            throw new Error(
                                data.error ||
                                "Unable to update password."
                            );

                        }


                        // Update local copy

                        storedPasswords[index] =
                            data.password;


                        // Refresh list

                        displayPasswords();


                        alert(
                            "Password updated successfully."
                        );

                    } catch (error) {

                        console.error(
                            "PUT /api/passwords error:",
                            error
                        );


                        alert(
                            error.message ||
                            "Unable to update password."
                        );

                    }

                }
            );


            // ==================================================
            // Delete Button
            // ==================================================

            let deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-button";


            deleteButton.addEventListener(
                "click",
                async function() {

                    let confirmed =
                        confirm(
                            "Are you sure you want to delete this password?"
                        );


                    // Cancel deletion

                    if (!confirmed) {

                        return;

                    }


                    try {

                        const response =
                            await fetch(
                                API_URL +
                                "/" +
                                item.id,
                                {
                                    method: "DELETE"
                                }
                            );


                        const data =
                            await response.json();


                        if (!response.ok) {

                            throw new Error(
                                data.error ||
                                "Unable to delete password."
                            );

                        }


                        // Remove from local array

                        storedPasswords.splice(
                            index,
                            1
                        );


                        // Refresh list

                        displayPasswords();


                        alert(
                            "Password deleted successfully."
                        );

                    } catch (error) {

                        console.error(
                            "DELETE /api/passwords error:",
                            error
                        );


                        alert(
                            error.message ||
                            "Unable to delete password."
                        );

                    }

                }
            );


            // ==================================================
            // Add Controls
            // ==================================================

            controls.appendChild(
                strengthLabel
            );


            controls.appendChild(
                storedVisibilityButton
            );


            controls.appendChild(
                copyButton
            );


            controls.appendChild(
                updateButton
            );


            controls.appendChild(
                deleteButton
            );


            // ==================================================
            // Add Elements to List Item
            // ==================================================

            listItem.appendChild(
                passwordText
            );


            listItem.appendChild(
                controls
            );


            // Add list item to password list

            passwordList.appendChild(
                listItem
            );

        }
    );

}


// ==========================================================
// Generate Button Event
// ==========================================================

generateButton.addEventListener(
    "click",
    function() {

        let generatedPassword =
            generatePassword();


        passwordInput.value =
            generatedPassword;


        // Hide generated password by default

        passwordInput.type =
            "password";


        visibilityButton.textContent =
            "Show";

    }
);


// ==========================================================
// Add Password Event
// ==========================================================

addButton.addEventListener(
    "click",
    async function() {

        let password =
            passwordInput.value.trim();


        // Validate password

        let validationError =
            validatePassword(
                password
            );


        if (
            validationError !==
            null
        ) {

            alert(
                validationError
            );

            return;

        }


        // Prevent duplicate passwords

        if (
            storedPasswords.some(
                function(item) {

                    return item.password ===
                        password;

                }
            )
        ) {

            alert(
                "This password is already stored."
            );

            return;

        }


        // ==================================================
        // POST Password to Backend
        // ==================================================

        try {

            const response =
                await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                password:
                                    password
                            })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Unable to add password."
                );

            }


            // Add backend-created record
            // to local frontend state.

            storedPasswords.push(
                data.password
            );


            // Clear input

            passwordInput.value =
                "";


            // Hide password input again

            passwordInput.type =
                "password";


            visibilityButton.textContent =
                "Show";


            // Display updated list

            displayPasswords();


            alert(
                "Password added successfully."
            );

        } catch (error) {

            console.error(
                "POST /api/passwords error:",
                error
            );


            alert(
                error.message ||
                "Unable to add password."
            );

        }

    }
);


// ==========================================================
// Search Password
// ==========================================================

function searchPassword(target) {

    let found = false;


    storedPasswords.forEach(
        function(item) {

            if (
                item.password ===
                target
            ) {

                found = true;

            }

        }
    );


    return found;
}


// ==========================================================
// Search Button Event
// ==========================================================

searchButton.addEventListener(
    "click",
    function() {

        let target =
            searchInput.value.trim();


        // Prevent empty search

        if (target === "") {

            alert(
                "Please enter a password to search."
            );

            return;

        }


        // Check whether password exists

        let found =
            searchPassword(
                target
            );


        // ==================================================
        // Password Found
        // ==================================================

        if (found) {

            // Display ALL passwords.
            // Matching password will be highlighted.

            displayPasswords(
                target
            );

        } else {

            // Display ALL passwords normally

            displayPasswords();


            alert(
                "Password Not Found."
            );

        }

    }
);


// ==========================================================
// Search Input - Enter Key
// ==========================================================

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Enter"
        ) {

            searchButton.click();

        }

    }
);


// ==========================================================
// Clear Search - Reset Highlight
// ==========================================================

searchInput.addEventListener(
    "input",
    function() {

        // If search box is empty,
        // display all stored passwords

        if (
            searchInput.value.trim() ===
            ""
        ) {

            displayPasswords();

        }

    }
);


// ==========================================================
// Initial Load
// ==========================================================

// Load passwords from backend

loadPasswords();