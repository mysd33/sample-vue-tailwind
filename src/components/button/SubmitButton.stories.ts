import type { Meta, StoryObj } from '@storybook/vue3'

import SubmitButton from './SubmitButton.vue'

/**
 * ## 送信ボタンのコンポーネント
 *
 * - フォームの送信ボタンを提供するコンポーネントです。
 * - ボタンのサイズ、重要（危険）な操作かといった属性を設定できます。
 */
const meta: Meta<typeof SubmitButton> = {
  component: SubmitButton,
  tags: ['autodocs'],
  render: (args) => ({
    components: { SubmitButton },
    setup() {
      return { args }
    },
    template: '<SubmitButton v-bind="args">{{ args.default }}</SubmitButton>',
  }),
}

export default meta
type Story = StoryObj<typeof SubmitButton>

/**
 * 小さいサイズのボタン
 */
export const Small: Story = {
  args: {
    size: 'sm',
    default: '送信',
  },
}

/**
 * 中サイズのボタン
 */
export const Medium: Story = {
  args: {
    size: 'md',
    default: '送信',
  },
}

/**
 * 大きいサイズのボタン
 */
export const Large: Story = {
  args: {
    size: 'lg',
    default: '送信',
  },
}

/**
 * 重要（危険）な操作を行うボタン
 */
export const Danger: Story = {
  args: {
    size: 'md',
    danger: true,
    default: '削除',
  },
}
