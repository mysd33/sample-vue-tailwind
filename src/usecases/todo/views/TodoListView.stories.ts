import type { Meta, StoryObj } from '@storybook/vue3'

import TodoListView from '@/usecases/todo/views/TodoListView.vue'

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
  args: {},
}
