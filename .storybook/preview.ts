import { setup, type Preview } from '@storybook/vue3'
import '@/style.css'
import { createPinia } from 'pinia'
import { App } from 'vue'
import { configure } from 'vee-validate'
import { setLocale } from 'yup'
import * as ja from '@/usecases/common/validation/validation_messages_ja'

// Piniaの有効化
const pinia = createPinia()
setup((app: App) => {
  app.use(pinia)

  // VeeValidateのエラーのグローバル設定
  configure({
    validateOnModelUpdate: false,
  })

  // yupの入力エラーメッセージの日本語化
  setLocale(ja.messages)
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
}

export default preview
