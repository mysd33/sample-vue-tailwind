import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 集約例外ハンドリングのエラーのストア
 */
export const useGlobalErrorStore = defineStore('globalError', () => {
  const error = ref<unknown>(null)

  /**
   * エラーを設定する
   * @param err
   */
  function setError(err: unknown) {
    error.value = err
  }
  /**
   * ストアをリセットする
   */
  function $reset() {
    error.value = null
  }

  return { error, setError, $reset }
})
