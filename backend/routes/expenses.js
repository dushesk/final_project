const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../db');

const router = express.Router();

// Создание нового расхода по ид пользователя
router.post('/', async (req, res) => {
  try {
    const { user_id, category_id, amount, date, description } = req.body;
    const result = await db.getDb().collection('expenses').insertOne({
      user_id: new ObjectId(user_id),
      category_id: new ObjectId(category_id),
      amount,
      date: new Date(date),
      description,
    });
    res.status(201).json({ message: 'Expense created', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Удаление расхода
router.delete('/deleteexpense/:id', async (req, res) => {
  try {
    const expenseId = req.params.id; // Получение ID из параметров маршрута
    const result = await db.getDb().collection('expenses').deleteOne({ _id: new ObjectId(expenseId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Expense not found' }); // Если расход не найден
    }

    res.json({ message: 'Expense deleted successfully' }); // Успешное удаление
  } catch (error) {
    res.status(500).json({ error: error.message }); // Ошибка сервера
  }
});


// Обновление расхода
router.put('/:id', async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { description } = req.body;
    const result = await db.getDb().collection('expenses').updateOne(
      { _id: new ObjectId(expenseId) },
      { $set: { description } }
    );
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Expense not found' });
    } else {
      res.json({ message: 'Expense updated' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение суммарных расходов по категориям
router.get('/summary', async (req, res) => {
  try {
    const summary = await db.getDb().collection('expenses')
      .aggregate([
        {
          $group: {
            _id: '$category_id',
            totalAmount: { $sum: '$amount' },
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
      ])
      .toArray();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
