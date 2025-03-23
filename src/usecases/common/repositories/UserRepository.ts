import { Page, Pageable } from '@/components/pagination/pagination'
import type { User } from '@/usecases/common/models/User'
import { useUserDummyStore } from '@/usecases/common/stores/usersStore'

const sleepTime = 500

/**
 * ユーザ情報を管理するRepositoryクラス
 */
export class UserRepository {
  private usersDummyStore = useUserDummyStore()

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

    // ページ情報を返却
    return new Page(pageable, users, totalSize)
  }

  /**
   * 指定したIDのユーザ情報を取得する
   * @param id ユーザID
   * @returns ユーザ情報
   */
  public async findOne(id: string): Promise<User | null> {
    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    return this.usersDummyStore.find(id) as User | null
  }

  /**
   * ユーザを作成する
   * @param user ユーザ情報
   */
  public async create(user: User): Promise<void> {
    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    this.usersDummyStore.add(user)
  }

  /**
   * ユーザ情報を更新する
   * @param user ユーザ情報
   */
  public async update(user: User): Promise<void> {
    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    this.usersDummyStore.update(user)
  }

  /**
   * ユーザ情報を削除する
   * @param id ユーザID
   */
  public async delete(id: string): Promise<void> {
    // サーバ処理を疑似するため、0.5秒待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    this.usersDummyStore.remove(id)
  }
}
