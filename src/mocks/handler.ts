import type { Todo } from '@/usecases/todo/models/todo'
import { http, HttpResponse } from 'msw'

// MSWのHandlerを定義する
// https://mswjs.io/docs/basics/mocking-responses

export const handlers = [
  // TODO: URLは仮置き、サーバレスのサンプルAPのAPIをベースで作成
  // TODO: ログインAPIのモックを作成
  http.get<never, never, Todo[]>('/bf-api/v1/todo', async () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'ミルクを買う',
        finished: false,
        createAt: new Date('2023-01-01T00:00:00Z'),
      },
      {
        id: '2',
        title: '新聞を読む',
        finished: false,
        createAt: new Date('2023-01-01T00:00:00Z'),
      },
    ])
  }),
  // TODO: TODOの登録APIのモックを作成
  // TODO: TODOの完了APIのモックを作成
  // TODO: TODOの削除APIのモックを作成
  // TODO: ユーザの一覧取得APIのモックを作成
  // TODO: ユーザの登録APIのモックを作成
  // TODO: ユーザの更新APIのモックを作成
  // TODO: ユーザの削除APIのモックを作成
]
