
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'milk_trace.db');
const initSqlPath = path.join(__dirname, 'database', 'init.sql');

// 1. Delete the old database file if it exists
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('Old database file deleted.');
}

// 2. Read the SQL init script
const initSql = fs.readFileSync(initSqlPath, 'utf8');

// 3. Create a new database and execute the init script
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');

    db.exec(initSql, (err) => {
        if (err) {
            console.error('Error executing init script:', err.message);
        } else {
            console.log('Database initialized successfully.');
        }

        // Close the database connection
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    });
});
