import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { generateUUID } from '@/usecases/common/utils/idUtils'
import TodoListView from '@/usecases/todo/views/TodoListView.vue'
import { http, HttpResponse, type PathParams } from 'msw'
import type { Todo } from '../models/todo'

const todoList: Todo[] = [
  {
    id: generateUUID(),
    title: 'ミルクを買う',
    finished: false,
    createAt: new Date(),
  },
  {
    id: generateUUID(),
    title: '新聞を読む',
    finished: true,
    createAt: new Date(),
  },
  {
    id: generateUUID(),
    title: '掃除をする',
    finished: false,
    createAt: new Date(),
  },
]

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof TodoListView> = {
  component: TodoListView,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get<PathParams, never, Todo>('/bff-api/v1/todo/:id', async ({ params }) => {
          const id = params.id
          const todo = todoList.find((todo) => todo.id === id)
          if (todo) {
            return HttpResponse.json(todo)
          }
          return HttpResponse.json(null, { status: 404 })
        }),
        http.get<never, never, Todo[]>('/bff-api/v1/todo', async () => {
          return HttpResponse.json(todoList)
        }),
        http.post<never, Todo, never>('/bff-api/v1/todo', async ({ request }) => {
          const todo = (await request.json()) as Todo
          // bizerrorの時は、業務エラーのレスポンスを返す
          if (todo.title === 'bizerror') {
            return HttpResponse.json(
              {
                code: 'w.ex.5001',
                message: 'TODOのタイトルが不正です。',
              },
              { status: 400 },
            )
          }
          // syserrorの時は、システムエラーのレスポンスを返す
          if (todo.title === 'syserror') {
            return HttpResponse.json(
              {
                code: 'e.ex.9002',
                message: 'TODOサービスでシステムエラーが発生しました。',
              },
              { status: 500 },
            )
          }
          todo.id = generateUUID()
          todo.finished = false
          todo.createAt = new Date()
          todoList.push(todo)
          return HttpResponse.json(todo, { status: 201 })
        }),
        http.put<never, Todo, never>('/bff-api/v1/todo', async ({ request }) => {
          const todo = (await request.json()) as Todo
          const index = todoList.findIndex((t) => t.id === todo.id)
          if (index !== -1) {
            todoList[index] = todo
          }
          return HttpResponse.json()
        }),
        http.delete<PathParams, never, never>('/bff-api/v1/todo/:id', async ({ params }) => {
          const id = params.id as string
          const index = todoList.findIndex((todo) => todo.id === id)
          if (index !== -1) {
            todoList.splice(index, 1)
          }
          return HttpResponse.json()
        }),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof TodoListView>

export const Default: Story = {
  args: {},
}
