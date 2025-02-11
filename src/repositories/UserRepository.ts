import type { User } from '@/models/user'

export class UserRepository {
  public login(id: string, password: string): User | null {
    // TODO: サーバ側のユーザ認証処理を呼び出す
    // 仮実装として、常に成功とする

    return {
      id: id,
      lastName: '山田',
      firstName: '太郎',
    }
  }
}
