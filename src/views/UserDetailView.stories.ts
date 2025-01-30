import type { Meta, StoryObj } from '@storybook/vue3'

import UserDetailView from './UserDetailView.vue'

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
  args: {},
}
