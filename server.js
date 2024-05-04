// Import required modules and set up Express
const express = require('express');
const app = express();
const api_routes = require('./routes/apiRoutes');
const PORT = 3333;

// Serve static files from the public directory
app.use(express.static('./public'));

// Enable JSON data parsing
app.use(express.json());

// Route for serving notes.html
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// // Route all API requests to api_routes.js
app.use('/api', api_routes);

// Fallback route to redirect to index.html for invalid routes
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server on port 3333
app.listen(PORT, () => {
    console.log('Server running on port http://localhost:3333');
});
