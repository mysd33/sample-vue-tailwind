import type { Page, Pageable } from '@/components/pagination/pagination'
import type { User } from '@/usecases/common/models/user'
import type { UserRepository } from '@/usecases/common/repositories/userRepository'

/**
 * ユーザ情報を提供するServiceインタフェース
 */
export interface UserService {
  /**
   * ページネーションしてユーザ情報を取得する
   * @param pageable ページネーション情報
   * @returns ユーザリストの1ページ分
   */
  findAllForPageNation(pageable: Pageable): Promise<Page<User>>

  /**
   * 指定したIDのユーザ情報を取得する
   * @param id ユーザID
   * @returns ユーザ情報
   */
  findOne(id: string): Promise<User | null>

  /**
   * ユーザを作成する
   * @param user ユーザ情報
   */
  create(user: User): Promise<void>

  /**
   * ユーザ情報を更新する
   * @param user ユーザ情報
   */
  update(user: User): Promise<void>

  /**
   * ユーザ情報を削除する
   * @param id ユーザID
   */
  delete(id: string): Promise<void>
}

/**
 * ユーザ情報を提供するServiceクラス
 */
export class UserServiceImpl implements UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * ページネーションしてユーザ情報を取得する
   * @param pageable ページネーション情報
   * @returns ユーザリストの1ページ分
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
