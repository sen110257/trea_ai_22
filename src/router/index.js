import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Quiz from '@/views/Quiz.vue'
import Result from '@/views/Result.vue'
import History from '@/views/History.vue'
import Poster from '@/views/Poster.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/quiz/:category',
    name: 'Quiz',
    component: Quiz,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/poster',
    name: 'Poster',
    component: Poster,
    meta: {
      transition: 'fade'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
