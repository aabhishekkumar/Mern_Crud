require('dotenv').config(); // must be at the top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import User model
const UserModel = require('./models/User');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Get all users
app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
app.post("/createUser", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(9000, () => {
  console.log('Server running on port 9000');
});
