class Notes {
    constructor(title, description, userId) {
        this.title = title;
        this.description = description;
        this.priority = ["Extreme Priority", "High Priority", "Medium Priority", "Low Priority"];
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
        this.userId = userId;
    }
}

module.exports = { Notes }; 