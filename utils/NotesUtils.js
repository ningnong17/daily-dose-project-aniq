const { Account } = require('../models/account.js');
const { Notes } = require('../models/notes.js');
const fs = require('fs').promises;
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}


async function addNotes(req, res) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        if (description.length < 1) {
            return res.status(500).json({ message: 'Please enter more than 1 characters' });

        } else if (title.length < 1) {
            return res.status(500).json({ message: 'Please enter a title' });
        } else if (priority < 1 || priority == null) {
            return res.status(500).json({ message: 'Please select a priority status' });
        } else {
            const newNotes = new Notes(title, description, priority);
            const updatedNotes = await writeJSON(newNotes, 'utils/notes.json');
            return res.status(201).json(updatedNotes);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewNotes(req, res) {
    try {
        const allNotes = await readJSON('utils/notes.json');
        return res.status(201).json(allNotes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function createAccount(req, res) {
    try {

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, addNotes, viewNotes
}