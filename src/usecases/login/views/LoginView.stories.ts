import type { Meta, StoryObj } from '@storybook/vue3'

import LoginView from '@/usecases/login/views/LoginView.vue'
import { AuthenticationServiceImpl } from '@/usecases/login/services/authenticationService'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

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
  args: {
    authenticationService: new AuthenticationServiceImpl(new UserRepositoryImpl()),
  },
}
