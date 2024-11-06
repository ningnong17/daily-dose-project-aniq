const { createAccount, signIn, sessions } = require('./accounts.js');
const { Notes } = require('./notes.js');

// Create a new account
try {
    const user1 = createAccount("john_doe", "john@example.com", "password123");
    console.log("Account created:", user1);
} catch (error) {
    console.log(error.message);
}

// Sign in to the account
let sessionId;
try {
    const signInResult = signIn("john@example.com", "password123");
    sessionId = signInResult.sessionId;
    console.log("User signed in:", signInResult.user);
} catch (error) {
    console.log(error.message);
}

// If the user is signed in, create a note linked to them
if (sessionId && sessions[sessionId]) {
    const userId = sessions[sessionId]; // Get user ID from session
    const newNote = new Notes("Daily Goals", "Complete the daily project.", userId);
    console.log("New note created for user:", newNote);
} else {
    console.log("User is not signed in.");
}
