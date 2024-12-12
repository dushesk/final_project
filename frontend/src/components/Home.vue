<template>
  <div id="app">
    <img src="../assets/main.png" alt="Main Image" class="main-image" />
    <img src="../assets/main1.png" alt="Logo" class="logo" />

    <div class="navbar">
      <a href="#" @click.prevent="goToPage('home')">Home</a>
      <a href="#" @click.prevent="goToPage('stats')">Exit</a>
    </div>

    <div class="container">
      <div v-if="currentPage === 'home'" class="main-page">
        <h1>Welcome to Financial Tracker</h1>
        <p class="info-text">
          This service allows you to track your expenses and see your spending patterns.
        </p>

        <!-- Форма для добавления категории -->
        <div class="form-container">
          <form @submit.prevent="addCategory">
            <div>
              <label for="categoryName">Category Name</label>
              <input type="text" id="categoryName" v-model="newCategory.name" required />
            </div>
            <div>
              <label for="categoryDescription">Description</label>
              <input type="text" id="categoryDescription" v-model="newCategory.description" required />
            </div>
            <button type="submit">Add Category</button>
          </form>
        </div>

        <!-- Форма для добавления расхода -->
        <div class="form-container">
          <form @submit.prevent="addExpense">
            <div>
              <label for="userId">User ID</label>
              <input type="text" id="userId" v-model="newExpense.user_id" required />
            </div>
            <div>
              <label for="categoryInput">Category</label>
              <!-- Селектор для выбора категории по ID -->
              <select v-model="newExpense.category_id" required>
                <option value="" disabled>Select Category</option>
                <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="amount">Amount</label>
              <input type="number" id="amount" v-model="newExpense.amount" required />
            </div>
            <div>
              <label for="date">Date</label>
              <input type="date" id="date" v-model="newExpense.date" required />
            </div>
            <div>
              <label for="expenseDescription">Description</label>
              <input type="text" id="expenseDescription" v-model="newExpense.description" required />
            </div>
            <button type="submit">Add Expense</button>
          </form>
        </div>

        <!-- Форма для удаления расхода -->
        <div class="form-container">
          <form @submit.prevent="deleteExpense">
            <div>
              <label for="expenseId">Expense ID</label>
              <input type="text" id="expenseId" v-model="expenseIdToDelete" required />
            </div>
            <button type="submit">Delete Expense</button>
          </form>
        </div>
      </div>

      <div v-if="currentPage === 'stats'" class="stats-page">
        <h2>Expense Statistics</h2>
        <p>Statistics content will be displayed here.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Импортируем Axios

export default {
  name: 'App',
  data() {
    return {
      currentPage: 'home',
      newCategory: { name: '', description: '' },
      newExpense: { user_id: '', category_id: '', amount: '', date: '', description: '' },
      expenseIdToDelete: '',
      categories: [], // Массив для категорий
      expenses: [] // Массив для хранения расходов
    };
  },
  methods: {
    goToPage(page) {
      if (page === 'stats') {
        localStorage.removeItem('userId');
        this.$router.push('/login');
      } else {
        this.currentPage = page;
      }
    },

    // Метод добавления новой категории
    async addCategory() {
      if (this.newCategory.name && this.newCategory.description) {
        try {
          const response = await axios.post('http://localhost:3000/categories/', this.newCategory);
          this.categories.push({ ...this.newCategory, _id: response.data.id });
          this.newCategory = { name: '', description: '' };
          alert('Категория успешно добавлена!');
        } catch (error) {
          console.error('Ошибка добавления категории:', error.message);
          alert('Не удалось добавить категорию.');
        }
      }
    },

    // Метод добавления расхода
    async addExpense() {
      if (this.newExpense.user_id && this.newExpense.category_id && this.newExpense.amount && this.newExpense.date) {
        try {
          const response = await axios.post('http://localhost:3000/expenses/', this.newExpense);
          this.expenses.push({ ...this.newExpense, _id: response.data.id });
          alert('Расход успешно добавлен!');
          this.newExpense = { user_id: '', category_id: '', amount: '', date: '', description: '' };
        } catch (error) {
          console.error('Ошибка добавления расхода:', error.message);
          alert('Не удалось добавить расход.');
        }
      }
    },

    // Метод удаления расхода
    async deleteExpense() {
      try {
        await axios.delete(`http://localhost:3000/expenses/deleteexpense/${this.expenseIdToDelete}`);
        this.expenses = this.expenses.filter(expense => expense._id !== this.expenseIdToDelete);
        alert('Расход успешно удалён!');
        this.expenseIdToDelete = '';
      } catch (error) {
        console.error('Ошибка удаления расхода:', error.message);
        alert('Не удалось удалить расход.');
      }
    }
  }
};
</script>

<style scoped src="../styles/home.css">
</style>
