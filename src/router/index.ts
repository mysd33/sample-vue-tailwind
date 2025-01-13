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
      // TODO一括登録
      path: '/todoFile/upload',
      name: 'todoFileUpload',
      component: () => import('@/views/TodoFileUploadView.vue'),
    },
    {
      // ユーザー管理画面
      path: '/users',
      name: 'userList',
      component: () => import('@/views/UserListView.vue'),
    },
    {
      // ユーザ登録画面
      path: '/newuser',
      name: 'newUser',
      component: () => import('@/views/UserRegisterView.vue'),
    },
    {
      // ユーザ詳細画面
      path: '/users/:id',
      name: 'userDetail',
      component: () => import('@/views/UserDetailView.vue'),
      props: (routes) => {
        return {
          id: routes.params.id,
        }
      },
    },
  ],
})

export default router
