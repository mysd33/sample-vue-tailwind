import { setup, type Preview } from '@storybook/vue3'
import '@/style.css'
import { createPinia } from 'pinia'
import { App } from 'vue'
import { configure } from 'vee-validate'
import { setLocale } from 'yup'
import * as ja from '@/usecases/common/messages/validationMessages'
import { useUserDummyStore } from '@/usecases/common/stores/usersStore'
import { useAuthenticationStore } from '@/usecases/common/stores/authenticationStore'
import { initialize, mswLoader } from 'msw-storybook-addon'

// Piniaの有効化
const pinia = createPinia()

// MSWの初期化
initialize({
  onUnhandledRequest: 'bypass',
})

setup(async (app: App) => {
  app.use(pinia)

  // VeeValidateのエラーのグローバル設定
  configure({
    validateOnModelUpdate: false,
  })

  // yupの入力エラーメッセージの日本語化
  setLocale(ja.messages)

  // スタブ実装として、以下のユーザデータを初期登録する
  const usersDummyStore = useUserDummyStore()
  usersDummyStore.init()
  // スタブ実装として、以下のログイン済みデータを初期登録する
  const authStore = useAuthenticationStore()
  authStore.user = usersDummyStore.users[0]
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
