const express = require('express');
const db = require('../db');

const router = express.Router();

// Добавление новой категории расходов
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await db.getDb().collection('categories').insertOne({ name, description });
    res.status(201).json({ message: 'Category created', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
