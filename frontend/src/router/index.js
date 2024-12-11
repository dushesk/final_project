import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import LoginRegister from '../components/LoginRegister.vue'

const routes = [
    { path: '/home', component: Home },
    { path: '/login', component: LoginRegister },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
