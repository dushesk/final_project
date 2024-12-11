<template>
  <div id="app">
    <!-- Основное содержимое -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

body {
    font-family: 'Quicksand', sans-serif;
    margin: 0;
    padding: 0;
    background: linear-gradient(to right, #a0c4ff, #e0f7fa);
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
</style>
