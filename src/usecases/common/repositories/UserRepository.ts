import type { User } from '@/usecases/common/models/user'

export class UserRepository {
  public login(id: string, password: string): User | null {
    // TODO: サーバ側のユーザ認証処理を呼び出す
    // 仮実装として、常に成功とする

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

    // TODO: 認証失敗の戻り値の検討
    return null
  }
}
