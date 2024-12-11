const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Подключение к базе данных
const cors = require('cors'); // Импорт CORS - запуск фронт и бэк части одновременно

// Импорт маршрутов
const expensesRoutes = require('./routes/expenses');
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // URL фронтенда
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешённые методы
  credentials: true, // Для передачи cookies, если потребуется
}));
app.use(bodyParser.json());

// Подключение маршрутов
app.use('/expenses', expensesRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/auth', authRoutes);

// Запуск сервера
db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
  });
