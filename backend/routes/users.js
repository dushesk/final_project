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

module.exports = router;
