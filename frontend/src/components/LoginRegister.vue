<template>
  <div class="container">
    <img src="@/assets/reg.png" alt="Registration" class="banner" />
    <h1>Your money, your rules</h1>
    <div class="buttons">
      <button class="btn" @click="showLoginModal = true">Login</button>
      <button class="btn" @click="showRegisterModal = true">Register</button>
    </div>
    
    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" v-model="loginEmail" placeholder="Enter your email" required />
          <label for="login-password">Password</label>
          <input type="password" id="login-password" v-model="loginPassword" placeholder="Enter your password" required />
          <button type="submit" class="btn">Login</button>
        </form>
      </div>
    </div>

    <!-- Register Modal -->
    <div v-if="showRegisterModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Register</h2>
        <form @submit.prevent="register">
          <label for="register-name">Name</label>
          <input type="name" id="register-name" v-model="registerName" placeholder="Enter your name" required />
          <label for="register-email">Email</label>
          <input type="email" id="register-email" v-model="registerEmail" placeholder="Enter your email" required />
          <label for="register-password">Password</label>
          <input type="password" id="register-password" v-model="registerPassword" placeholder="Enter your password" required />
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Enter your password again" required />
          <button type="submit" class="btn">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "LoginRegister",
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      loginEmail: '',
      loginPassword: '',
      registerEmail: '',
      registerPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    closeModal() {
      this.showLoginModal = false;
      this.showRegisterModal = false;
      this.errorMessage = '';
    },
    async login() {
      try {
        console.log('Attempting login...');
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.loginEmail,
          password: this.loginPassword,
        });
        console.log('Login response:', response.data);
        if (response.data.userId) {
          localStorage.setItem('userId', response.data.userId);
          this.closeModal();
          this.$router.push('/home');
        } else {
          console.error('No userId in response.');
        }
      } catch (error) {
        console.error('Login error:', error.response || error);
        this.errorMessage = error.response?.data?.message || 'Login failed.';
      }
    },
    async register() {
      // Проверка совпадения паролей
      if (this.registerPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      // Проверка обязательных полей (например, имени)
      if (!this.registerEmail || !this.registerPassword || !this.registerName) {
        this.errorMessage = 'All fields are required.';
        return;
      }

      try {
        // Запрос на регистрацию
        const response = await axios.post('http://localhost:3000/auth/register', {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword,
        });

        // Сохранение userId в localStorage
        localStorage.setItem('userId', response.data.userId);

        // Перенаправление на домашнюю страницу
        this.$router.push('/home');
      } catch (error) {
        // Логика обработки ошибок
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message; // Сообщение из API
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    },
  },  
};
</script>

<style scoped src="../styles/loginRegister.css">
</style>
