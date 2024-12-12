<template>
  <div id="app">
    <img src="../assets/main.png" alt="Main Image" class="main-image" />
    <img src="../assets/main1.png" alt="Logo" class="logo" />

    <div class="navbar">
      <a href="#" @click.prevent="goToPage('home')">Home</a>
      <a href="#" @click.prevent="goToPage('stats')">Statistics</a>
    </div>

    <div class="container">
      <div v-if="currentPage === 'home'" class="main-page">
        <h1>Welcome to Financial Tracker</h1>
        <p class="info-text">
          This service allows you to track your expenses and see your spending patterns.
        </p>

        <!-- Forms to add and delete categories/expenses -->
        <!-- Form code here remains the same -->
      </div>

      <div v-if="currentPage === 'stats'" class="stats-page">
        <h2>Expense Statistics</h2>
        <p>Statistics content will be displayed here.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentPage: 'home',
      newCategory: { name: '', description: '' },
      newExpense: { user_id: '', category_id: '', amount: '', date: '', description: '' },
      expenseIdToDelete: '',
      categories: [],
      expenses: [] // Массив для хранения расходов
    };
  },
  methods: {
    goToPage(page) {
      if (page === 'stats') {
        // Удаляем user_id из localStorage при переходе на страницу статистики
        localStorage.removeItem('user_id');

        // Перенаправляем на страницу входа (LoginRegister.vue)
        this.$router.push('/login'); // Используйте правильный путь для вашего компонента
      } else {
        this.currentPage = page;
      }
    },

    addCategory() {
      if (this.newCategory.name && this.newCategory.description) {
        this.categories.push({ ...this.newCategory, _id: Date.now().toString() });
        this.newCategory = { name: '', description: '' };
      }
    },
    addExpense() {
      if (this.newExpense.user_id && this.newExpense.category_id && this.newExpense.amount && this.newExpense.date) {
        this.expenses.push({ ...this.newExpense, _id: Date.now().toString() });
        alert('Expense added successfully!');
        this.newExpense = { user_id: '', category_id: '', amount: '', date: '', description: '' };
      }
    },
    deleteExpense() {
      const index = this.expenses.findIndex(expense => expense._id === this.expenseIdToDelete);
      if (index !== -1) {
        this.expenses.splice(index, 1);
        alert('Expense deleted successfully!');
        this.expenseIdToDelete = '';
      } else {
        alert('Expense not found!');
      }
    }
  }
};
</script>

<style scoped src="../styles/home.css">
</style>
