import { UserRepository } from '@/usecases/common/repositories/UserRepository'
import { useUserStore } from '@/usecases/common/stores/userStore'

/**
 * 認証機能を管理するServiceクラス
 */
export class AuthenticationService {
  private userRepository = new UserRepository()
  private userStore = useUserStore()

  /**
   * ログイン処理
   * @param id ユーザID
   * @param password パスワード
   * @returns ログイン成功時はtrue、失敗時はfalse
   */
  public async login(id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findUser(id, password)

    if (user) {
      console.log(`ログイン成功: ${this.userStore.$id} : ${user.lastName} ${user.firstName}`)
      // ログイン成功時にユーザ情報を保存
      this.userStore.user = user
      return true
    }
    // TODO: ログイン失敗時の戻り値・例外の検討（仮置きでbooleanを返している）
    return false
  }

  /**
   * ログアウト処理
   */
  public logout(): void {
    console.log(`ログアウト: ${this.userStore.$id}`)
    // ログアウト時にユーザ情報をクリア
    this.userStore.clear()
  }
}
