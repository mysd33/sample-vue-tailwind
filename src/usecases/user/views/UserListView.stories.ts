import type { Meta, StoryObj } from '@storybook/vue3'

import UserListView from '@/usecases/user/views/UserListView.vue'
import { UserServiceImpl } from '../services/userService'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof UserListView> = {
  component: UserListView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserListView>

export const Default: Story = {
  args: {
    userService: new UserServiceImpl(new UserRepositoryImpl()),
  },
}
