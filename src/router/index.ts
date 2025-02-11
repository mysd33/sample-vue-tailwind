import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // ホーム画面（ログイン画面）
      path: '/',
      name: 'home',
      // ログイン未済でアクセスしてよい画面
      meta: { allowsNotAuth: true },
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

router.beforeEach((to, from, next) => {
  // ログイン画面に遷移しようとする場合に、ログイン済みの場合はメニュー画面に遷移する
  if (to.name === 'home') {
    const userStore = useUserStore()
    if (userStore.isLoggedIn) {
      next({ name: 'menu' })
    }
  }

  // ログイン要の画面に直遷移しようとする場合に、ログイン済みかどうかをチェックする
  if (!to.meta.allowsNotAuth) {
    const userStore = useUserStore()
    if (!userStore.isLoggedIn) {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
