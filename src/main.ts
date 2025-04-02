import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/style.css'
import { setLocale } from 'yup'
import * as ja from '@/usecases/common/messages/validationMessages'
import { configure } from 'vee-validate'
import globalErrorHandler from '@/usecases/common/errors/errorhandler'

const app = createApp(App)

// Piniaの設定
const pinia = createPinia()
// Pinia Plugin Persistedstateプラグインの設定
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// ViewRouterの設定
app.use(router)

// 集約例外ハンドリング
app.config.errorHandler = globalErrorHandler(router)

// VeeValidateのエラーのグローバル設定
configure({
  validateOnModelUpdate: false,
})
// yupの入力エラーメッセージの日本語化
setLocale(ja.messages)

// MSWの有効化
// https://mswjs.io/docs/integrations/browser#conditionally-enable-mocking
async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }
  const { worker } = await import('@/mocks/worker')
  // Service Workerの起動
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}
enableMocking().then(() => {
  // APの起動
  app.mount('#app')
})
