class Account {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;

        // Generate a unique user ID
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = `${timestamp}${random.toString().padStart(3, '0')}`;
    }
}

const users = []; // Array to store accounts
const sessions = {}; // Simulate session storage

// Function to create a new account
function createAccount(username, email, password) {
    if (users.some(user => user.email === email)) {
        throw new Error("Email is already registered.");
    }
    const newAccount = new Account(username, email, password);
    users.push(newAccount);
    return newAccount;
}

// Function to sign in a user
function signIn(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Create a session ID
    const sessionId = `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
    sessions[sessionId] = user.id;
    return { sessionId, user };
}

module.exports = { Account, createAccount, signIn };
