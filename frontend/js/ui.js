// ==========================================================
// Secure Password Manager - Version 31
// ----------------------------------------------------------
// UI Module
// ----------------------------------------------------------
// Responsibilities:
// - DOM manipulation
// - Password list rendering
// - Password count
// - Password visibility
// - UI messages
// ==========================================================


// ==========================================================
// Get Element
// ==========================================================

function getElement(id) {

    return document.getElementById(id);

}


// ==========================================================
// Set Text
// ==========================================================

function setText(
    element,
    text
) {

    if (!element) {
        return;
    }

    element.textContent =
        text;

}


// ==========================================================
// Update Password Count
// ==========================================================

function updatePasswordCount(
    passwordCountElement,
    count
) {

    if (!passwordCountElement) {
        return;
    }

    passwordCountElement.textContent =
        count;

}


// ==========================================================
// Clear Password List
// ==========================================================

function clearPasswordList(
    passwordList
) {

    if (!passwordList) {
        return;
    }

    passwordList.innerHTML =
        "";

}


// ==========================================================
// Create Password List Item
// ==========================================================

function createPasswordListItem(
    record
) {

    const li =
        document.createElement("li");

    li.className =
        "password-item";


    // ------------------------------------------------------
    // Password display
    // ------------------------------------------------------

    const passwordWrapper =
        document.createElement("div");

    passwordWrapper.className =
        "stored-password";


    const passwordText =
        document.createElement("span");

    passwordText.className =
        "stored-password-text";


    // ------------------------------------------------------
    // Dynamic password masking
    // ------------------------------------------------------

    const hiddenPassword =
        "•".repeat(
            record.password.length
        );


    passwordText.textContent =
        hiddenPassword;


    passwordWrapper.appendChild(
        passwordText
    );


    // ------------------------------------------------------
    // Button container
    // ------------------------------------------------------

    const buttonWrapper =
        document.createElement("div");

    buttonWrapper.className =
        "password-actions";


    // ------------------------------------------------------
    // Stored Password Show / Hide
    // ------------------------------------------------------

    const visibilityButton =
        document.createElement("button");

    visibilityButton.type =
        "button";

    visibilityButton.className =
        "stored-visibility-button";

    visibilityButton.textContent =
        "Show";


    visibilityButton.setAttribute(
        "aria-label",
        "Show stored password"
    );


    let visible =
        false;


    visibilityButton.addEventListener(
        "click",
        function () {

            visible =
                !visible;


            if (visible) {

                passwordText.textContent =
                    record.password;

                visibilityButton.textContent =
                    "Hide";

                visibilityButton.setAttribute(
                    "aria-label",
                    "Hide stored password"
                );

            } else {

                passwordText.textContent =
                    hiddenPassword;

                visibilityButton.textContent =
                    "Show";

                visibilityButton.setAttribute(
                    "aria-label",
                    "Show stored password"
                );

            }

        }
    );


    // ------------------------------------------------------
    // Copy button
    // ------------------------------------------------------

    const copyButton =
        document.createElement("button");

    copyButton.type =
        "button";

    copyButton.className =
        "copy-button";

    copyButton.textContent =
        "Copy";


    copyButton.addEventListener(
        "click",
        async function () {

            try {

                await navigator.clipboard.writeText(
                    record.password
                );

                copyButton.textContent =
                    "Copied!";


                setTimeout(
                    function () {

                        copyButton.textContent =
                            "Copy";

                    },
                    1500
                );

            } catch (error) {

                console.error(
                    "Copy password error:",
                    error
                );

                copyButton.textContent =
                    "Copy failed";

            }

        }
    );


    // ------------------------------------------------------
    // Edit button
    // ------------------------------------------------------

    const editButton =
        document.createElement("button");

    editButton.type =
        "button";

    editButton.className =
        "edit-button";

    editButton.textContent =
        "Edit";


    // ------------------------------------------------------
    // Delete button
    // ------------------------------------------------------

    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.className =
        "delete-button";

    deleteButton.textContent =
        "Delete";


    // ------------------------------------------------------
    // Assemble buttons
    // ------------------------------------------------------

    buttonWrapper.appendChild(
        visibilityButton
    );

    buttonWrapper.appendChild(
        copyButton
    );

    buttonWrapper.appendChild(
        editButton
    );

    buttonWrapper.appendChild(
        deleteButton
    );


    // ------------------------------------------------------
    // Assemble list item
    // ------------------------------------------------------

    li.appendChild(
        passwordWrapper
    );

    li.appendChild(
        buttonWrapper
    );


    return {

        element:
            li,

        editButton:
            editButton,

        deleteButton:
            deleteButton

    };

}


