const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
let data = fs.readFileSync('db.json');  
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/results', (req, res) => {
  res.json(JSON.parse(data));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);