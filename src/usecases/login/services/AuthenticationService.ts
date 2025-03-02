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
   */
  public async login(id: string, password: string): Promise<void> {
    const user = await this.userRepository.findOne(id, password)

    if (user) {
      console.log(
        `ログイン成功: ${this.authenticationStore.$id} : ${user.lastName} ${user.firstName}`,
      )
      // ログイン成功時に、ログイン済認証時情報を保存
      this.authenticationStore.user = user
    }
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
