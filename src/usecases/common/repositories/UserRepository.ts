import type { User } from '@/usecases/common/models/user'
import { useUserDummyStore } from '@/usecases/user/stores/usersStore'

/**
 * ユーザ情報を管理するRepositoryクラス
 */
export class UserRepository {
  private usersDummyStore = useUserDummyStore()

  constructor() {
    if (this.usersDummyStore.users.values.length !== 0) {
      return
    }
    // スタブ実装として、以下のユーザを初期登録する
    this.usersDummyStore.addList([
      {
        id: 'yamada@xxx.co.jp',
        lastName: '山田',
        firstName: '太郎',
        password: 'password',
      },
      {
        id: 'tamura@xxx.co.jp',
        lastName: '田村',
        firstName: '一郎',
        password: 'password',
      },
    ])
  }

  /**
   * ユーザ情報を取得する
   * @param id ユーザID
   * @param password パスワード
   * @returns ユーザ情報
   */
  public async findOne(id: string, password: string): Promise<User | null> {
    // TODO: サーバ側のユーザ認証処理を呼び出す

    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const user = this.usersDummyStore.users.find(
      (user) => user.id === id && user.password === password,
    )
    if (!user) {
      // TODO: 認証エラーの扱いの検討（業務エラーの定義）
      throw new Error('ユーザ名かパスワードが正しくありません')
    }
    return user
  }
}
