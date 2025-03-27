import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from '@/usecases/common/stores/authenticationStore'
import LoginView from '@/usecases/login/views/LoginView.vue'
import { AuthenticationServiceImpl } from '@/usecases/login/services/authenticationService'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

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
      component: () => import('@/usecases/login/views/MenuView.vue'),
    },
    {
      // TODO管理画面
      path: '/todo',
      name: 'todo',
      component: () => import('@/usecases/todo/views/TodoListView.vue'),
    },
    {
      // TODO一括登録
      path: '/todoFile/upload',
      name: 'todoFileUpload',
      component: () => import('@/usecases/todo/views/TodoFileUploadView.vue'),
    },
    {
      // ユーザー管理画面
      path: '/users',
      name: 'userList',
      component: () => import('@/usecases/user/views/UserListView.vue'),
    },
    {
      // ユーザ登録画面
      path: '/newuser',
      name: 'newUser',
      component: () => import('@/usecases/user/views/UserRegisterView.vue'),
    },
    {
      // ユーザ詳細画面
      path: '/users/:id',
      name: 'userDetail',
      component: () => import('@/usecases/user/views/UserDetailView.vue'),
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
    const authenticationStore = useAuthenticationStore()
    if (authenticationStore.isLoggedIn) {
      next({ name: 'menu' })
      return
    }
  }

  // ログイン要の画面に直遷移しようとする場合に、ログイン済みかどうかをチェックする
  if (!to.meta.allowsNotAuth) {
    const authenticationStore = useAuthenticationStore()
    if (!authenticationStore.isLoggedIn) {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
