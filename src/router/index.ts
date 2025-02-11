import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'

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
      meta: { requiresAuth: true },
      component: () => import('@/views/MenuView.vue'),
    },
    {
      // TODO管理画面
      path: '/todo',
      name: 'todo',
      meta: { requiresAuth: true },
      component: () => import('@/views/TodoListView.vue'),
    },
    {
      // TODO一括登録
      path: '/todoFile/upload',
      name: 'todoFileUpload',
      meta: { requiresAuth: true },
      component: () => import('@/views/TodoFileUploadView.vue'),
    },
    {
      // ユーザー管理画面
      path: '/users',
      name: 'userList',
      meta: { requiresAuth: true },
      component: () => import('@/views/UserListView.vue'),
    },
    {
      // ユーザ登録画面
      path: '/newuser',
      name: 'newUser',
      meta: { requiresAuth: true },
      component: () => import('@/views/UserRegisterView.vue'),
    },
    {
      // ユーザ詳細画面
      path: '/users/:id',
      name: 'userDetail',
      meta: { requiresAuth: true },
      component: () => import('@/views/UserDetailView.vue'),
      props: (routes) => {
        return {
          id: routes.params.id,
        }
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  // ログイン画面に遷移しようとする場合に、ログイン済みの場合はメニュー画面に遷移する
  if (to.name === 'home') {
    const userStore = useUserStore()
    if (userStore.isLoggedIn) {
      next({ name: 'menu' })
    }
  }

  // ログインが必要な直接画面に遷移しようとする場合に、ログイン済みかどうかをチェックする
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userStore = useUserStore()
    if (!userStore.isLoggedIn) {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
