import type { Router } from 'vue-router'

/**
 * 集約例外エラーハンドラー
 * @param router - Vue Routerのインスタンス
 * @returns エラーハンドラー関数
 */
function globalErrorHandler(err: unknown, router: Router) {
  // TODO: エラーの種類に応じた画面遷移処理を実装する

  // システムエラー用のエラーページに遷移
  router.push({
    name: 'error',
  })
}

export default globalErrorHandler
