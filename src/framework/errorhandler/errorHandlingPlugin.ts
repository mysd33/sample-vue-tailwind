import type { Pinia } from 'pinia'
import type { App } from 'vue'
import type { Router } from 'vue-router'
import { FrameworkMessageIds, MessageManager } from '../messages'
import { useGlobalErrorStore } from './globalErrorStore'
import { CodableError, SystemError } from '../errors'

// 集約例外ハンドリング機能を組み込むVueのプラグイン
// https://vuejs.org/guide/reusability/plugins
export const errorHandlingPlugin = {
  install: (
    app: App<Element>,
    options: {
      customGlobalErrorHandler: (err: unknown, router: Router) => void
      router: Router
      pinia: Pinia
    },
  ) => {
    const { customGlobalErrorHandler, router, pinia } = options
    // Vue.jsのエラーをハンドリングするためのグローバルなエラーハンドラを設定
    app.config.errorHandler = (err: unknown) => {
      handler(err, customGlobalErrorHandler, router, pinia)
    }
    // Vue.js以外のエラーもハンドリングするためのグローバルなエラーハンドラを設定
    window.addEventListener('error', (event) => {
      handler(event.error, customGlobalErrorHandler, router, pinia)
    })
    // Promiseでのrejectをハンドリングするためのグローバルなエラーハンドラを設定
    window.addEventListener('unhandledrejection', (event) => {
      handler(event.reason, customGlobalErrorHandler, router, pinia)
    })
  },
}

const handler = (
  err: unknown,
  customGlobalErrorHandler: (err: unknown, router: Router) => void,
  router: Router,
  pinia: Pinia,
) => {
  console.error(MessageManager.getMessage(FrameworkMessageIds.E_FW_9001), err)

  // エラーの情報をストアに保存
  const globalErrorStore = useGlobalErrorStore(pinia)
  if (err instanceof CodableError) {
    globalErrorStore.setError(err)
  } else {
    globalErrorStore.setError(
      new SystemError(
        FrameworkMessageIds.E_FW_9001,
        MessageManager.getMessage(FrameworkMessageIds.E_FW_9001),
      ),
    )
  }
  // 業務APのカスタムエラーハンドラを呼び出す
  customGlobalErrorHandler(err, router)
}
