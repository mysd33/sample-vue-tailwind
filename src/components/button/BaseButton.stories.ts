import type { Meta, StoryObj } from '@storybook/vue3-vite'

import BaseButton from './BaseButton.vue'

/**
 * ## 基本のボタンのコンポーネント
 *
 */
const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  tags: ['autodocs'],
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args">{{ args.default }}</BaseButton>',
  }),
}

export default meta
type Story = StoryObj<typeof BaseButton>

/**
 * 小さいサイズのボタン
 */
export const Small: Story = {
  args: {
    type: 'button',
    size: 'sm',
    default: '実行',
  },
}

/**
 * 中サイズのボタン
 */
export const Medium: Story = {
  args: {
    type: 'button',
    size: 'md',
    default: '実行',
  },
}

/**
 * 大きいサイズのボタン
 */
export const Large: Story = {
  args: {
    type: 'button',
    size: 'lg',
    default: '実行',
  },
}

/**
 * アウトラインのボタン
 */
export const Outline: Story = {
  args: {
    type: 'button',
    size: 'md',
    outline: true,
    default: '戻る',
  },
}

/**
 * 重要（危険）な操作を行うボタン
 */
export const Danger: Story = {
  args: {
    type: 'button',
    size: 'md',
    danger: true,
    default: '削除',
  },
}
