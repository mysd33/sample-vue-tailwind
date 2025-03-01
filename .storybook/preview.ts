import { setup, type Preview } from '@storybook/vue3'
import '@/style.css'
import { createPinia } from 'pinia'
import { App } from 'vue'
import { configure } from 'vee-validate'

// Piniaの有効化
const pinia = createPinia()
setup((app: App) => {
  app.use(pinia)

  // VeeValidateのエラーのグローバル設定
  configure({
    validateOnModelUpdate: false,
  })
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
