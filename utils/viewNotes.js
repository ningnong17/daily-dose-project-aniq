const { Notes } = require('../models/notes.js');
const { readJSON } = require('./NotesUtils.js')

//View notes
async function viewNotes(req, res) {
    try {
        const allNotes = await readJSON('utils/notes.json');
        return res.status(201).json(allNotes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    viewNotes
}