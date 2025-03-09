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
   * @returns ユーザリスト
   */
  public async findAllForPageNation(pageable: Pageable): Promise<Page<User>> {
    return this.userRepository.findAllForPagination(pageable)
  }

  public async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne(id)
  }
}
