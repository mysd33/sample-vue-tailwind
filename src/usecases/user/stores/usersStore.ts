import { computed, ref } from 'vue'
import type { User } from '@/usecases/common/models/user'
import { defineStore, type StateTree } from 'pinia'

/**
 * ユーザ情報を管理するダミーのStore
 *
 * 本来はサーバからデータを取得するが、ダミーデータとしてローカルストレージに保存する
 */
export const useUserDummyStore = defineStore(
  'users',
  () => {
    const users = ref<User[]>([])

    // IDが一致するユーザを取得
    const find = computed((userId) => {
      return users.value.find((u) => u.id === userId)
    })

    // ユーザを追加
    function add(user: User) {
      users.value.push(user)
    }

    // ユーザリストを追加
    function addList(newUsers: User[]) {
      users.value.push(...newUsers)
    }

    // ユーザを更新
    function update(user: User) {
      const index = users.value.findIndex((u) => u.id === user.id)
      if (index !== -1) {
        users.value[index] = user
      }
    }

    // ユーザを削除
    function remove(userId: string) {
      const index = users.value.findIndex((u) => u.id === userId)
      if (index !== -1) {
        users.value.splice(index, 1)
      }
    }

    return { users, find, add, addList, update, remove }
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
