import type { Meta, StoryObj } from '@storybook/vue3'

import TodoFileUploadView from './TodoFileUploadView.vue'
/**
 * ## Todo管理画面
 */
const meta: Meta<typeof TodoFileUploadView> = {
  component: TodoFileUploadView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TodoFileUploadView>
export const Default: Story = {
  args: {},
}
