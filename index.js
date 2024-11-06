var express = require('express');
var bodyParser = require("body-parser");
const { Account, createAccount, signIn } = require('./models/account');

var app = express();
const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})

app.post('/create-account', (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const newAccount = createAccount(username, email, password);
        res.status(201).json({ message: "Account created successfully", account: newAccount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint for user sign-in
app.post('/sign-in', (req, res) => {
    const { email, password } = req.body;
    
    try {
        const { sessionId, user } = signIn(email, password);
        res.status(200).json({ message: "Sign-in successful", sessionId, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Daily Dose Project: ${baseUrl}`);
});

module.exports = { app, server } 
