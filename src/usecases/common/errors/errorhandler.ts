import type { Router } from 'vue-router'
import { useGlobalErrorStore } from '@/usecases/common/stores/globalErrorStore'

/**
 * 集約例外エラーハンドラー
 * @param router - Vue Routerのインスタンス
 * @returns エラーハンドラー関数
 */
function globalErrorHandler(router: Router) {
  return (err: unknown) => {
    console.error('グローバルエラー:', err)
    const globalErrorStore = useGlobalErrorStore()
    // グローバルエラー用のストアにエラーをセット
    globalErrorStore.setError(err)

    // エラーページに遷移
    router.push({
      name: 'error',
    })
  }
}

export default globalErrorHandler
