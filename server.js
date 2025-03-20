require("dotenv").config();

const PORT = process.env.PORT || 3000;
console.log("Server running on port:", PORT);
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(express.json());
app.use(cors());

const db = new Database("food_ordering_db.sqlite"); // Change this to your Turso DB connection

// Create users table if it doesn’t exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        stmt.run(name, email, password);
        res.json({ message: "Signup successful!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
