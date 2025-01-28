import type { Meta, StoryObj } from '@storybook/vue3'

import SubmitButton from './SubmitButton.vue'

const meta: Meta<typeof SubmitButton> = {
  component: SubmitButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SubmitButton>

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
