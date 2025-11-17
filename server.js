const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Connect to the database
const db = new sqlite3.Database('./database/university.db', (err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to SQLite database');
});

// Routes
app.get('/api/courses', (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/courses/:id', (req, res) => {
  db.get("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

app.post('/api/courses', (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;
  const sql = "INSERT INTO courses (courseCode, title, credits, description, semester) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [courseCode, title, credits, description, semester], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, courseCode, title, credits, description, semester });
  });
});

app.put('/api/courses/:id', (req, res) => {
  const { courseCode, title, credits, description, semester } = req.body;
  const sql = "UPDATE courses SET courseCode=?, title=?, credits=?, description=?, semester=? WHERE id=?";
  db.run(sql, [courseCode, title, credits, description, semester, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: req.params.id, courseCode, title, credits, description, semester });
  });
});

app.delete('/api/courses/:id', (req, res) => {
  db.run("DELETE FROM courses WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "deleted" });
  });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

