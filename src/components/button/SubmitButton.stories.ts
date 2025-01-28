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
}

export default meta
type Story = StoryObj<typeof SubmitButton>

/**
 * 小さいサイズのボタン
 */
export const Small: Story = {
  render: (args) => ({
    components: { SubmitButton },
    setup() {
      return { args }
    },
    template: '<SubmitButton v-bind="args">Submit</SubmitButton>',
  }),
  args: {
    size: 'sm',
  },
}

/**
 * 中サイズのボタン
 */
export const Medium: Story = {
  render: (args) => ({
    components: { SubmitButton },
    setup() {
      return { args }
    },
    template: '<SubmitButton v-bind="args">Submit</SubmitButton>',
  }),
  args: {
    size: 'md',
  },
}

/**
 * 大きいサイズのボタン
 */
export const Large: Story = {
  render: (args) => ({
    components: { SubmitButton },
    setup() {
      return { args }
    },
    template: '<SubmitButton v-bind="args">Submit</SubmitButton>',
  }),
  args: {
    size: 'lg',
  },
}

/**
 * 重要（危険）な操作を行うボタン
 */
export const Danger: Story = {
  render: (args) => ({
    components: { SubmitButton },
    setup() {
      return { args }
    },
    template: '<SubmitButton v-bind="args">Submit</SubmitButton>',
  }),
  args: {
    size: 'md',
    danger: true,
  },
}
