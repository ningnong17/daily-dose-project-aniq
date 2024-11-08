var express = require('express');
var bodyParser = require("body-parser");
const { addNotes } = require('./utils/addNotes.js')
const { viewNotes } = require('./utils/viewNotes.js')
const { editNotes } = require('./utils/editNotes.js')
const { deleteNotes } = require('./utils/deleteNotes.js')
var app = express();
const PORT = process.env.PORT || 5050
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
})
app.post('/add-notes', addNotes);
app.get('/view-notes', viewNotes);
app.put('/edit-notes/:id',editNotes);
app.delete('/delete-notes/:id',deleteNotes);

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' :
        address.address}:${address.port}`;
    console.log(`Daily Dose Project: ${baseUrl}`);
});

module.exports = { app, server } 
