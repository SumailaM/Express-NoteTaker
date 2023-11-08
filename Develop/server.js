
const fs = require('fs');
const express = require('express');
const { v4:uuidv4 } = require('uuid'); 
// using this uuid package to generate unique ID's for notes
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// Html Routes
app.get('/notes', (req, res) => {
res.sendFile(__dirname + '/public/notes.html');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// api routes
app.get('/api/notes', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('db.json'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();  //will generate a unique id for the note
    const notes = JSON.parse(fs.readFileSync('db.json'));
    notes.push(newNote);
    fs.writeFileSync('db.json', JSON.stringify(notes));
    res.json(newNote);
  });

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});