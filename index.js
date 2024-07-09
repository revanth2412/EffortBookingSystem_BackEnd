const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());

// Initialize the database
db.serialize(() => {
    db.run("CREATE TABLE associates (id INTEGER PRIMARY KEY, name TEXT, effort TEXT)");
    db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT)");
});

// Route to get all associates
app.get('/associates', (req, res) => {
    db.all("SELECT * FROM associates", [], (err, rows) => {
        if (err) {
            res.status(500).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Route to add a new effort
app.post('/effort', (req, res) => {
    const { name, effort } = req.body;
    db.run(`INSERT INTO associates (name, effort) VALUES (?, ?)`, [name, effort], function(err) {
        if (err) {
            res.status(500).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

// Route to update a task
app.post('/task', (req, res) => {
    const { name, description, status } = req.body;
    db.run(`INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)`, [name, description, status], function(err) {
        if (err) {
            res.status(500).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID }
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
