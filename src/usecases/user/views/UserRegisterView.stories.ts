import type { Meta, StoryObj } from '@storybook/vue3'

import UserRegisterView from '@/usecases/user/views/UserRegisterView.vue'
import { UserServiceImpl } from '../services/userService'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

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
  args: {
    userService: new UserServiceImpl(new UserRepositoryImpl()),
  },
}
