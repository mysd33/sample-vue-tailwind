import type { Meta, StoryObj } from '@storybook/vue3'

import MenuView from './MenuView.vue'

/**
 * ## メニュー画面
 */
const meta: Meta<typeof MenuView> = {
  component: MenuView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuView>

export const Default: Story = {
  args: {},
}
