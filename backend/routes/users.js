const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../db');

const router = express.Router();

// Получение расходов пользователя с категориями
router.get('/:id/expenses', async (req, res) => {
  try {
    const userId = req.params.id;
    const expenses = await db.getDb().collection('expenses')
      .aggregate([
        { $match: { user_id: new ObjectId(userId) } },
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
      ])
      .toArray();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение данных пользователя по ID - 1 сервер
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.getDb().collection('users')
      .findOne(
        { _id: new ObjectId(userId) },
        { projection: { name: 1, email: 1 } } // выбрать только name и email
      );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение email пользователей по началу имени - 2 сервис
router.get('/emails/startswith/:prefix', async (req, res) => {
  try {
    const prefix = req.params.prefix;
    const users = await db.getDb().collection('users')
      .find(
        { name: { $regex: `^${prefix}`, $options: 'i' } }, // i для регистронезависимого поиска
        { projection: { email: 1 } }
      )
      .toArray();
    
    const emails = users.map(user => user.email);
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение списка покупок пользователя по его user_id
router.get('/expenses/:id/info', async (req, res) => {
  try {
    const userId = req.params.id;

    // Запрос с фильтром по user_id и проекцией для amount, description и date
    const expenses = await db.getDb().collection('expenses')
      .find(
        { user_id: new ObjectId(userId) },
        { projection: { amount: 1, description: 1, date: 1, _id: 0 } }
      )
      .toArray();

    // Проверка на наличие данных
    if (expenses.length === 0) {
      return res.status(404).json({ message: 'No expenses found for this user' });
    }

    // Возврат данных
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
