import type { Meta, StoryObj } from '@storybook/vue3-vite'

import UserDetailView from '@/usecases/user/views/UserDetailView.vue'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof UserDetailView> = {
  component: UserDetailView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserDetailView>

export const Default: Story = {
  args: { id: 'yamada@xxx.co.jp' },
}
