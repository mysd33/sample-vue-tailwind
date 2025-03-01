import type { User } from '@/usecases/common/models/user'

/**
 * ユーザ情報を管理するRepositoryクラス
 */
export class UserRepository {
  /**
   * ユーザ情報を取得する
   * @param id ユーザID
   * @param password パスワード
   * @returns ユーザ情報
   */
  public async findUser(id: string, password: string): Promise<User | null> {
    // TODO: サーバ側のユーザ認証処理を呼び出す

    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // スタブ実装として、以下のユーザのみ認証成功とする
    if (id === 'yamada@xxx.co.jp' && password === 'password') {
      return {
        id: id,
        lastName: '山田',
        firstName: '太郎',
      }
    }
    if (id === 'tamura@xxx.co.jp' && password === 'password') {
      return {
        id: id,
        lastName: '田村',
        firstName: '一郎',
      }
    }
    // TODO: 認証エラーの扱いの検討、現状nullを返す
    return null
  }
}
