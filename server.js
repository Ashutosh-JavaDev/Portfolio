const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Your MySQL username
  password: '@Radhakrishna297',  // Change this to your MySQL password
  database: 'contact_db'
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to receive form data
app.post('/api/messages', (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // SQL query to insert data
  const sql = 'INSERT INTO messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())';
  
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Message saved successfully',
      id: result.insertId 
    });
  });
});

// API endpoint to get all messages (optional)
app.get('/api/messages', (req, res) => {
  const sql = 'SELECT * FROM messages ORDER BY created_at DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
