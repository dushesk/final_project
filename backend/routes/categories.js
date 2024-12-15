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

// Получение списка категорий - для списка в форме
router.get('/categories', async (req, res) => {
  try {
    // все категории из коллекции
    const categories = await db.getDb().collection('categories').find({}, { projection: { name: 1 } }).toArray();

    // Преобразование _id из ObjectId в строку и вернуть ид и название
    const formattedCategories = categories.map(category => ({
      _id: category._id.toString(), // Преобразование ObjectId в строку
      name: category.name,
    }));

    // Возвращение массива категорий
    res.status(200).json(formattedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
