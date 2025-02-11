import { defineStore, type StateTree } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/usecases/common/models/user'

/**
 * ユーザ情報の管理するStore
 */
export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User | null>(null)

    // ユーザ名を返す算出プロパティ
    const userName = computed((): string => {
      if (!user.value) {
        return ''
      }
      return `${user.value.lastName} ${user.value.firstName}`
    })

    // ログイン済みかどうかを返す算出プロパティ
    const isLoggedIn = computed((): boolean => {
      return !!user.value
    })

    // ログオフ時にユーザ情報をクリアするメソッド
    function clear() {
      user.value = null
    }

    return { user, userName, isLoggedIn, clear }
  },
  {
    // 永続化の設定
    persist: {
      storage: localStorage,
      // セッションストレージの場合
      // storage: sessionStorage,
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
