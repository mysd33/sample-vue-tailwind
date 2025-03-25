import type { Meta, StoryObj } from '@storybook/vue3'

import UserDetailView from '@/usecases/user/views/UserDetailView.vue'
import { UserServiceImpl } from '@/usecases/user/services/userService'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

/**
 * ## Todo管理画面
 */
const meta: Meta<typeof UserDetailView> = {
  component: UserDetailView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UserDetailView>

export const Default: Story = {
  args: { id: 'yamada@xxx.co.jp', userService: new UserServiceImpl(new UserRepositoryImpl()) },
}
