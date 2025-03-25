import { computed, ref } from 'vue'
import type { Todo } from '@/usecases/todo/models/todo'
import { defineStore } from 'pinia'

/**
 * TODOリストを管理するダミーのStore
 *
 * 本来はサーバからデータを取得するが、ダミーデータとしてローカルストレージに保存する
 */
export const useTodoDummyStore = defineStore(
  'todo',
  () => {
    const todos = ref<Todo[]>([])

    // IDが一致するTODOを取得
    const find = computed((todoId) => {
      return todos.value.find((t) => t.id === todoId)
    })

    // TODOを追加
    function add(todo: Todo) {
      // 既に存在する場合は更新
      const index = todos.value.findIndex((t) => t.id === todo.id)
      if (index !== -1) {
        todos.value[index] = todo
        return
      }
      todos.value.push(todo)
    }

    // TODOリストを追加
    function addList(newTodos: Todo[]) {
      newTodos.forEach((todo) => {
        add(todo)
      })
    }

    // TODOを更新
    function update(todo: Todo) {
      const index = todos.value.findIndex((t) => t.id === todo.id)
      if (index !== -1) {
        todos.value[index] = todo
      }
    }

    // TODOを削除
    function remove(todoId: string) {
      const index = todos.value.findIndex((t) => t.id === todoId)
      if (index !== -1) {
        todos.value = todos.value.filter((t) => t.id !== todoId)
      }
    }

    return { todos, find, add, addList, update, remove }
  },
  {
    // 永続化の設定（ローカルストレージ）
    persist: true,
  },
)
