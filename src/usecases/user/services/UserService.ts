import type { Page, Pageable } from '@/components/pagination/pagination'
import type { User } from '@/usecases/common/models/User'
import { UserRepository } from '@/usecases/common/repositories/UserRepository'

/**
 * ユーザ情報を提供するサービス
 */
export class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * ページネーションしてユーザ情報を取得する
   * @param pageable ページネーション情報
   * @returns ユーザリスト
   */
  public async findAllForPageNation(pageable: Pageable): Promise<Page<User>> {
    return this.userRepository.findAllForPagination(pageable)
  }

  /**
   * 指定したIDのユーザ情報を取得する
   * @param id ユーザID
   * @returns ユーザ情報
   */
  public async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne(id)
  }

  /**
   * ユーザを作成する
   * @param user ユーザ情報
   */
  public async create(user: User): Promise<void> {
    return this.userRepository.create(user)
  }

  /**
   * ユーザ情報を更新する
   * @param user ユーザ情報
   */
  public async update(user: User): Promise<void> {
    return this.userRepository.update(user)
  }

  /**
   * ユーザ情報を削除する
   * @param id ユーザID
   */
  public async delete(id: string): Promise<void> {
    return this.userRepository.delete(id)
  }
}
