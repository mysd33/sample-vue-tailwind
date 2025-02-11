import { UserRepository } from '@/usecases/common/repositories/UserRepository'
import { useUserStore } from '@/usecases/common/stores/userStore'

export class LoginService {
  private userRepository = new UserRepository()
  private userStore = useUserStore()

  public login(id: string, password: string): boolean {
    const user = this.userRepository.login(id, password)
    if (user) {
      console.log(`ログイン成功: ${this.userStore.$id} : ${user.lastName} ${user.firstName}`)
      // ログイン成功時にユーザ情報を保存
      this.userStore.user = user
      return true
    }
    // TODO: ログイン失敗時の戻り値・例外の検討（仮置きでbooleanを返している）
    return false
  }

  public logout(): void {
    console.log(`ログアウト: ${this.userStore.$id}`)
    // ログアウト時にユーザ情報をクリア
    this.userStore.clear()
  }
}
