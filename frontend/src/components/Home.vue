<template> 
  <div id="app">
    <img src="../assets/main.png" alt="Main Image" class="main-image" />
    <img src="../assets/main1.png" alt="Logo" class="logo" />

    <div class="navbar">
      <a href="#" @click.prevent="currentPage = 'home'">Home</a>
      <a href="#" @click.prevent="currentPage = 'stats'">Statistics</a>
    </div>

    <div class="container">
      <div v-if="currentPage === 'home'" class="main-page">
        <h1>Welcome to Financial Tracker</h1>
        <p class="info-text">
          This service allows you to track your expenses and see your spending patterns.
        </p>

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

        <div class="form-container">
          <form @submit.prevent="addExpense">
            <div>
              <label for="userId">User ID</label>
              <input type="text" id="userId" v-model="newExpense.user_id" required />
            </div>
            <div>
              <label for="categoryInput">Category</label>
              <input
                type="text"
                id="categoryInput"
                v-model="newExpense.category_id"
                required
                placeholder="Enter category name"
              />
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
      categories: [],
      expenses: [] // Массив для хранения расходов
    };
  },
  methods: {
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
