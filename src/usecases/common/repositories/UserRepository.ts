import { Page, type Pageable } from '@/components/pagination/pagination'
import type { User } from '@/usecases/common/models/User'
import { useUserDummyStore } from '@/usecases/common/stores/usersStore'

const sleepTime = 500

/**
 * ユーザ情報を管理するRepositoryクラス
 */
export class UserRepository {
  private usersDummyStore = useUserDummyStore()

  //TODO: いずれ削除
  // スタブ実装として、以下のユーザを初期登録する
  constructor() {
    this.usersDummyStore.addList([
      {
        id: 'yamada@xxx.co.jp',
        lastName: '山田',
        firstName: '太郎',
        birthday: new Date('1990-01-01'),
        password: 'password',
        isAdmin: true,
      },
      {
        id: 'tamura@xxx.co.jp',
        lastName: '田村',
        firstName: '一郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura2@xxx.co.jp',
        lastName: '田村',
        firstName: '二郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura3@xxx.co.jp',
        lastName: '田村',
        firstName: '三郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura4@xxx.co.jp',
        lastName: '田村',
        firstName: '四郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura5@xxx.co.jp',
        lastName: '田村',
        firstName: '五郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura6@xxx.co.jp',
        lastName: '田村',
        firstName: '六郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura7@xxx.co.jp',
        lastName: '田村',
        firstName: '七郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura8@xxx.co.jp',
        lastName: '田村',
        firstName: '七郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura9@xxx.co.jp',
        lastName: '田村',
        firstName: '七郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
      {
        id: 'tamura10@xxx.co.jp',
        lastName: '田村',
        firstName: '七郎',
        birthday: new Date('1986-11-05'),
        password: 'password',
        isAdmin: false,
      },
    ])
  }

  /**
   * ユーザ認証する
   * @param id ユーザID
   * @param password パスワード
   * @returns ユーザ情報
   */
  public async authenticate(id: string, password: string): Promise<User | null> {
    // TODO: サーバ側のユーザ認証処理を呼び出す

    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    const user = this.usersDummyStore.users.find(
      (user) => user.id === id && user.password === password,
    )
    if (!user) {
      // TODO: 認証エラーの扱いの検討（業務エラーの定義）
      throw new Error('ユーザ名かパスワードが正しくありません')
    }
    return user
  }

  /**
   * ページネーションしてユーザ情報を取得する
   * @param pageSize
   * @param offset
   */
  public async findAllForPagination(pageable: Pageable): Promise<Page<User>> {
    const pageSize = pageable.pageSize
    const offset = pageable.offset
    // TODO: サーバ側のユーザ認証処理を呼び出す

    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    const users = this.usersDummyStore.users.slice(offset, offset + pageSize)
    const totalSize = this.usersDummyStore.users.length
    return new Page(users, totalSize)
  }
}
