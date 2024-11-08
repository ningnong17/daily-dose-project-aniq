const { Notes } = require('../models/notes.js');
const { readJSON } = require('./NotesUtils.js')
const fs = require('fs').promises;
//Edit notes //** */ Gab
async function editNotes(req, res) {
    try {

        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const priority = req.body.priority;


        const allNotes = await readJSON('utils/notes.json');
        var modified = false;

        for (var i = 0; i < allNotes.length; i++) {
            var currentResource  = allNotes[i];
            if (currentResource .id == id) {

                allNotes[i].title = title;
                allNotes[i].description = description;
                allNotes[i].priority = priority;
                modified = true;
                break;
            }
        }
        if (modified) {
            await fs.writeFile('utils/notes.json', JSON.stringify(allNotes), 'utf8');
            return res.status(201).json({ message: 'Note Updated successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    editNotes
}