import type { Todo } from '@/usecases/todo/models/todo'
/**
 * Todoリストを管理するRepositoryインタフェース
 */
export interface TodoRepository {
  /**
   * IDを指定してTODOを取得する
   * @param id ID
   * @returns TODO
   */
  findOne(id: string): Promise<Todo | null>
  /**
   * TODOリストを取得する
   * @returns TODOリスト
   */
  findAll(): Promise<Todo[]>
  /**
   * TODOを作成する
   * @param todo TODO
   * @returns 作成したTODO
   */
  create(todo: Todo): Promise<Todo>
  /**
   * TODOを更新する
   * @param todo TODO
   */
  update(todo: Todo): Promise<void>
  /**
   * TODOを削除する
   * @param id ID
   */
  delete(id: string): Promise<void>
}
