import { defineStore, type StateTree } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/usecases/common/models/user'

/**
 * ログイン済ユーザの認証情報を管理するStore
 */
export const useAuthenticationStore = defineStore(
  'authentication',
  () => {
    const user = ref<User | null>(null)

    // ログイン済みかどうかを返す算出プロパティ
    const isLoggedIn = computed((): boolean => {
      return !!user.value
    })

    // ログオフ時にユーザ情報をクリアするメソッド
    function clear() {
      user.value = null
    }

    return { user, isLoggedIn, clear }
  },
  {
    // 永続化の設定
    persist: {
      storage: localStorage,
      // セッションストレージの場合
      // storage: sessionStorage,

      // 開発者ツール上、すぐにユーザ情報を見たい場合はコメントアウトするとよい
      serializer: {
        deserialize: (value): StateTree => {
          // Base64デコードして復号化
          const rawData = atob(value)
          return JSON.parse(decodeURIComponent(rawData))
        },
        serialize: (value): string => {
          const rawData = JSON.stringify(value)
          // Base64エンコードして、開発者ツール上、ユーザ情報を難読化
          return btoa(encodeURIComponent(rawData))
        },
      },
    },
  },
)
