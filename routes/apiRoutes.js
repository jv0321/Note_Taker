// Import required packages
const router = require('express').Router();
const { v4: generateID } = require('uuid');
const fs = require('fs/promises');
const path = require('path')
// Import Player and Team models if you have them
// const Player = require('./models/Player');
// const Team = require('./models/Team');

// Function to read data from the database file
async function getTaskData() {
  const taskdata = await fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8');
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
  await fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notesData, null, 2));
  res.json(newNote);
});

// Route to delete a note by its id
router.delete('/notes/:id', async (req, res) => {
  const notesData = await getTaskData();
  const id = req.params.id;
  const filteredNotes = notesData.filter(note => note.id !== id); // Exclude the note with the specified id
  await fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(filteredNotes, null, 2));
  res.json({
    message: 'Your note has been deleted.'
  });
});

// // Route to update a player's information
// router.put('/players/:playerId', async (req, res) => {
//   // Implement the logic to update a player's information
//   res.send('Update player route');
// });

// // Route to delete a player by its id
// router.delete('/players/:playerId', async (req, res) => {
//   // Implement the logic to delete a player
//   res.send('Delete player route');
// });

// // Route to update a team's information
// router.put('/teams/:teamId', async (req, res) => {
//   // Implement the logic to update a team's information
//   res.send('Update team route');
// });

// // Route to delete a team by its id
// router.delete('/teams/:teamId', async (req, res) => {
//   // Implement the logic to delete a team
//   res.send('Delete team route');
// });

// Export the router
module.exports = router;