// ==========================================================
// Render Password List
// ==========================================================

function renderPasswordList(
    passwordList,
    passwords,
    passwordCountElement
) {

    if (!passwordList) {
        return;
    }


    clearPasswordList(
        passwordList
    );


    if (
        !Array.isArray(passwords) ||
        passwords.length === 0
    ) {

        updatePasswordCount(
            passwordCountElement,
            0
        );

        return;

    }


    passwords.forEach(
        function (record) {

            const item =
                createPasswordListItem(
                    record
                );


            passwordList.appendChild(
                item.element
            );

        }
    );


    updatePasswordCount(
        passwordCountElement,
        passwords.length
    );

}


// ==========================================================
// Show Message
// ==========================================================

function showMessage(
    message,
    type = "info"
) {

    let messageElement =
        document.getElementById(
            "message"
        );


    if (!messageElement) {

        messageElement =
            document.createElement(
                "div"
            );

        messageElement.id =
            "message";

        document.body.prepend(
            messageElement
        );

    }


    messageElement.textContent =
        message;


    messageElement.className =
        `message ${type}`;

}


// ==========================================================
// Clear Message
// ==========================================================

function clearMessage() {

    const messageElement =
        document.getElementById(
            "message"
        );


    if (messageElement) {

        messageElement.textContent =
            "";

        messageElement.className =
            "message";

    }

}


// ==========================================================
// Set Input Value
// ==========================================================

function setInputValue(
    input,
    value
) {

    if (!input) {
        return;
    }

    input.value =
        value;

}


// ==========================================================
// Get Input Value
// ==========================================================

function getInputValue(
    input
) {

    if (!input) {
        return "";
    }

    return input.value;

}


// ==========================================================
// Toggle Password Visibility
// ==========================================================

function togglePasswordVisibility(
    input,
    button
) {

    if (!input || !button) {
        return;
    }


    if (
        input.type ===
        "password"
    ) {

        input.type =
            "text";

        button.textContent =
            "🙈";

        button.setAttribute(
            "aria-label",
            "Hide password"
        );

        button.setAttribute(
            "title",
            "Hide password"
        );

    } else {

        input.type =
            "password";

        button.textContent =
            "👁";

        button.setAttribute(
            "aria-label",
            "Show password"
        );

        button.setAttribute(
            "title",
            "Show password"
        );

    }

}


// ==========================================================
// Highlight Text
// ==========================================================

function highlightText(
    element,
    searchTerm
) {

    if (!element) {
        return;
    }


    const text =
        element.textContent;


    const term =
        String(
            searchTerm || ""
        ).trim();


    if (!term) {

        element.textContent =
            text;

        return;

    }


    const lowerText =
        text.toLowerCase();

    const lowerTerm =
        term.toLowerCase();


    const index =
        lowerText.indexOf(
            lowerTerm
        );


    if (index === -1) {
        return;
    }


    element.textContent =
        "";


    const before =
        document.createTextNode(
            text.substring(
                0,
                index
            )
        );


    const match =
        document.createElement(
            "mark"
        );


    match.textContent =
        text.substring(
            index,
            index + term.length
        );


    const after =
        document.createTextNode(
            text.substring(
                index + term.length
            )
        );


    element.appendChild(
        before
    );

    element.appendChild(
        match
    );

    element.appendChild(
        after
    );

}


// ==========================================================
// Export
// ==========================================================

export {

    getElement,

    setText,

    updatePasswordCount,

    clearPasswordList,

    createPasswordListItem,

    renderPasswordList,

    showMessage,

    clearMessage,

    setInputValue,

    getInputValue,

    togglePasswordVisibility,

    highlightText

};