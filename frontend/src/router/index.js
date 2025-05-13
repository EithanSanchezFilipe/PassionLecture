import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '@/views/BookView.vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/book/:id',
      name: 'book-detail',
      component: BookView,
      props: true,
    },
    {
      path: '/category',
      name: 'book-all',
      component: CategoryView,
      props: true,
    },
  ],
})

export default router
