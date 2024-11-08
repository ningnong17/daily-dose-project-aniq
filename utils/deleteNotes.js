const { Notes } = require('../models/notes.js');
const { readJSON } = require('./NotesUtils.js')
const fs = require('fs').promises;

//delete notes - aniq
async function deleteNotes(req, res) {
    try {
        const id = req.params.id;
        
        const allNotes = await readJSON('utils/notes.json');
        var index = -1;
        
        for (var i = 0; i < allNotes.length; i++) {
            var curcurrNotes = allNotes[i];
            if (curcurrNotes.id == id)
                index = i;
        }

        if (index != -1) {
            allNotes.splice(index, 1);
            await fs.writeFile('utils/notes.json', JSON.stringify(allNotes), 'utf8');
            return res.status(201).json({ message: 'note deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    deleteNotes
}