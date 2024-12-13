<template>
  <div id="app">
    <img src="../assets/main.png" alt="Main Image" class="main-image" />
    <img src="../assets/main1.png" alt="Logo" class="logo" />

    <!-- Информация о пользователе -->
    <div class="user-info">
      <p><strong>Name:</strong> {{ userName }}</p>
      <p><strong>Email:</strong> {{ userEmail }}</p>
    </div>

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
export default {
  name: 'App',
  data() {
    return {
      currentPage: 'home',
      newCategory: { name: '', description: '' },
      newExpense: { user_id: '', category_id: '', amount: '', date: '', description: '' },
      expenseIdToDelete: '',
      categories: [], // Массив для категорий
      expenses: [], // Массив для хранения расходов
      userName: 'Guest',
      userEmail: 'Not provided', // при входе на страницу они изменяются
    };
  },
  async created() {
    // Получить userId из localStorage при создании компонента
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        // Запрос к API для получения данных пользователя
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        
        // обновить данные пользователя
        this.userName = userData.name;
        this.userEmail = userData.email;
        
        // // Опционально можно сохранить в localStorage
        // localStorage.setItem('user_name', userData.name);
        // localStorage.setItem('user_email', userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
     }
    }
  },
  methods: {
    goToPage(page) {
      if (page === 'stats') {
        localStorage.removeItem('user_id');
        this.$router.push('/login');
      } else {
        this.currentPage = page;
      }
    },
    addCategory() {
      if (this.newCategory.name && this.newCategory.description) {
        const category = { ...this.newCategory, _id: Date.now().toString() };
        this.categories.push(category);
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
