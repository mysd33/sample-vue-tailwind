import { generateUUID } from '@/usecases/common/utils/idUtils'
import type { Todo } from '@/usecases/todo/models/todo'
import { useTodoDummyStore } from '@/usecases/todo/stores/todoStore'
import { http, HttpResponse } from 'msw'

// Piniaで保持するダミーのストアを利用
const todoDummyStore = useTodoDummyStore()

// MSWのHandlerを定義する
// https://mswjs.io/docs/basics/mocking-responses

// TODO: URLは仮置き
export const handlers = [
  // TODO: ログインAPIのモックを作成

  // TODO取得
  http.get<never, never, Todo>('/bff-api/v1/todo/:id', async ({ params }) => {
    const todo = todoDummyStore.todos.find((todo) => todo.id === params.id)
    return HttpResponse.json(todo ?? null)
  }),
  // TODO一覧の取得
  http.get<never, never, Todo[]>('/bff-api/v1/todo', async () => {
    return HttpResponse.json(todoDummyStore.todos)
  }),
  // TODOの登録
  http.post<never, Todo, never>('/bff-api/v1/todo', async ({ request }) => {
    const todo = (await request.json()) as Todo
    // 本来サーバ登録時に設定される値をクライアントでダミー値を設定
    todo.id = generateUUID()
    todo.finished = false
    todo.createAt = new Date()
    // スタブ実装として、piniaのローカルストレージのストアにTodoを追加
    todoDummyStore.add(todo)
    return HttpResponse.json(todo, { status: 201 })
  }),
  // TODOの完了
  http.put<never, Todo, never>('/bff-api/v1/todo', async ({ request }) => {
    const todo = (await request.json()) as Todo
    todoDummyStore.update(todo)
    return HttpResponse.json()
  }),
  // TODOの削除
  http.delete<never, never, never>('/bff-api/v1/todo/:id', async ({ params }) => {
    todoDummyStore.remove(params.id)
    return HttpResponse.json()
  }),
  // TODO: ユーザの一覧取得APIのモックを作成
  // TODO: ユーザの登録APIのモックを作成
  // TODO: ユーザの更新APIのモックを作成
  // TODO: ユーザの削除APIのモックを作成
]
