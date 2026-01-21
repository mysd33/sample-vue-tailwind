import type { Meta, StoryObj } from '@storybook/vue3-vite'

import UserListView from '@/usecases/user/views/UserListView.vue'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof UserListView> = {
  component: UserListView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserListView>

export const Default: Story = {
  args: {},
}
