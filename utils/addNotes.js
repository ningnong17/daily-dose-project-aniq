const { Notes } = require('../models/notes.js');
const { writeJSON } = require('./NotesUtils.js')

//Add notes
async function addNotes(req, res) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;
        if (!description || description.length < 1) {
            return res.status(500).json({ message: 'Please enter more than 1 character' });

        } else if (!title || title.length < 1) {
            return res.status(500).json({ message: 'Please enter a title' });
        } else if (!priority || priority < 1) {
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


module.exports = {
    addNotes
}