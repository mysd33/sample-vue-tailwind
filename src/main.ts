import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/style.css'
import { setLocale } from 'yup'
import * as ja from '@/usecases/common/validation/validation_messages_ja'
import { configure } from 'vee-validate'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// VeeValidateのエラーのグローバル設定
configure({
  validateOnModelUpdate: false,
})
// yupの入力エラーメッセージの日本語化
setLocale(ja.messages)

app.mount('#app')
