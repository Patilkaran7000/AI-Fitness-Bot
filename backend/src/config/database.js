const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Create database file in the backend directory
const dbPath = path.join(__dirname, '..', '..', 'fitness_chatbot.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
    process.exit(-1);
  } else {
    console.log('✅ Database connected successfully');
    console.log(`📁 Database file: ${dbPath}`);
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Promisify database methods for easier async/await usage
const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve({ rows });
    });
  });
};

const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

module.exports = {
  query: dbQuery,
  run: dbRun,
  db // Export raw db for special cases
};
