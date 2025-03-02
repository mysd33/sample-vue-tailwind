import { UserRepository } from '@/usecases/common/repositories/UserRepository'
import { useAuthenticationStore } from '@/usecases/common/stores/authenticationStore'

/**
 * 認証機能を提供するServiceクラス
 */
export class AuthenticationService {
  private authenticationStore = useAuthenticationStore()

  constructor(private userRepository: UserRepository) {}

  /**
   * ログイン処理
   * @param id ユーザID
   * @param password パスワード
   * @returns ログイン成功時はtrue、失敗時はfalse
   */
  public async login(id: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findUser(id, password)

    if (user) {
      console.log(
        `ログイン成功: ${this.authenticationStore.$id} : ${user.lastName} ${user.firstName}`,
      )
      // ログイン成功時にユーザ情報を保存
      this.authenticationStore.user = user
      return true
    }
    // TODO: ログイン失敗時の戻り値・例外の検討（仮置きでbooleanを返している）
    return false
  }

  /**
   * ログアウト処理
   */
  public async logout(): Promise<void> {
    console.log(`ログアウト: ${this.authenticationStore.$id}`)
    // ログアウト時にユーザ情報をクリア
    this.authenticationStore.clear()
  }
}
