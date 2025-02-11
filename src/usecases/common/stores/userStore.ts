import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/models/user'

// TODO: セッションストレージ等への永続化の実装

export const useUserStore = defineStore('user', () => {
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

  return { user, userName, isLoggedIn }
})
