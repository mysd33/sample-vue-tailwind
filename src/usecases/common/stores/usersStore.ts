import { ref } from 'vue'
import type { User } from '@/usecases/common/models/User'
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
    function find(userId: string): User | undefined {
      return users.value.find((u) => u.id === userId)
    }

    // ユーザを追加
    function add(user: User) {
      // 既に存在する場合は更新
      const index = users.value.findIndex((u) => u.id === user.id)
      if (index !== -1) {
        users.value[index] = user
        return
      }
      users.value.push(user)
    }

    // ユーザリストを追加
    function addList(newUsers: User[]) {
      newUsers.forEach((user) => {
        add(user)
      })
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
        users.value = users.value.filter((u) => u.id !== userId)
      }
    }

    // スタブ実装として初期データを設定
    function init() {
      users.value = [
        {
          id: 'yamada@xxx.co.jp',
          name: '山田太郎',
          birthday: new Date('1990-01-01'),
          password: 'password',
          isAdmin: true,
        },
        {
          id: 'tamura@xxx.co.jp',
          name: '田村一郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura2@xxx.co.jp',
          name: '田村二郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura3@xxx.co.jp',
          name: '田村三郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura4@xxx.co.jp',
          name: '田村四郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura5@xxx.co.jp',
          name: '田村五郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura6@xxx.co.jp',
          name: '田村六郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura7@xxx.co.jp',
          name: '田村七郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura8@xxx.co.jp',
          name: '田村八郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura9@xxx.co.jp',
          name: '田村九郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura10@xxx.co.jp',
          name: '田村十郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'yamada2@xxx.co.jp',
          name: '山田太郎',
          birthday: new Date('1990-01-01'),
          password: 'password',
          isAdmin: true,
        },
        {
          id: 'tamura11@xxx.co.jp',
          name: '田村一郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura12@xxx.co.jp',
          name: '田村二郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura13@xxx.co.jp',
          name: '田村三郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura14@xxx.co.jp',
          name: '田村四郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura15@xxx.co.jp',
          name: '田村五郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura16@xxx.co.jp',
          name: '田村六郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura17@xxx.co.jp',
          name: '田村七郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura18@xxx.co.jp',
          name: '田村八郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura19@xxx.co.jp',
          name: '田村九郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura20@xxx.co.jp',
          name: '田村十郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'yamada3@xxx.co.jp',
          name: '山田太郎',
          birthday: new Date('1990-01-01'),
          password: 'password',
          isAdmin: true,
        },
        {
          id: 'tamura21@xxx.co.jp',
          name: '田村一郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura22@xxx.co.jp',
          name: '田村二郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura23@xxx.co.jp',
          name: '田村三郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura24@xxx.co.jp',
          name: '田村四郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura25@xxx.co.jp',
          name: '田村五郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura26@xxx.co.jp',
          name: '田村六郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura27@xxx.co.jp',
          name: '田村七郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura28@xxx.co.jp',
          name: '田村八郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura29@xxx.co.jp',
          name: '田村九郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
        {
          id: 'tamura20@xxx.co.jp',
          name: '田村十郎',
          birthday: new Date('1986-11-05'),
          password: 'password',
          isAdmin: false,
        },
      ]
    }
    return { users, find, add, addList, update, remove, init }
  },
  {
    // 永続化の設定
    persist: {
      storage: localStorage,
      // セッションストレージの場合
      // storage: sessionStorage,

      // 開発者ツール上、すぐにユーザ情報を見たい場合はコメントアウトするとよい
      /*
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
      },*/
    },
  },
)
