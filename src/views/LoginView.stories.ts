import type { Meta, StoryObj } from '@storybook/vue3'

import LoginView from './LoginView.vue'

/**
 * ## ログイン画面
 */
const meta: Meta<typeof LoginView> = {
  component: LoginView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginView>

export const Default: Story = {
  args: {},
}
