class Notes {
    constructor(title, description, priority, userId) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
        this.userId = userId;
    }
}

module.exports = { Notes }; 