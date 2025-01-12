import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // ログイン画面
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      // メニュー画面
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/MenuView.vue'),
    },
    {
      // TODO管理画面
      path: '/todo',
      name: 'todo',
      component: () => import('@/views/TodoListView.vue'),
    },
    {
      // ユーザー管理画面
      path: '/users',
      name: 'users',
      component: () => import('@/views/UserListView.vue'),
    },
  ],
})

export default router
