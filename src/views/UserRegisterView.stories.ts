import type { Meta, StoryObj } from '@storybook/vue3'

import UserRegisterView from './UserRegisterView.vue'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof UserRegisterView> = {
  component: UserRegisterView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserRegisterView>

export const Default: Story = {
  args: {},
}
