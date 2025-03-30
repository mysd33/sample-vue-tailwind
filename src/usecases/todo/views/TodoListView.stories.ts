import type { Meta, StoryObj } from '@storybook/vue3'

import TodoListView from '@/usecases/todo/views/TodoListView.vue'
import type { Todo } from '../models/todo'
import { http, HttpResponse } from 'msw'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof TodoListView> = {
  component: TodoListView,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.get<never, never, Todo[]>('/bf-api/v1/todo', async () => {
          return HttpResponse.json([
            {
              id: '1',
              title: 'ミルクを買う',
              finished: false,
              createAt: new Date(),
            },
            {
              id: '2',
              title: '新聞を読む',
              finished: true,
              createAt: new Date(),
            },
            {
              id: '3',
              title: '掃除をする',
              finished: false,
              createAt: new Date(),
            },
          ])
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
