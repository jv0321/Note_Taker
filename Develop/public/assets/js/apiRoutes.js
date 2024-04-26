// Import required packages
const router = require('express').Router()
const { v4: generateID } = require('uuid')
const fs = require('fs/promises')

// Function to read data from the database file
async function getTaskData() {
  const taskdata = await fs.readFile('/db/db.json', 'utf8');
  return JSON.parse(taskdata);
}

// Route to retrieve existing notes
router.get('/notes', async (req, res) => {
  const noteData = await getTaskData();
  res.json(noteData);
});

// Route to add a new note
router.post('/notes', async (req, res) => {
  const newNote = req.body;
  newNote.id = generateID(); // Assign a random id to the new note
  const notesData = await getTaskData();
  notesData.push(newNote);
  await fs.writeFile('/db/db.json', JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

// Route to delete a note by its id
router.delete('/notes/:id', async (req, res) => {
  const notesData = await getTaskData();
  const id = req.params.id;
  const filteredNotes = notesData.filter(note => note.id !== id); // Exclude the note with the specified id
  await fs.writeFile('/db/db.json', JSON.stringify(filteredNotes, null, 2));
  res.json({
    message: 'Your note has been deleted.'
  });
});

module.exports = router
