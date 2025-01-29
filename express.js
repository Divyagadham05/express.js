const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Mock database (Replace this with a real database)
const users = [];

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user (In a real app, save to a database)
        users.push({ name, email, password: hashedPassword });

        res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
});

// Start server
app.listen(PORT, () => console.log(Server running on port ${PORT}));