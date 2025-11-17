const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/university.db');

db.run(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseCode TEXT NOT NULL,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT,
    semester TEXT
  )
`);

console.log("Database and 'courses' table ready.");
db.close();

