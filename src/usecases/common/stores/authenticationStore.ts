import type { User } from '@/usecases/common/models/user'
import { defineStore, type StateTree } from 'pinia'
import { computed, ref } from 'vue'

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
    // TODO: 型定義の問題を回避する最善の方法を検討
    // @ts-ignore: persistのプロパティが認識できない型定義問題を回避
    persist: {
      storage: localStorage,
      // セッションストレージの場合
      // storage: sessionStorage,

      // 開発者ツール上、すぐにユーザ情報を見たい場合はコメントアウトするとよい
      serializer: {
        deserialize: (value: string): StateTree => {
          // Base64デコードして復号化
          const rawData = atob(value)
          return JSON.parse(decodeURIComponent(rawData))
        },
        // @ts-ignore: データ型を定義できないため回避
        serialize: (value): string => {
          const rawData = JSON.stringify(value)
          // Base64エンコードして、開発者ツール上、ユーザ情報を難読化
          return btoa(encodeURIComponent(rawData))
        },
      },
    },
  },
)
