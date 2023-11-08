const fs = require('fs');
const express = require('express');
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
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});