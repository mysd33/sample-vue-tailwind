import { UserRepository } from '@/repositories/UserRepository'
import { useUserStore } from '@/stores/userStore'

export class LoginService {
  private userRepository = new UserRepository()
  private userStore = useUserStore()

  // TODO: ログイン失敗時の処理の追加
  public login(id: string, password: string): void {
    const user = this.userRepository.login(id, password)
    if (user) {
      console.log(`ログイン成功: ${user.lastName} ${user.firstName}`)
      // ログイン成功時にユーザ情報を保存
      this.userStore.user = user
    }
  }
}
