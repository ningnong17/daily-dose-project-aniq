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

module.exports = { Account };
