const express = require('express');
const db = require('../db');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Логируем полученные данные
      console.log('Registration data:', { name, email, password });
  
      const existingUser = await db.getDb().collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      const result = await db.getDb().collection('users').insertOne({
        name,
        email,
        password, // хранить пароль как текст плохо, извините
      });
  
      console.log('User registered with ID:', result.insertedId);
  
      res.status(201).json({ message: 'User registered', userId: result.insertedId });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Login Route
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Логируем данные логина
      console.log('Login data:', { email, password });
  
      const user = await db.getDb().collection('users').findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      console.log('Login successful for user ID:', user._id);
  
      res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
