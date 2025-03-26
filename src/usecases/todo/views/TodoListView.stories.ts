import type { Meta, StoryObj } from '@storybook/vue3'

import TodoListView from '@/usecases/todo/views/TodoListView.vue'
import { TodoServiceImpl } from '../services/todoService'
import { TodoRepositoryImpl } from '../repositories/todoRepository'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof TodoListView> = {
  component: TodoListView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TodoListView>

export const Default: Story = {
  args: {
    todoService: new TodoServiceImpl(new TodoRepositoryImpl()),
  },
}
