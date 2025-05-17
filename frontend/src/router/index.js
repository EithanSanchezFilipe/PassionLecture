import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '@/views/BookView.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import CategoryView from '@/views/CategoryView.vue'
import AddBookView from '@/views/AddBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: BookView,
      props: true,
    },
    {
      path: '/book',
      name: 'Book',
      component: AddBookView,
      props: true,
    },
    {
      path: '/category',
      name: 'Category',
      component: CategoryView,
      props: true,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/book-filter',
      name: 'book-filter',
      component: () => import('@/views/BookFilter.vue')
    },
  ],
})

export default router
