import type { Meta, StoryObj } from '@storybook/vue3'

import MenuView from '@/usecases/login/views/MenuView.vue'
import { AuthenticationServiceImpl } from '../services/authenticationService'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

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
  args: {
    authenticationService: new AuthenticationServiceImpl(new UserRepositoryImpl()),
  },
}
