import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/style.css'
import { setLocale } from 'yup'
import * as ja from '@/usecases/common/validation/validation_messages_ja'
import { configure } from 'vee-validate'

const app = createApp(App)

// Piniaの設定
const pinia = createPinia()
// Pinia Plugin Persistedstateプラグインの設定
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// ViewRouterの設定
app.use(router)

// VeeValidateのエラーのグローバル設定
configure({
  validateOnModelUpdate: false,
})
// yupの入力エラーメッセージの日本語化
setLocale(ja.messages)

app.mount('#app')
